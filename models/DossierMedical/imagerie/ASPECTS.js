import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const aspectsSchema = new mongoose.Schema({
  

   
 matricule: {
    type: String,
    ref: 'Hospitalisation',
    required: true,
  },


        AspectsNumber: {
            type: Number,
            default: null, // Allows null or can be left unset
        },

        // The details as an array of strings
        AspectsDetails: {
            type: [String], // Array of strings
            default: [],    // Defaults to an empty array if unset
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);
export default mongoose.model('ASPECTS', aspectsSchema);
