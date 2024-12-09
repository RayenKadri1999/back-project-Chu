

import Flair from "../../../models/DossierMedical/imagerie/FlairModel.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createFlair = async (req, res, next) => {
    console.log("wsel")
   try {
     const  FlairData  = req.body;
 console.log(req.body)
     
       await Flair.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getFlairDetails = async (req, res, next) => {
    console.log("getflair")
   try {
     const  matriculeId = req.params.id;
     
     const flair = await Flair.findOne({ matricule : matriculeId})
       
     if (!flair) {
       
       // return next(errorHandler(404, 'Flair not found'));
       return res.status(404).json({ message: 'flair not found.' });
       
     
     }
     console.log( flair )
           return res.json( flair );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 export const deleteFlair = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const flair = await Flair.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!flair) {
      return res.status(200).json({ message: "Flair already deleted" }); 
    }

    await flair.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "Flair record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};

export const updateFlair = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const flair = await Flair.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await flair.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


