import Hospitaliere from "../../models/DossierMedical/Hospitaliere.js";
import { errorHandler } from "../../utils/error.js";
import Joi from "joi";

// Input validation schema
const hospitaliereValidationSchema = Joi.object({
  Allergies: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  HTA: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  Hypercholestérolémie: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  Diabète: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  Fibrillation_auriculaire: Joi.string().valid("paroxystique", "permanente","").allow('').optional(),
  Ancienneté_fibrillation: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  SAS: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  SAS_appareillé: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  AIT: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  AVC: Joi.string().valid("ischémique", "hémorragique","").allow('').optional(),
  Cardiopathie_ischémique: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  Artériopathie: Joi.string().valid("Non",  "Oui","").allow('').optional(),
  Autres_antécédents: Joi.string().allow('').optional(),
  Vit: Joi.string().valid("seul", "en famille", "en institution", "Autre","").allow('').optional(),
  Latéralité: Joi.string().allow('').optional(),
  Profession: Joi.string().allow('').optional(),
  Autonomie: Joi.string().valid("Totale", "Partielle","").allow('').optional(),
  Tabagisme: Joi.string().allow('').optional(),
  Chicha: Joi.string().allow('').optional(),
  Neffa: Joi.string().allow('').optional(),
  Consommation_alcool: Joi.string().allow('').optional(),
  Rankin_préAVC: Joi.number().allow('').optional(),
  GIR: Joi.number().allow('').optional(),
  Poids: Joi.number().allow('').optional(),
  Taille: Joi.number().allow('').optional(),
  IMC: Joi.number().allow('').optional(),
  matricule: Joi.string().optional(),
  HistoireMaladie: Joi.string().allow('').optional(),
  TraitementEntrée: Joi.string().allow('').optional(),
  patient: Joi.string().optional()
}).unknown();

// Create a new Hospitaliere record
export const createHospitaliere = async (req, res, next) => {
  try {
    const { error, value } = hospitaliereValidationSchema.validate(req.body);
    if (error) {
      console.log(error)
      return res.status(400).json({ error: error.details[0].message });
    }

    const newHospitaliere = new Hospitaliere(value);
    await newHospitaliere.save();

    return res.status(201).json({ message: "Hospitaliere created successfully." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Get Hospitaliere details by matricule
export const getHospitaliereDetails = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;

    const hospitaliere = await Hospitaliere.findOne({ matricule: matriculeId });

    if (!hospitaliere) {
      return res.status(404).json({ message: "Hospitaliere not found." });
    }

    return res.json(hospitaliere);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Update a Hospitaliere record
// Update a Hospitaliere record
export const updateHospitaliere = async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.header)
    const matriculeId = req.params.id;
    const { error, value } = hospitaliereValidationSchema.validate(req.body);

    if (error) {
      console.log(error)
      return res.status(400).json({ error: error.details[0].message });
    }

    const hospitaliere = await Hospitaliere.findOne({ matricule: matriculeId });

    if (!hospitaliere) {
      return res.status(404).json({ message: "Hospitaliere not found." });
    }

    // Ensure no _id field is being passed in update
    const updateData = { ...value };
    delete updateData._id; // If _id exists in the data, it should be removed

    // Use $set to update only the fields you want
    await hospitaliere.updateOne({ $set: updateData });
console.log("success")
    return res.status(200).json({ message: "Hospitaliere updated successfully." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Delete a Hospitaliere record
export const deleteHospitaliere = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;

    const hospitaliere = await Hospitaliere.findOneAndDelete({ matricule: matriculeId });

    if (!hospitaliere) {
      return res.status(404).json({ message: "Hospitaliere not found." });
    }

    return res.status(200).json({ message: "Hospitaliere deleted successfully." });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
