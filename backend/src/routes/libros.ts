import { Router, Request, Response } from 'express';
import Libro from '../models/Libro'; // Asegúrate que la importación del modelo sea correcta

const router = Router();

// Función para obtener todos los libros
const obtenerLibros = async (req: Request, res: Response) => {
  try {
    const libros = await Libro.find(); // Busca todos los libros en el almacén
    res.json({ libros }); // Responde con la lista de libros
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los libros' });
  }
};

// Función para crear un libro nuevo
const crearLibro = async (req: Request, res: Response) => {
  try {
    const libroNuevo = new Libro(req.body); // Crea un libro nuevo con los datos
    await libroNuevo.save(); // Guarda el libro en el almacén
    res.status(201).json({ mensaje: 'Libro creado exitosamente', libro: libroNuevo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
};

// --- LA PARTE QUE FALTABA ---
// Aquí definimos las rutas y qué función usarán
router.get('/', obtenerLibros);
router.post('/', crearLibro);

// --- LA LÍNEA MÁS IMPORTANTE PARA SOLUCIONAR EL ERROR ---
// Aquí exportamos el router para que index.ts pueda usarlo
export default router;