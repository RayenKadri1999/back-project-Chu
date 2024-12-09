import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const irmcerebraleSchema = new mongoose.Schema({
  matricule: {
    type: String,
    ref: 'Hospitalisation', // Ensure this reference is set up properly in your database
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Oui', 'Non'], // Validates the status field
  },
  dateIRM: {
    type: Date,
    required: function () {
      return this.status === 'Oui';
    },
  },
  dateFinIRM: {
    type: Date,
    required: function () {
      return this.status === 'Oui';
    },
  },
  IRM_Cerebrale: {
    type: String,
    required: function () {
      return this.status === 'Oui';
    },
    enum: ['Normale', 'Anormale'], // Validates the possible values
  },
  Diffusion1: {
    type: String,
    required: function () {
      return this.IRM_Cerebrale === 'Anormale' && this.status === 'Oui';
    },
    enum: ['Normale', 'Anormale'], // Validates the possible values
  },
  Diffusion2: {
    type: String,
    required: function () {
      return this.IRM_Cerebrale === 'Anormale' && this.Diffusion1 === 'Anormale';
    },
    enum: ['Lacunaire', 'Non Lacunaire'], // Validates the possible values
  },
  Details: {
    type: [String], // Array of strings for detailed descriptions
    required: function () {
      return this.IRM_Cerebrale === 'Anormale' && this.Diffusion1 === 'Anormale';
    },
    default: [],
  },
});

// Pre-save Middleware for Logical Integrity
irmcerebraleSchema.pre('save', function (next) {
  // If status is "Non", reset dependent fields
  if (this.status === 'Non') {
    this.dateIRM = undefined;
    this.dateFinIRM = undefined;
    this.IRM_Cerebrale = undefined;
    this.Diffusion1 = undefined;
    this.Diffusion2 = undefined;
    this.Details = [];
  }

  // If IRM_Cerebrale is not "Anormale", reset related fields
  if (this.IRM_Cerebrale !== 'Anormale') {
    this.Diffusion1 = undefined;
    this.Diffusion2 = undefined;
    this.Details = [];
  }

  next();
});

// Export the model
export default mongoose.model('IRMCérébrale', irmcerebraleSchema);
