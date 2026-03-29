import mongoose from 'mongoose';

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) {
    return;
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.error('Error connecting to order database', error);
    throw error;
  }
};
