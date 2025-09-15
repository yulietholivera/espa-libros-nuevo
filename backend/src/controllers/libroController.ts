// backend/src/controllers/libroController.ts
import { Request, Response } from 'express';
import Libro from '../models/Libro';

// --- Rutas Públicas ---

// Obtener todos los libros (Público)
export const obtenerLibros = async (req: Request, res: Response) => {
  try {
    // Busca todos los documentos en la colección de Libros
    const libros = await Libro.find();
    // Responde con la lista de libros en formato JSON
    res.status(200).json(libros);
  } catch (error) {
    // Si hay un error, responde con un mensaje de error del servidor
    res.status(500).json({ mensaje: 'Error al obtener los libros' });
  }
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

// --- Rutas de Admin (Protegidas) ---

// Crear un libro (Admin)
export const crearLibro = async (req: Request, res: Response) => {
  // Extrae los datos del libro que vienen en el body de la petición
  const { titulo, autor, descripcion, precio, stock, imagenURL, categoria } = req.body;

  try {
    // Crea un nuevo documento de libro con los datos recibidos
    const nuevoLibro = new Libro({
      titulo,
      autor,
      descripcion,
      precio,
      stock,
      imagenURL,
      categoria
    });

    // Guarda el libro en la base de datos
    const libroGuardado = await nuevoLibro.save();

    // Envía una respuesta a Postman con el libro recién creado (código 201 = Creado)
    res.status(201).json({ mensaje: 'Libro creado exitosamente', libro: libroGuardado });

  } catch (error) {
    // Si algo sale mal, envía una respuesta de error
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
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
