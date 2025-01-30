import { errorHandler } from '../utils/error.js';
import Patient from '../models/Patient.js';
//import DossierMedical from '../models/DossierMedical/DossierMedical.js';
import Prehospitaliere from '../models/DossierMedical/Prehospitaliere.js';
import Hospitaliere from '../models/DossierMedical/Hospitaliere.js';
import Imagerie from '../models/DossierMedical/ImagerieModel.js';
import Initial from '../models/DossierMedical/InitialModel.js';
import NIHSS from '../models/DossierMedical/Nihss.js';
import ExamenComplementaire from '../models/DossierMedical/ExamenComplementaire.js';
import ConclusionSortie from '../models/DossierMedical/ConclusionSortie.js'
import Dossier from '../models/DossierMedical/Dossier.js';
import Joi from 'joi';



const patientSchema = Joi.object({
 
  Nom: Joi.string().required(), // Last name
  Prenom: Joi.string().required(), // First name
  sexe: Joi.string()
    .valid('homme', 'femme') // Allowed values: "homme" or "femme"
    .required(),
  _id: Joi.string().required(), 
  Adresse: Joi.string().optional(), // Address
  telephone: Joi.string().optional(), // Phone number (optional)
  email: Joi.string().email().optional(), // Email (required)
  dateNaissance: Joi.string().required(), // Date of birth (required)
  aidantPrincipal: Joi.string().allow('').optional(),
  numeroAidantPrincipal: Joi.string().allow('').optional(),
  signatureDocteur: Joi.string().allow('').optional(),
  numero_dossier:Joi.string().allow("").optional(),
  createdAt: Joi.string().optional(), // createdAt (optional)
  updatedAt: Joi.string().optional(), // updatedAt (optional)

  __v:Joi.number().optional(),
});




export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};



export const createPatient = async (req, res, next) => {
  const { error } = patientSchema.validate(req.body);

  if (error) {
    console.log(error)
    return res.status(400).json({ error: error.details[0].message });
    
  }

  try {
    
    const patient = await Patient.create(req.body);
   return res.status(201).json(patient);

  } catch (error) {

    if (error.name === 'MongoServerError' && error.code === 11000)
  
       { // Handle duplicate key errors
      return res.status(409).json({ error: 'Le numéro de dossier existe !' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } 
    
    next(error);
    
  }
};

export const updatePatient = async (req, res, next) => {
   const { error } = patientSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    
    // Retrieve the patient by ID
    const patient = await Patient.findById(req.params.id);

    // Check if the patient with the given ID exists
    if (!patient) {
      return next(errorHandler(404, 'Patient not found'));
    }
    

    // Save the updated patient to the database
    const update = req.body;
    console.log(update)
    await patient.updateOne(update);
    

    // const updatedPatient = await patient.save();

    res.status(201).json('Patient has been updated!');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } 
    next(error);
  }
};

export const deletePatient = async (req, res, next) => {
  console.log("Delete Patient Request Received");
  console.log("Request Params:", req.params);
  console.log("Request User (Decoded from Token):", req.user); // Assuming the decoded user is available on req.user

  try {
    // Check if the ID is provided
    if (!req.params.id) {
      console.error("Error: Patient ID is missing in request parameters");
      return next(errorHandler(400, "Patient ID is required"));
    }

    console.log("Looking for patient with ID:", req.params.id);

    // Retrieve the patient by ID
    const patient = await Patient.findById(req.params.id);

    console.log("Patient Found:", patient);

    // Check if the patient with the given ID exists
    if (!patient) {
      console.error("Error: Patient not found");
      return next(errorHandler(404, "Patient not found"));
    }

    console.log("Deleting patient with ID:", req.params.id);

    // Delete the patient from the database
    await Patient.findByIdAndDelete(req.params.id);

    console.log("Patient deleted successfully");
    res.status(200).json("Patient has been deleted!");
  } catch (error) {
    console.error("An error occurred while deleting the patient");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    next(error);
  }
};


export const getPatients = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;//The number of patients to retrieve (default is 9).
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const patients = await Patient.find({
      $or: [
        { Nom: { $regex: searchTerm, $options: 'i' } },
        { Prenom: { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};



export const getPatient = async (req, res, next) => {
  console.log(req.params.id)
  try {
 
    // Retrieve the patient by ID
    const patient = await Patient.findById(req.params.id);
    
    // Check if the patient with the given ID exists
    if (!patient) {
    
      return next(errorHandler(404, 'Patient not found'));
    }

    // Send the entire patient document in the response
    res.status(200).json(patient);
  } catch (error) {
   
    next(error);
  }
};
export const getPatientDossiers = async (req, res, next) => {
  // if (req.patient.id === req.params.id)
    //  {
  
    try {
      const dossiers = await Dossier.findOne({ patientRef: req.params.id });
      res.status(200).json(dossiers);
    } catch (error) {
     console.log(error.message)
      next(error);
    }
  // } else {
  //   return next(errorHandler(401, 'NOT FOUND!'));
  // }
};
