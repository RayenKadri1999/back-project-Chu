import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Helper function that recursively removes keys with empty string, null,
 * or undefined values from an object.
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

const flairSchema = new Schema(
    {
      matricule: {
        type: String,
        ref: 'Hospitalisation',
        required: true,
      },
      Status: {
        type: String,
        enum: ['Normale', 'Anormale'],
        required: true,
        default: 'Normale',
      },
      Details: {
        type: [String],
        default: undefined,
      },
      SequentielleAVC: {
        type: String,
        default: undefined,
      },
      Cortex: {
        type: String,
        default: undefined,
      },
      SubstanceBlanche: {
        type: String,
        default: undefined,
      },
      NoyauGris: {
        type: String,
        default: undefined,
      },
      Score_Collateralite: {
        type: Number,
        default: undefined,
      },
      Peri_ventriculaire: {
        type: String,
        default: undefined,
      },
      sous_corticale: {
        type: String,
        default: undefined,
      },
      Score_Fazekas: {
        type: Number,
        default: undefined,
      },
    },
    { timestamps: true }
);

// Pre-save middleware to enforce business logic and cleanup.
flairSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});

const Flair = mongoose.model('Flair', flairSchema);

export default Flair;
