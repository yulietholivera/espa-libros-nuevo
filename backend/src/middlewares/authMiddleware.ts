// backend/src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 👇 LA LÍNEA MÁS IMPORTANTE ES ESTA. DEBE TENER "export" AL INICIO
export interface AuthRequest extends Request {
  usuario?: { id: string; rol: string };
}

export const protegerRuta = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; rol: string };
      req.usuario = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
  }
};