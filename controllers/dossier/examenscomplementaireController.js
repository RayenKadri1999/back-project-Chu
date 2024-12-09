
import ExamenComplementaire from "../../models/DossierMedical/ExamenComplementaire.js";
import { errorHandler } from '../../utils/error.js';
   

export const createExamensComplementaires = async (req, res, next) => {
   try {
     const  examenscomplementairesData  = req.body;
     console.log(req.body)
     
       await ExamenComplementaire.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getExamensComplementairesDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const examenscomplementaires = await ExamenComplementaire.findOne({ matricule : matriculeId})
       
     if (!examenscomplementaires) {
  
       // return next(errorHandler(404, 'examenscomplementaires not found'));
       return res.status(404).json({ message: 'examenscomplementaires not found.' });
     
     }
     console.log( examenscomplementaires )
           return res.json( examenscomplementaires );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateExamensComplementairesClinique = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const examenscomplementaires = await ExamenComplementaire.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await examenscomplementaires.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


