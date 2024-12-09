 import Prehospitaliere from "../../models/DossierMedical/Prehospitaliere.js";
 import { errorHandler } from '../../utils/error.js';
    

export const createprehospitaliere = async (req, res, next) => {
    try {
      const  prehospitaliereData  = req.body;
  console.log("wsel")
      // Create a new prehospitaliere instance
      //  const prehospitaliereInstance = new Prehospitaliere(prehospitaliereData);
        await Prehospitaliere.create(req.body)
       
  
      
      
  
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
      console.log( prehospitaliere )
            return res.json( prehospitaliere );
      
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
      await prehospitaliere.updateOne(update);
      
    

    return res.status(201).json();
  } catch (error) {
    console.log(error.message);
    next(error);
    
  }
};


