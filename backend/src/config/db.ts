import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // El "!" al final es para decirle a TypeScript: "Confía en mí, esta variable existe".
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }
};

export default conectarDB;


