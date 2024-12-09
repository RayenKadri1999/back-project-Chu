

import TOAST from "../../../models/DossierMedical/etiologie/TOAST.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createTOAST = async (req, res, next) => {
    console.log("wsel")
   try {
     const  TOASTData  = req.body;
 console.log(req.body)
     
       await TOAST.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     console.log(error.message)
   }
 };

 export const getTOASTDetails = async (req, res, next) => {
    console.log("getTOAST")
   try {
     const  matriculeId = req.params.id;
     
     const toast = await TOAST.findOne({ matricule : matriculeId})
       
     if (!toast) {
       
       // return next(errorHandler(404, 'TOAST not found'));
       return res.status(404).json({ message: 'TOAST not found.' });
       
     
     }
     console.log( toast )
           return res.json( toast );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateTOAST = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const toast = await TOAST.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await toast.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


