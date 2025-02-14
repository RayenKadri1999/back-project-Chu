import mongoose from 'mongoose';

const { Schema } = mongoose;

const testDeglutitionSchema = new Schema(
    {
      testDone: {
        type: Boolean,
      },
      hasTrouble: {
        type: Boolean,
        required: function () {
          return this.testDone === true;
        },
      },
      typeOfTrouble: {
        type: String,
        enum: ['Aux liquides', 'Aux solides', 'Globale'],
        required: function () {
          return this.testDone === true && this.hasTrouble === true;
        },
      },
    },
    { _id: false } // Prevents creation of _id for subdocument
);

const examenCliniqueSchema = new Schema(
    {
      NIHSSValue: {
        type: Number,
      },
      idNIHSS: {
        type: Schema.Types.ObjectId,
        ref: 'NIHSS',
      },
      LASTInitial: {
        type: Number,
      },
      ResultExamenNeuroInitial: {
        type: String,
      },
      TA: {
        type: String,
      },
      Dextro: {
        type: String,
      },
      AuscultationCardiaque: {
        type: String,
      },
      AuscultationPulmonaire: {
        type: String,
      },
      SouffleCarotidien: {
        type: String,
        enum: ['Oui', 'Non'],
      },
      ResultsExamenGeneral: {
        type: String,
      },
      testDeglutition: testDeglutitionSchema,
      matricule: {
        type: String,
        ref: 'Hospitalisation',
        required: true,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
      minimize: true,   // Prevents saving empty objects
    }
);

// Pre-save hook to clean empty/null/undefined fields before saving
examenCliniqueSchema.pre('save', function (next) {
  function clean(doc) {
    Object.keys(doc).forEach((key) => {
      if (
          doc[key] === '' ||
          doc[key] === null ||
          doc[key] === undefined ||
          (typeof doc[key] === 'object' && !Array.isArray(doc[key]) && Object.keys(doc[key]).length === 0)
      ) {
        delete doc[key];
      } else if (typeof doc[key] === 'object' && !Array.isArray(doc[key])) {
        clean(doc[key]); // Recursive cleaning for nested objects
      }
    });
  }
  clean(this);
  next();
});

export default mongoose.model('ExamenClinique', examenCliniqueSchema);
