

import ASPECTS from "../../../models/DossierMedical/imagerie/ASPECTS.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createASPECTS = async (req, res, next) => {
    console.log("wsel")
   try {
     const  ASPECTSData  = req.body;
 console.log(req.body)
     
       await ASPECTS.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     // console.log(error.message)
   }
 };

 export const getASPECTSDetails = async (req, res, next) => {
    console.log("getASPECTS")
   try {
     const  matriculeId = req.params.id;
     
     const aspects = await ASPECTS.findOne({ matricule : matriculeId})
       
     if (!aspects) {
       
       // return next(errorHandler(404, 'ASPECTS not found'));
       return res.status(404).json({ message: 'ASPECTS not found.' });
       
     
     }
     console.log( aspects )
           return res.json( aspects );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateASPECTS = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const aspects = await ASPECTS.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await aspects.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};

export const deleteASPECTS = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const aspects = await ASPECTS.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!aspects) {
      return res.status(200).json({ message: "ASPECTS already deleted" }); 
    }

    await aspects.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "ASPECTS record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};


