// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Función para generar un token (nuestra credencial digital)
const generarToken = (id: string, rol: string) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET!, {
    expiresIn: '1d' // El token será válido por 1 día
  });
};

// Lógica para registrar un nuevo usuario
export const registrarUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      // Se convierte el _id de tipo ObjectId a string para que coincida con la función
      token: generarToken(usuario._id.toString(), usuario.rol) // <-- CORRECCIÓN
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
};

// Lógica para iniciar sesión
export const iniciarSesion = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas (email)' });
    }

    const esMatch = await bcrypt.compare(password, usuario.password);
    if (!esMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas (contraseña)' });
    }

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      // Se convierte el _id de tipo ObjectId a string para que coincida con la función
      token: generarToken(usuario._id.toString(), usuario.rol) // <-- CORRECCIÓN
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
