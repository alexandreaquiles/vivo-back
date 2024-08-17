import { Router } from 'express';
import { createToken } from '../middlewares/auth.js';

function authRoutes() {
  const router = Router();

  router.post('/login', (req, res) => {
    // Aqui você normalmente verificaria as credenciais no banco de dados
    const { username, password } = req.body;
  
    if (username === 'admin' && password === '123') {
      const token = createToken(username);
      res.json({ token: token });
    } else {
      res.status(401).json({ message: 'Autenticação falhou' });
    }
  });

  return router;
}

export { authRoutes };