import ExamenClinique from "../../models/DossierMedical/ExamenClinique.js";
import { errorHandler } from '../../utils/error.js';
   

export const createExamenClinique = async (req, res, next) => {
   try {
     const  examencliniqueData  = req.body;
     console.log(req.body)
     
       await ExamenClinique.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
      console.log(error.message)
   }
 };

 export const getExamenCliniqueDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const examenclinique = await ExamenClinique.findOne({ matricule : matriculeId})
       
     if (!examenclinique) {
  
       // return next(errorHandler(404, 'examenclinique not found'));
       return res.status(404).json({ message: 'ExamenClinique not found.' });
     
     }
     console.log( examenclinique )
           return res.json( examenclinique );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateExamenClinique = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const examenclinique = await ExamenClinique.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await examenclinique.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


