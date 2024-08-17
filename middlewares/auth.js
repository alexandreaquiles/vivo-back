import jwt from 'jsonwebtoken';

const SECRET_KEY = 'meu_segredo';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function createToken(username) {
  return jwt.sign(
    { username, role: 'admin' },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

export { authenticateToken, createToken };