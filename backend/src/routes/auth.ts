// backend/src/routes/auth.ts
import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/authController';

const router = Router();

// Cuando alguien haga un POST a /registro, se ejecuta registrarUsuario
router.post('/registro', registrarUsuario);

// Cuando alguien haga un POST a /login, se ejecuta iniciarSesion
router.post('/login', iniciarSesion);

export default router;