// backend/src/models/Carrito.ts
import { Schema, model, Types } from 'mongoose';

const itemCarritoSchema = new Schema({
  libroId: { type: Types.ObjectId, ref: 'Libro', required: true },
  cantidad: { type: Number, required: true, min: 1, default: 1 },
  precioUnitario: { type: Number, required: true }
}, { _id: false });

const carritoSchema = new Schema({
  usuarioId: { type: Types.ObjectId, ref: 'Usuario', required: true, unique: true },
  items: [itemCarritoSchema],
  total: { type: Number, default: 0 }
});

const Carrito = model('Carrito', carritoSchema);
export default Carrito;