

import ASCOD from "../../../models/DossierMedical/etiologie/ASCOD.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createASCOD = async (req, res, next) => {
    console.log("wsel")
   try {
     const  ASCODData  = req.body;
 console.log(req.body)
     
       await ASCOD.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getASCODDetails = async (req, res, next) => {
    console.log("getASCOD")
   try {
     const  matriculeId = req.params.id;
     
     const ascod = await ASCOD.findOne({ matricule : matriculeId})
       
     if (!ascod) {
       
       // return next(errorHandler(404, 'ascod not found'));
       return res.status(404).json({ message: 'ASCOD not found.' });
       
     
     }
     console.log( ascod )
           return res.json( ascod );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateASCOD = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const ascod = await ASCOD.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await ascod.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


