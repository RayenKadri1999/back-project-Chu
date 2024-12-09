

import FatSat from "../../../models/DossierMedical/imagerie/FatSat.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createFatSat = async (req, res, next) => {
    console.log("wsel")
   try {
     const  FatSatData  = req.body;
 console.log(req.body)
     
       await FatSat.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getFatSatDetails = async (req, res, next) => {
    console.log("getFatSat")
   try {
     const  matriculeId = req.params.id;
     
     const fatSat = await FatSat.findOne({ matricule : matriculeId})
       
     if (!fatSat) {
       
       // return next(errorHandler(404, 'FatSat not found'));
       return res.status(404).json({ message: 'FatSat not found.' });
       
     
     }
     console.log( fatSat )
           return res.json( fatSat );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };


 export const deleteFatSat = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const fatSat = await FatSat.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!fatSat) {
      return res.status(200).json({ message: "FatSat already deleted" }); 
    }

    await fatSat.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "FatSat record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};
 
export const updateFatSat = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const fatSat = await FatSat.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await fatSat.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


