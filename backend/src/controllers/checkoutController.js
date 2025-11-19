const db = require('../config/database');

const PLANS = {
  Start: {
    name: 'Start',
    price: 299.00,
    description: '1 canal, 1 IA vertical',
    features: ['Até 2 usuários', '5k mensagens/mês', 'Suporte por e-mail']
  },
  Pro: {
    name: 'Pro',
    price: 799.00,
    description: '2 canais, 2 IAs verticais',
    features: ['Até 8 usuários', '20k mensagens/mês', 'Suporte prioritário']
  },
  Enterprise: {
    name: 'Enterprise',
    price: 1999.00,
    description: 'Omnichannel + múltiplas IAs',
    features: ['Usuários ilimitados', 'SLA e integrações', 'Onboarding assistido']
  }
};

// Obter informações do plano
async function getPlan(req, res) {
  try {
    const { planName } = req.params;
    
    if (!PLANS[planName]) {
      return res.status(404).json({
        success: false,
        message: 'Plano não encontrado'
      });
    }

    res.json({
      success: true,
      data: PLANS[planName]
    });
  } catch (error) {
    console.error('Error getting plan:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar informações do plano'
    });
  }
}

// Criar pedido
async function createOrder(req, res) {
  try {
    const { planName, paymentMethod, companyData, cardData } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }

    if (!PLANS[planName]) {
      return res.status(400).json({
        success: false,
        message: 'Plano inválido'
      });
    }

    const plan = PLANS[planName];

    // Preparar metadata com dados adicionais
    const metadata = {
      companyData: companyData || null,
      cardData: cardData ? {
        // Não armazenar dados sensíveis completos, apenas últimos 4 dígitos
        last4: cardData.number ? cardData.number.slice(-4) : null,
        brand: cardData.number ? (cardData.number.startsWith('4') ? 'visa' : 'mastercard') : null
      } : null,
      createdAt: new Date().toISOString()
    };

    // Criar pedido no banco
    const order = await db.createOrder({
      userId,
      plan: planName,
      amount: plan.price,
      currency: 'BRL',
      paymentMethod: paymentMethod || null,
      status: 'pending',
      subscriptionId: null,
      metadata: metadata
    });

    // Em produção, aqui você integraria com gateway de pagamento
    // Por enquanto, vamos simular um pagamento bem-sucedido após 2 segundos
    // Em produção, você usaria: Stripe, Mercado Pago, PagSeguro, etc.

    res.json({
      success: true,
      data: {
        orderId: order.id,
        plan: planName,
        amount: plan.price,
        currency: 'BRL',
        paymentMethod,
        // Em produção, retornaria URL de pagamento do gateway
        paymentUrl: paymentMethod === 'pix' 
          ? `https://api.payment-gateway.com/pix/${order.id}` 
          : null
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido'
    });
  }
}

// Confirmar pagamento (webhook do gateway)
async function confirmPayment(req, res) {
  try {
    const { orderId, paymentId, status } = req.body;

    const order = await db.findOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    // Atualizar status do pedido
    await db.updateOrder(orderId, {
      status: status === 'paid' ? 'paid' : 'failed',
      paymentId
    });

    // Se pagamento aprovado, criar/atualizar assinatura
    if (status === 'paid') {
      const subscription = await db.findActiveSubscriptionByUser(order.userId);
      
      if (subscription) {
        // Atualizar assinatura existente
        await db.updateSubscription(subscription.id, {
          plan: order.plan,
          price: order.amount,
          status: 'active',
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        });
      } else {
        // Criar nova assinatura
        const newSubscription = await db.createSubscription({
          userId: order.userId,
          plan: order.plan,
          price: order.amount,
          status: 'active',
          paymentMethod: order.paymentMethod,
          currency: 'BRL',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        });
        
        // Atualizar pedido com subscriptionId
        await db.updateOrder(orderId, {
          subscriptionId: newSubscription.id
        });
      }

      // Criar atividade
      await db.createActivity(order.userId, 'subscription', `Assinatura ${order.plan} ativada com sucesso`);
      
      // Criar notificação de boas-vindas
      await db.createNotification(order.userId, 'info', `Bem-vindo ao plano ${order.plan}! Sua assinatura está ativa.`);
    }

    res.json({
      success: true,
      message: 'Pagamento processado com sucesso'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar pagamento'
    });
  }
}

// Obter pedido
async function getOrder(req, res) {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }

    const order = await db.findOrderById(orderId);

    if (!order || order.userId !== userId) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido'
    });
  }
}

module.exports = {
  getPlan,
  createOrder,
  confirmPayment,
  getOrder
};

