import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function to recursively remove keys with empty string, null, or undefined values.
 */
function removeEmpty(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      removeEmpty(value);
      if (Object.keys(value).length === 0) {
        delete obj[key];
      }
    } else if (value === '' || value === null || value === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

const t2SwanSchema = new Schema(
    {
      matricule: {
        type: String,
        ref: 'Hospitalisation',
        required: true,
      },
      status: {
        type: String,
        enum: ['Normal', 'Anormal'],
        required: true,
        default: 'Normal',
      },
      // Numeric fields for calculating total microbleeds count
      Profonds: {
        type: Number,
        default: undefined,
      },
      Sous_corticaux: {
        type: Number,
        default: undefined,
      },
      Total: {
        type: Number,
        default: undefined,
      },
      // Fields related to thrombus and transformation details
      Thrombusvisible: {
        type: String,
        default: undefined,
      },
      ThrombusvisibleTaille: {
        type: Number,
        default: undefined,
      },
      TransformationHemoragique: {
        type: String,
        default: undefined,
      },
      TypeTransformation: {
        type: String,
        default: undefined,
      },
      // Additional abnormal findings
      Hemosiderosecorticale: {
        type: String,
        default: undefined,
      },
      Signes_veineux_hypoxie: {
        type: String,
        default: undefined,
      },
      Microbleeds: {
        type: [String],
        default: undefined,
      },
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business logic and clean up empty fields.
t2SwanSchema.pre('save', function (next) {
  // If status is "Normal", clear all abnormal fields.
  if (this.status === 'Normal') {
    this.Profonds = undefined;
    this.Sous_corticaux = undefined;
    this.Total = undefined;
    this.Thrombusvisible = undefined;
    this.ThrombusvisibleTaille = undefined;
    this.TransformationHemoragique = undefined;
    this.TypeTransformation = undefined;
    this.Hemosiderosecorticale = undefined;
    this.Signes_veineux_hypoxie = undefined;
    this.Microbleeds = undefined;
  }
  // Remove any keys with empty, null, or undefined values.
  removeEmpty(this._doc);
  next();
});

const T2Swan = mongoose.model('T2Swan', t2SwanSchema);

export default T2Swan;
