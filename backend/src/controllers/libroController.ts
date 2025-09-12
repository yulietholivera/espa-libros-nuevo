// backend/src/controllers/libroController.ts
import { Request, Response } from 'express';
import Libro from '../models/Libro';

// Obtener todos los libros (Público)
export const obtenerLibros = async (req: Request, res: Response) => {
  // ... tu código actual para obtener libros
};

// Obtener un solo libro por ID (Público)
export const obtenerLibroPorId = async (req: Request, res: Response) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

// --- Rutas de Admin ---

// Crear un libro (Admin)
export const crearLibro = async (req: Request, res: Response) => {
  // ... tu código actual para crear un libro
};

// Actualizar un libro (Admin)
export const actualizarLibro = async (req: Request, res: Response) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json({ mensaje: 'Libro actualizado', libro });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};

// Eliminar un libro (Admin)
export const eliminarLibro = async (req: Request, res: Response) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};