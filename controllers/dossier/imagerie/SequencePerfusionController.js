

import SequencePerfusion from "../../../models/DossierMedical/imagerie/SequencePerfusion.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createSequencePerfusion = async (req, res, next) => {
    console.log("wsel")
   try {
     const  SequencePerfusionData  = req.body;
 console.log(req.body)
     
       await SequencePerfusion.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getSequencePerfusionDetails = async (req, res, next) => {
    console.log("getSequencePerfusion")
   try {
     const  matriculeId = req.params.id;
     
     const sequencePerfusion = await SequencePerfusion.findOne({ matricule : matriculeId})
       
     if (!sequencePerfusion) {
       
       // return next(errorHandler(404, 'SequencePerfusion not found'));
       return res.status(404).json({ message: 'SequencePerfusion not found.' });
       
     
     }
     console.log( sequencePerfusion )
           return res.json( sequencePerfusion );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };
 export const deleteSequencePerfusion = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const sequencePerfusion = await SequencePerfusion.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!sequencePerfusion) {
      return res.status(200).json({ message: "SequencePerfusion already deleted" });  // Return success response
    }

    await sequencePerfusion.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "SequencePerfusion record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};
 
export const updateSequencePerfusion = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const sequencePerfusion = await SequencePerfusion.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await sequencePerfusion.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


