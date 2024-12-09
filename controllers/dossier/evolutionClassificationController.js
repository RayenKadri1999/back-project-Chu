
import EvolutionClassification from "../../models/DossierMedical/EvolutionClassification.js";
import { errorHandler } from '../../utils/error.js';
   

export const createEvolutionClassification = async (req, res, next) => {
   try {

     console.log(req.body)
     
       await EvolutionClassification.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getEvolutionClassificationDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const evolutionClassification = await EvolutionClassification.findOne({ matricule : matriculeId})
       
     if (!evolutionClassification) {
  
       // return next(errorHandler(404, 'EvolutionClassification not found'));
       return res.status(404).json({ message: 'EvolutionClassification not found.' });
     
     }
     console.log( evolutionClassification )
           return res.json( evolutionClassification );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateEvolutionClassification = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const evolutionClassification = await EvolutionClassification.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await evolutionClassification.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


