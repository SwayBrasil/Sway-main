// Database configuration
// Por enquanto usando array em memória (substituir por banco de dados real)

const users = [
  // Exemplo de usuário (senha: admin123)
  {
    id: 1,
    name: 'Admin',
    email: 'admin@swaybrasil.com',
    password: '$2a$10$rQ9Q9Q9Q9Q9Q9Q9Q9Q9Q.O9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q',
    createdAt: new Date()
  }
];

// Funções para simular banco de dados
const db = {
  // Users
  findUserByEmail: (email) => {
    return users.find(user => user.email === email);
  },
  
  findUserById: (id) => {
    return users.find(user => user.id === parseInt(id));
  },
  
  createUser: (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },
  
  getAllUsers: () => {
    return users.map(({ password, ...user }) => user); // Remove senha
  }
};

module.exports = db;

