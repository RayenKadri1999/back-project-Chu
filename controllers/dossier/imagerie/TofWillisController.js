

import TofWillis from "../../../models/DossierMedical/imagerie/TofWillis.js";

import { errorHandler } from '../../../utils/error.js';
   

export const createTofWillis = async (req, res, next) => {
    console.log("wsel")
   try {
     const  TofWillisData  = req.body;
 console.log(req.body)
     
       await TofWillis.create(req.body)
      
 
     
     
 
     return res.status(201).json();
   } catch (error) {
     next(error);
     console.log(error.message)
   }
 };

 export const getTofWillisDetails = async (req, res, next) => {
    console.log("getTofWillis")
   try {
     const  matriculeId = req.params.id;
     
     const tofWillis = await TofWillis.findOne({ matricule : matriculeId})
       
     if (!tofWillis) {
       
       // return next(errorHandler(404, 'TofWillis not found'));
       return res.status(404).json({ message: 'TofWillis not found.' });
       
     
     }
     console.log( tofWillis )
           return res.json( tofWillis );
     
   } catch (error) {
     console.log(error.message)
     
     next(error);
     
   }
 };

 
export const updateTofWillis = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const tofWillis = await TofWillis.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await tofWillis.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


export const deleteTofWillis = async (req, res, next) => {
  try {
    const matriculeId = req.params.id;  // Get the ID from the request parameters
    console.log(matriculeId);

    const tofWillis = await TofWillis.findOne({ matricule: matriculeId });  // Find the document by its matricule

    if (!tofWillis) {
      return res.status(200).json({ message: "TofWillis already deleted" }); 
    }

    await tofWillis.deleteOne();  // Delete the found document

    return res.status(200).json({ message: "TofWillis record deleted successfully" });  // Return success response
  } catch (error) {
    console.log(error.message);
    next(error);  // Pass the error to the error handler middleware
  }
};