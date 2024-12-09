import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userSchema = new Schema({
  username: { type: String, required: true,unique:true },
// username email password role
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        return emailRegex.test(email); // Vérifie si l'e-mail correspond à l'expression régulière
      },
      message: 'Le format de l\'email n\'est pas valide.'
    }
  },

  password: { type: String, required: true },

    role: {
      type: String,
      enum: ["normalUser", "superUser", "admin"],
      default: "normalUser",
    },
  },{ timestamps: true });


 const User = mongoose.model('User', userSchema);
 export default User;