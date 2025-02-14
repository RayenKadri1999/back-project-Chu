

import ScannerPerfusion from "../../../models/DossierMedical/imagerie/ScannerPerfusion.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createScannerPerfusion = async (req, res, next) => {
    console.log("wsel")
   try {
     const  ScannerPerfusionData  = req.body;
 console.log(req.body)
     
       await ScannerPerfusion.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
        console.log(error.message)
     next(error);
     // console.log(error.message)
   }
 };

 export const getScannerPerfusionDetails = async (req, res, next) => {
    console.log("getScannerPerfusion")
   try {
     const  matriculeId = req.params.id;
     
     const scannerPerfusion = await ScannerPerfusion.findOne({ matricule : matriculeId})
       
     if (!scannerPerfusion) {
       
       // return next(errorHandler(404, 'ScannerPerfusion not found'));
       return res.status(404).json({ message: 'ScannerPerfusion not found.' });
       
     
     }
    
           return res.json( scannerPerfusion );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateScannerPerfusion = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const scannerPerfusion = await ScannerPerfusion.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await ScannerPerfusion.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


