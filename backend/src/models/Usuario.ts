// backend/src/models/Usuario.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ['cliente', 'administrador'], default: 'cliente' }
}, {
  timestamps: true // Esto añade automáticamente las fechas de creación y actualización
});

// 🔐 ¡Magia de seguridad! Antes de guardar un usuario, vamos a encriptar su contraseña.
usuarioSchema.pre('save', async function(next) {
  // Si la contraseña no ha sido modificada, no hacemos nada.
  if (!this.isModified('password')) {
    return next();
  }
  // "Sal" es un ingrediente secreto que hace cada contraseña única y más segura.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Usuario = model('Usuario', usuarioSchema);
export default Usuario;