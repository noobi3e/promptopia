import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,

    unique: [true, 'Email already exists'],
    required: [true, 'User must have a email'],
  },
  username: {
    type: String,

    // this match is similar to unique but in this we are passing a regular expression which will check for lenght and uniqueness of the username
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
    required: [true, 'User must have a username'],
  },
  image: {
    type: String,
  },
})

// in express in which server is always running we will use follwing code
// export const userModel = model('users', userSchema)

// but in next all the routes gets called when request is made so for that we don't want to create a new model every single time to avoid that we will the models object given by the mongoose which will keep tracks of all the models we have registered
const User = models.user || model('user', userSchema)

// above code will register a new model if there is no model with User exists

export default User
