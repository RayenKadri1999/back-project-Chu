
import ConclusionInitiale from "../../models/DossierMedical/ConclusionInitiale.js";
import { errorHandler } from '../../utils/error.js';
   

export const createConclusionInitiale = async (req, res, next) => {
   try {
    
     console.log(req.body)
     
       await ConclusionInitiale.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getConclusionInitialeDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const conclusionInitiale = await ConclusionInitiale.findOne({ matricule : matriculeId})
       
     if (!conclusionInitiale) {
  
       // return next(errorHandler(404, 'ConclusionInitiale not found'));
       return res.status(404).json({ message: 'ConclusionInitiale not found.' });
     
     }
  
           return res.json( conclusionInitiale );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateConclusionInitiale = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const conclusionInitiale = await ConclusionInitiale.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await conclusionInitiale.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


