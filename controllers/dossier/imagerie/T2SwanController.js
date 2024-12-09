

import T2Swan from "../../../models/DossierMedical/imagerie/T2Swan.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createT2Swan = async (req, res, next) => {
   
   try {
     const  T2SwanData  = req.body;
 console.log(req.body)
     
       await T2Swan.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     console.log(error.message)
   }
 };

 export const getT2SwanDetails = async (req, res, next) => {
    console.log("getT2Swan")
   try {
     const  matriculeId = req.params.id;
     
     const t2Swan = await T2Swan.findOne({ matricule : matriculeId})
       
     if (!t2Swan) {
       
       // return next(errorHandler(404, 'T2Swan not found'));
       return res.status(404).json({ message: 'T2Swan not found.' });
       
     
     }
     console.log( t2Swan )
           return res.json( t2Swan );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 export const deleteT2Swan = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const t2Swan = await T2Swan.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!t2Swan) {
      return res.status(200).json({ message: "T2Swan already deleted" });  // Return success response
    }

    await t2Swan.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "T2Swan record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};

export const updateT2Swan = async (req, res, next) => {

 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const t2Swan = await T2Swan.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await t2Swan.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


