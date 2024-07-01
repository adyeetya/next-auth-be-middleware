import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
})

// how verify token and forgot password token works
// when the user signsup we generate a verifytoken and the exp data for that token  we store that in the db in the schema
// one copy of that token is sent to the user email with the link to open that link has the token in the url
// when the user opens that page we get the token from the url on the client side and we match it with the stored token and also check for exp time 
// if it matches we set the isVerified to true 
//  similarly the forgot password token also works 



// there is a slight difference in how we export the models in next js as there is no dedicated backend next runs on edge computing
// so next cant tell if the model is already created or its the first time being created so we have to add a check like below that is the there is a model with the name users then take that model 
// and export that and if it isnt then create a new one with the name users.
const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User