

import Scanner from "../../../models/DossierMedical/imagerie/Scanner.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createScanner = async (req, res, next) => {
    
   try {
     const  ScannerData  = req.body;
 console.log(req.body)
     
       await Scanner.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getScannerDetails = async (req, res, next) => {
    console.log("getScanner")
   try {
     const  matriculeId = req.params.id;
     
     const scanner = await Scanner.findOne({ matricule : matriculeId})
       
     if (!scanner) {
       
       // return next(errorHandler(404, 'Scanner not found'));
       return res.status(404).json({ message: 'Scanner not found.' });
       
     
     }
     console.log( scanner )
           return res.json( scanner );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateScanner = async (req, res, next) => {

 try {
   const  matriculeId = req.params.id;
   
     
   const scanner = await Scanner.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await scanner.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


