// Validation middleware

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Brazilian phone format: (XX) XXXXX-XXXX or +55XX...
  const phoneRegex = /^(\+55)?[\s\-]?\(?[1-9]{2}\)?[\s\-]?[9]?[\s\-]?[0-9]{4}[\s\-]?[0-9]{4}$/;
  return phoneRegex.test(phone);
};

export const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      errors
    });
  }
  
  next();
};

export const validateLead = (req, res, next) => {
  const { email } = req.body;
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Valid email is required'
    });
  }
  
  next();
};

