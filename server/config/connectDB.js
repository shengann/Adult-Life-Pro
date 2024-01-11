import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL is not defined in the env variables.');
      process.exit(1);
    }

    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

export default connectDB;