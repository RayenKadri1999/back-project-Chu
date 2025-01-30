import { errorHandler } from '../utils/error.js';
import Hospitalisation from '../models/Hospitalisation.js';
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

//import jwt from 'jsonwebtoken';


const hospitalisationSchema = Joi.object({
 
  entreeFaitPar: Joi.string().required(), 
  sortieFaitPar: Joi.string().allow('').optional(),
  dateEntree: Joi.date().required(),
  _id: Joi.string().required(), 
  status: Joi.string().required(),
  dateSortie: Joi.alternatives().try(Joi.date(), Joi.string().valid(''), Joi.valid(null)).optional(),

  TypeAVC: Joi.string().valid('Infarctus cérébral', 'Hématome cérébral').optional(), 
  dossier: Joi.string().required(), 
 
  createdAt: Joi.string().optional(), // createdAt (optional)
  updatedAt: Joi.string().optional(), // updatedAt (optional)
  __v:Joi.number().optional(),
});





export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};



export const createHospitalisation = async (req, res, next) => {
  const { error } = hospitalisationSchema.validate(req.body);

  if (error) {
    
    return res.status(400).json({ error: error.details[0].message });
    
  }

  try {
    
    const hospitalisation = await Hospitalisation.create(req.body);
    
    return res.status(201).json(hospitalisation);


  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } 

    if (error.name === 'MongoServerError' && error.code === 11000)
  
      { // Handle duplicate key errors
     return res.status(409).json({ error: 'La matricule existe déja !' });
   }

    next(error);
  }
};

export const updateHospitalisation = async (req, res, next) => {
  const { error } = hospitalisationSchema.validate(req.body);
console.log(req.body)

  if (error) {
console.log(error)
    return res.status(400).json({ error: error.details[0].message });

  }
  try {
    
    // Retrieve the hospitalisation by ID
    const hospitalisation = await Hospitalisation.findById(req.params.id);

    // Check if the hospitalisation with the given ID exists
    if (!hospitalisation) {
      return next(errorHandler(404, 'Hospitalisation n"existe plus !'));
    }



    // Save the updated hospitalisation to the database
    const update = req.body;
    await hospitalisation.updateOne(update);
   res.status(201).json('Hospitalisation has been updated!');


  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      return res.status(400).json({ error: error.message });
    } 
    next(error);
  }
};

export const deleteHospitalisation = async (req, res, next) => {
  try {
    // Retrieve the hospitalisation by ID
    const hospitalisation = await Hospitalisation.findById(req.params.id);

    // Check if the hospitalisation with the given ID exists
    if (!hospitalisation) {
      return next(errorHandler(404, 'Hospitalisation not found'));
    }

    // Delete the hospitalisation from the database
    await Hospitalisation.findByIdAndDelete(req.params.id);

    res.status(200).json('Hospitalisation has been deleted!');
  } catch (error) {
    next(error);
  }
};


export const getHospitalisations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;//The number of hospitalisations to retrieve (default is 9).
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
    const idDossier=req.params.idDossier;


  


     const hospitalisations = await Hospitalisation.find({dossier:idDossier})
     .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      console.log(hospitalisations);
    return res.status(200).json(hospitalisations);
    

  } catch (error) {
    console.log("hospitalisations")
    console.log(error.message)
    next(error);
  }
};



export const getHospitalisation = async (req, res, next) => {
  try {
   
    // Retrieve the hospitalisation by ID
    const hospitalisation = await Hospitalisation.findById(req.params.id);

    // Check if the hospitalisation with the given ID exists
    if (!hospitalisation) {
      
      return next(errorHandler(404, 'Hospitalisation not found'));
    }

    // Send the entire hospitalisation document in the response
    res.status(200).json(hospitalisation);
  } catch (error) {
   
    next(error);
  }
};
export const getHospitalisationDossiers = async (req, res, next) => {
  // if (req.hospitalisation.id === req.params.id)
    //  {
  
    try {
      const dossiers = await Dossier.findOne({ dossier: req.params.id });
      res.status(200).json(dossiers);
    } catch (error) {
     console.log(error.message)
      next(error);
    }
  // } else {
  //   return next(errorHandler(401, 'NOT FOUND!'));
  // }
};
