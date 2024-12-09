

import TSA from "../../../models/DossierMedical/imagerie/TSA.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createTSA = async (req, res, next) => {
    console.log("wsel")
   try {
     const  TSAData  = req.body;
 console.log(req.body)
     
       await TSA.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getTSADetails = async (req, res, next) => {
    console.log("getTSA")
   try {
     const  matriculeId = req.params.id;
     
     const tSA = await TSA.findOne({ matricule : matriculeId})
       
     if (!tSA) {
       
       // return next(errorHandler(404, 'TSA not found'));
       return res.status(404).json({ message: 'TSA not found.' });
       
     
     }
     console.log( tSA )
           return res.json( tSA );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateTSA = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const tSA = await TSA.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await TSA.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};

export const deleteTSA = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const tSA = await TSA.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!tSA) {
      return res.status(200).json({ message: "TSA already deleted" }); 
    }

    await tSA.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "TSA record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};
