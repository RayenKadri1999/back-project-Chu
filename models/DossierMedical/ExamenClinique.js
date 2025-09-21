import mongoose from "mongoose";
import BaseTabSchema from "./BaseTabSchema.js";

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
            enum: ["Aux liquides", "Aux solides", "Globale"],
            required: function () {
                return this.testDone === true && this.hasTrouble === true;
            },
        },
    },
    { _id: false }
);

const examenCliniqueSchema = new Schema(
    {
        NIHSSValue: {
            type: Number,
        },
        idNIHSS: {
            type: Schema.Types.ObjectId,
            ref: "NIHSS",
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
            enum: ["Oui", "Non"],
        },
        ResultsExamenGeneral: {
            type: String,
        },
        testDeglutition: testDeglutitionSchema,
        matricule: {
            type: String,
            ref: "Hospitalisation",
            required: true,
        },
        reviewInfo: { type: BaseTabSchema, default: () => ({}) },
    },
    {
        timestamps: true,
        minimize: true,
    }
);

// Fixed pre-save hook that preserves _id and other essential fields
examenCliniqueSchema.pre("save", function (next) {
    function clean(doc, visited = new WeakSet()) {
        // Prevent circular reference by tracking visited objects
        if (visited.has(doc)) {
            return;
        }
        visited.add(doc);

        Object.keys(doc).forEach((key) => {
            // Skip essential MongoDB and Mongoose fields
            if (key === "_id" || key === "__v" || key === "id") {
                return;
            }

            if (
                doc[key] === "" ||
                doc[key] === null ||
                doc[key] === undefined ||
                (typeof doc[key] === "object" &&
                    doc[key] !== null &&
                    !Array.isArray(doc[key]) &&
                    Object.keys(doc[key]).length === 0)
            ) {
                delete doc[key];
            } else if (
                typeof doc[key] === "object" &&
                doc[key] !== null &&
                !Array.isArray(doc[key]) &&
                !(doc[key] instanceof Date) &&
                !(doc[key] instanceof mongoose.Types.ObjectId)
            ) {
                clean(doc[key], visited);
            }
        });
    }

    clean(this);
    next();
});
export default mongoose.model("ExamenClinique", examenCliniqueSchema);
