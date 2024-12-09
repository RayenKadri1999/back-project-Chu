 import Hospitaliere from "../../models/DossierMedical/Hospitaliere.js";
 import { errorHandler } from '../../utils/error.js';
    

export const createHospitaliere = async (req, res, next) => {
    try {
      const  hospitaliereData  = req.body;
  console.log(req.body)
      
        await Hospitaliere.create(req.body)
       
  
      
      
  
      return res.status(201).json();
    } catch (error) {
      next(error);
      console.log(error.message);
    }
  };

  export const getHospitaliereDetails = async (req, res, next) => {
    try {
      const  matriculeId = req.params.id;
      
      const hospitaliere = await Hospitaliere.findOne({ matricule : matriculeId})
        
      if (!hospitaliere) {
   
        // return next(errorHandler(404, 'hospitaliere not found'));
        return res.status(404).json({ message: 'hospitaliere not found.' });
      
      }
      console.log( hospitaliere )
            return res.json( hospitaliere );
      
    } catch (error) {
      
      
      next(error);
      
    }
  };

  
export const updateHospitaliere = async (req, res, next) => {
  console.log(" matriculeId")
  try {
    const  matriculeId = req.params.id;
    console.log( matriculeId)
      
    const hospitaliere = await Hospitaliere.findOne({ matricule : matriculeId})
     

      const update = req.body;
      await hospitaliere.updateOne(update);
      
    

    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    next(error);
    
  }
};


