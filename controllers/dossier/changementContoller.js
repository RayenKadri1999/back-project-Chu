import ChangementRequest from "../../models/ChangementRequest.js";
import Hospitalisation from "../../models/Hospitalisation.js";
import Patient from "../../models/Patient.js";
import Biologie from "../../models/DossierMedical/Biologie.js";
import { errorHandler } from '../../utils/error.js';
   

export const NewRequest = async (req, res, next) => {
    
    try {
    //  const  BiologieData  = req.body;
    //  const  ChangementRequestData  = req.body;
     console.log(req.body)
     
     
     const patientId = req.body.patient;
     const userId = req.body.userId;
     
     const changementRequest = await ChangementRequest.findOne({patient :patientId,userId:userId})
       
     if (!changementRequest) {
  
        const create = {
            patient : req.body.patient,
            userId : req.body.userId,
            hospitalisationId: req.body.hospitalisationId,
            status: req.body.status,
            createdAt: req.body.createdAt,
            changesTypes:new Array(req.body.changeType),
            changes: req.body.changes,
            // Add other fields you want to update here
          };
        await ChangementRequest.create(create)
      
        return res.status(201).json();
     
     }
    //  const newchangetype =
     const update = {
        status: req.body.status,
        updatedAt: req.body.createdAt,
         
         
        // Add other fields you want to update here
      };
     
     await changementRequest.updateOne({ $set: update } , { $push: { changesTypes: req.body.changeType }} );
     return res.status(201).json();
    }catch (error) {
        
        console.log(error.message)
        next(error);
        
      }
 };



 export const ApprouveRequest = async (req, res, next) => {
   try {
     const reqId = req.params.id;
    
     const changementRequest = await ChangementRequest.findById(reqId)
       
     if (!changementRequest) {
  
       // return next(errorHandler(404, 'biologie not found'));
       return res.status(404).json({ message: 'Changement Request not found.' });
     
     }
    
     
      const patientId=changementRequest.patient;   
       const approuve = {
        status: "approuved",
        updatedAt: new Date(),
      };
     
       await ChangementRequest.updateOne({ $set: approuve } );
     
     changementRequest.changesTypes.map(async (item) => {
        // Find the document corresponding to this item
        const change = await mongoose.model(item).findOne({ patient: patientId });
        const update = changementRequest[`New${item}`];
        await mongoose.model(item).updateOne(update);


          
        return res.status(201).json();
      
     
   });
}catch(error) {
     
  
     next(error);
     
   }
 };





 
 export const RejectRequest = async (req, res, next) => {
    console.log("error.message")
    try {
      const reqId = req.params.id;
     
      const changementRequest = await ChangementRequest.findById(reqId)
        
      if (!changementRequest) {
        console.log("error.message")
        // return next(errorHandler(404, 'biologie not found'));
        return res.status(404).json({ message: 'Changement Request not found.' });
      
      }
     
      
       const patientId=changementRequest.patient;   
        const reject = {
         status: "rejected",
         updatedAt: new Date(),
       };
      
        await ChangementRequest.updateOne({ $set: reject } );
      
   
 
 
           
         return res.status(201).json();
       
      
    }catch(error) {
       
   
      next(error);
      
    }
  };



 export const getAllRequestsHistory = async (req, res, next) => {
    
     try {
    const hospitalisations = await Hospitalisation.find({ reviewStatus: "En cours" });

    const dossierIds = hospitalisations.map(h => h.dossier); // assuming 'patient' field stores patient ID
    const uniqueDossierIds = [...new Set(dossierIds)];

    // Step 3: Fetch all patients corresponding to these IDs
    const dossiers = await Patient.find({ _id: { $in: uniqueDossierIds } });

    res.status(200).json(dossiers);
  } catch (error) {
    next(error);
  }
  };
 
// export const updateBiologie = async (req, res, next) => {
//  console.log("patientId")
//  try {
//    const patientId = req.params.id;
//    console.log(patientId)
     
//    const biologie = await Biologie.findOne({patient :patientId})
    

//      const update = req.body;
//      await biologie.updateOne(update);
     
   

//    return res.status(201).json();
//  } catch (error) {
//    console.log(error.message);
//    next(error);
   
//  }
// };


