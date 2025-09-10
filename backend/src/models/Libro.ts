
import { Schema, model } from 'mongoose';


const libroSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  imagenURL: { type: String },
  categoria: { type: String }
});

const Libro = model('Libro', libroSchema);
export default Libro;