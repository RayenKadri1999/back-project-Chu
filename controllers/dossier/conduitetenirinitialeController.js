
import ConduiteTenirInitiale from "../../models/DossierMedical/ConduiteTenirInitiale.js";
import { errorHandler } from '../../utils/error.js';
   

export const createConduiteTenirInitiale = async (req, res, next) => {
   try {
    
console.log(req.body)
       await ConduiteTenirInitiale.create(req.body)
      
     return res.status(201).json()
       console.log("succes")
   } catch (error) {
    console.log(error.message)
     next(error);
    
   }
 };

 export const getConduiteTenirInitialeDetails = async (req, res, next) => {
   try {
     const  matriculeId = req.params.id;
     
     const conduiteTenirInitiale = await ConduiteTenirInitiale.findOne({ matricule : matriculeId})
       
     if (!conduiteTenirInitiale) {
  
       // return next(errorHandler(404, 'ConduiteTenirInitiale not found'));
       return res.status(404).json({ message: 'ConduiteTenirInitiale not found.' });
     
     }
     console.log( conduiteTenirInitiale )
           return res.json( conduiteTenirInitiale );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };

 
export const updateConduiteTenirInitiale = async (req, res, next) => {
 console.log(" matriculeId")
    console.log(req.body)
 try {
   const  matriculeId = req.params.id;
   console.log( matriculeId)
     
   const conduiteTenirInitiale = await ConduiteTenirInitiale.findOne({ matricule : matriculeId})
    

     const update = req.body;
     await conduiteTenirInitiale.updateOne(update);
     
   console.log("success")

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


