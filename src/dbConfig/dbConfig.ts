// it can be ts js doesnt matter much

import mongoose from 'mongoose'

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection
    connection.on('connected', () => {
      console.log('connected with mongodb')
    })
    connection.on('error', (err) => {
      console.log('Mongodb connection error', err)
      process.exit()
    })
  } catch (err) {
    console.log('connection failed with mongodb')
    console.log(err)
  }
}
