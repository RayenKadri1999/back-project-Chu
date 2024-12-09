import Biologie from "../../models/DossierMedical/Biologie.js";
import { errorHandler } from '../../utils/error.js';
   

export const createBiologie = async (req, res, next) => {
   try {
     const  BiologieData  = req.body;
     console.log(req.body)
     
       await Biologie.create(req.body)
      
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getBiologieDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const biologie = await Biologie.findOne({matricule : matriculeId})
       
     if (!biologie) {
  
       // return next(errorHandler(404, 'biologie not found'));
       return res.status(404).json({ message: 'Biologie not found.' });
     
     }
     console.log( biologie )
           return res.json( biologie );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateBiologie = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const biologie = await Biologie.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await biologie.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


