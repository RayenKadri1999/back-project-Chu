 import Prehospitaliere from "../../models/DossierMedical/Prehospitaliere.js";
 import { errorHandler } from '../../utils/error.js';
    

export const createprehospitaliere = async (req, res, next) => {
    try {
      const  prehospitaliereData  = req.body;
      
      // Clean enum values for backward compatibility
      if (prehospitaliereData.quiAppelNeurologue === "Autre") {
        prehospitaliereData.quiAppelNeurologue = "Autres";
      }
      if (prehospitaliereData.motifAppel === "Autre motif") {
        prehospitaliereData.motifAppel = "Autres";
      }
      
      console.log("Creating with cleaned data:", prehospitaliereData);
      await Prehospitaliere.create(prehospitaliereData)
       
  
      
      
  
      return res.status(201).json();
    } catch (error) {
      next(error);
      console.log(error.message)
    }
  };

  export const getPrehospitaliereDetails = async (req, res, next) => {
    try {
      const  matriculeId = req.params.id;
      
      const prehospitaliere = await Prehospitaliere.findOne({ matricule : matriculeId})
        // .populate('prehospitaliere')
        // .populate('hospitaliere')
        // .exec();
        
      if (!prehospitaliere) {
   
        // return next(errorHandler(404, 'Prehospitaliere not found'));
        return res.status(404).json({ message: 'Prehospitaliere not found.' });
      
      }
      
      // Clean enum values when returning data for backward compatibility
      const cleanedData = prehospitaliere.toObject();
      if (cleanedData.quiAppelNeurologue === "Autre") {
        cleanedData.quiAppelNeurologue = "Autres";
      }
      if (cleanedData.motifAppel === "Autre motif") {
        cleanedData.motifAppel = "Autres";
      }
      
      console.log("Returning cleaned data:", cleanedData);
      return res.json(cleanedData);
      
    } catch (error) {
      
      
      next(error);
      
    }
  };

  
export const updatePrehospitaliere = async (req, res, next) => {
  console.log(" matriculeId")
  try {
    const  matriculeId = req.params.id;
    console.log( matriculeId)
      
    const prehospitaliere = await Prehospitaliere.findOne({ matricule : matriculeId})
     
    const update = req.body;
    
    // Clean enum values for backward compatibility
    if (update.quiAppelNeurologue === "Autre") {
      update.quiAppelNeurologue = "Autres";
    }
    if (update.motifAppel === "Autre motif") {
      update.motifAppel = "Autres";
    }
    
    console.log("Updating with cleaned data:", update);
    await prehospitaliere.updateOne(update);
      
    

    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    next(error);
    
  }
};


