

import IRMCérébrale from "../../../models/DossierMedical/imagerie/IRMCérébrale.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createIRMCérébrale = async (req, res, next) => {
    console.log("wsel")
   try {
     const  IRMCérébraleData  = req.body;
 console.log(req.body)
     
       await IRMCérébrale.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     console.log(error.message)
   }
 };

 export const getIRMCérébraleDetails = async (req, res, next) => {
    console.log("getIRMCérébrale")
   try {
     const  matriculeId = req.params.id;
     
     const iRMCérébrale = await IRMCérébrale.findOne({ matricule : matriculeId})
       
     if (!iRMCérébrale) {
       
       // return next(errorHandler(404, 'IRMCérébrale not found'));
       return res.status(404).json({ message: 'IRMCérébrale not found.' });
       
     
     }
     console.log( iRMCérébrale )
           return res.json( iRMCérébrale );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateIRMCérébrale = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const iRMCérébrale = await IRMCérébrale.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await iRMCérébrale.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


