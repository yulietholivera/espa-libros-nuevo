
import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware'; // Importamos el tipo que creamos antes

export const esAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.usuario && req.usuario.rol === 'administrador') {
    next(); // Es admin, ¡adelante!
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado, no eres administrador' });
  }
};