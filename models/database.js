// connecting to mongodb
import Mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  Mongoose.set('strictQuery')

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await Mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch (err) {
    console.error(err)
  }
}
