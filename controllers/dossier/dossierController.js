import Dossier from "../../models/DossierMedical/Dossier.js";



export const createPatientDossiers = async (req, res, next) => {
    try {
 
      console.log(req.body)
      
        await Dossier.create(req.body)
       
      return res.status(201).json();
    } catch (error) {
      next(error);
      // console.log(error.message)
    }
  };
 
  export const getPatientDossiersDetails = async (req, res, next) => {
    try {
      const patientId = req.params.id;
  
      const dossier = await Dossier.findOne({patient :patientId})
        
      if (!dossier) {
        console.log('Dossier not found.')
 
        // return next(errorHandler(404, 'EvolutionClassification not found'));
        return res.status(404).json({ message: 'Dossier not found.' });
      
      }
    
            return res.json( dossier );
      
    } catch (error) {
      
      
      next(error);
      
    }
  };
 
  
 export const updatePatientDossiers = async (req, res, next) => {

  try {
    const patientId = req.params.id;
    console.log(patientId)
      
    const dossier = await Dossier.findOne({patient :patientId})
     
 
      const update = req.body;
      await dossier.updateOne(update);
      
    
 
    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    next(error);
    
  }
 };

 
 