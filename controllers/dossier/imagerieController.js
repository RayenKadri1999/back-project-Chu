import Imagerie from "../../models/DossierMedical/ImagerieModel.js";
import { errorHandler } from '../../utils/error.js';
   

export const createImagerie = async (req, res, next) => {
    console.log("wsel")
   try {
     const  ImagerieData  = req.body;
 console.log(req.body)
     
       await Imagerie.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getImagerieDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const imagerie = await Imagerie.findOne({ matricule : matriculeId})
       
     if (!imagerie) {
       
       // return next(errorHandler(404, 'imagerie not found'));
       return res.status(404).json({ message: 'imagerie not found.' });
       
     
     }
     console.log( imagerie )
           return res.json( imagerie );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateImagerie = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const imagerie = await Imagerie.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await imagerie.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


