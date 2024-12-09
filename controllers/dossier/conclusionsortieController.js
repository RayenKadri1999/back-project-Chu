
import ConclusionSortie from "../../models/DossierMedical/ConclusionSortie.js";
import { errorHandler } from '../../utils/error.js';
   

export const createConclusionSortie = async (req, res, next) => {
   try {
    
     console.log(req.body)
     
       await ConclusionSortie.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getConclusionSortieDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const conclusionsortie = await ConclusionSortie.findOne({ matricule : matriculeId})
       
     if (!conclusionsortie) {
  
       // return next(errorHandler(404, 'ConclusionSortie not found'));
       return res.status(404).json({ message: 'ConclusionSortie not found.' });
     
     }
     console.log( conclusionsortie )
           return res.json( conclusionsortie );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateConclusionSortie = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const conclusionsortie = await ConclusionSortie.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await conclusionsortie.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


