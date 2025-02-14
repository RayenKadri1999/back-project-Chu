import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define a subschema for checkZone with default values.
const checkZoneSchema = new Schema(
    {
        CerebralmoyenD: { type: Boolean, default: false },
        CerebralmoyenG: { type: Boolean, default: false },
        CerebralanterieurG: { type: Boolean, default: false },
        CerebralanterieurD: { type: Boolean, default: false },
        CerebralposterieurG: { type: Boolean, default: false },
        CerebralposterieurD: { type: Boolean, default: false },
        PontiqueparamedianG: { type: Boolean, default: false },
        PontiqueparamedianD: { type: Boolean, default: false },
        LaterobulbaireG: { type: Boolean, default: false },
        LaterobulbaireD: { type: Boolean, default: false },
        Latero_pontiqueG: { type: Boolean, default: false },
        Latero_pontiqueD: { type: Boolean, default: false },
        PICAG: { type: Boolean, default: false },
        PICAD: { type: Boolean, default: false },
        AICAG: { type: Boolean, default: false },
        AICAD: { type: Boolean, default: false },
        ACSG: { type: Boolean, default: false },
        ACSD: { type: Boolean, default: false },
        AttributeOption: { type: String, default: undefined },
        JonctionelG: { type: Boolean, default: false },
        JonctionelD: { type: Boolean, default: false },
    },
    { _id: false } // No separate _id for the subdocument.
);

// Define the main IRM schema.
const irmcerebraleSchema = new Schema(
    {
        matricule: {
            type: String,
            ref: 'Hospitalisation',
            required: true,
        },
        status: {
            type: String,
            enum: ['Oui', 'Non'],
            default: 'Non',
        },
        dateIRM: {
            type: Date,
            default: null,
        },
        dateFinIRM: {
            type: Date,
            default: null,
        },
        IRM_Cerebrale: {
            type: String,
            enum: ['Normale', 'Anormale',''],
            default: null,
        },
        Diffusion1: {
            type: String,
            enum: ['Normale', 'Anormale',''],
            default: null,
        },
        Diffusion2: {
            type: String,
            enum: ['Lacunaire', 'Non Lacunaire',''],
            default: null,
        },
        Details: {
            type: [String],
            default: null,
        },
        checkZone: {
            type: checkZoneSchema,
            default: null,
        },
    },
    { timestamps: true }
);

/**
 * Helper function that recursively removes keys that have empty
 * string, null, or undefined values from an object.
 */
function removeEmpty(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
            removeEmpty(value);
            // Delete the key if the object is empty after cleanup.
            if (Object.keys(value).length === 0) {
                delete obj[key];
            }
        } else if (value === '' || value === null || value === undefined) {
            delete obj[key];
        }
    });
    return obj;
}

// Pre-save middleware for logical integrity and cleanup.
irmcerebraleSchema.pre('save', function (next) {
    const cleanedData = {};
    Object.keys(this._doc).forEach((key) => {
        if (this[key] !== null && this[key] !== undefined && this[key] !== '') {
            cleanedData[key] = this[key];
        }
    });
    this._doc = cleanedData;
    next();
});
const IRMCerebrale = mongoose.model('IRMCérébrale', irmcerebraleSchema);

export default IRMCerebrale;
