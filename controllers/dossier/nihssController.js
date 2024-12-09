import Nihss from "../../models/DossierMedical/Nihss.js";
import { errorHandler } from '../../utils/error.js';
   

export const createNihss = async (req, res, next) => {
   try {
     const  nihssData  = req.body;

    
     const newNihss = await Nihss.create(req.body)
     
 
     
     
 
     return res.status(201).json({ nihssId: newNihss.id });
   } catch (error) {
     next(error);
     console.log(error.message)
   }
 };

 export const getNihssDetails = async (req, res, next) => {
   try {
     const NihssId = req.params.id;
     
     const nihss = await Nihss.findById(NihssId)
      
       
     if (!nihss) {
  
       
       return res.status(404).json({ message: 'Nihss not found.' });
     
     }
     console.log( nihss )
           return res.json( nihss );
     
   } catch (error) {
     
     
     next(error);
     
   }
 };


 
 export const getAllNihss = async (req, res, next) => {
try{
    const  matriculeId = req.params.id;
    const limit = parseInt(req.query.limit) || 9;//The number of  matricules to retrieve (default is 9).
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const nihsss = await Nihss.find({ matricule : matriculeId})
      .sort({ [sort]: order })
      
      .skip(startIndex);

    return res.status(200).json(nihsss);
  } catch (error) {
    next(error);
  }

    
  };
 
export const deleteNihss = async (req, res, next) => {
    try {
        const nihssId = req.params.id;
      // Retrieve the nihss by ID
      const nihss = await Nihss.findById(nihssId);
  
      // Check if the nihss with the given ID exists
      if (!nihss) {
        return next(errorHandler(404, 'nihss not found'));
      }
  
      // Delete the  matricule from the database
      await Nihss.findByIdAndDelete(nihss);
  
      res.status(200).json('nihss has been deleted!');
    } catch (error) {
        console.log(error.message)
      next(error);
    }
  };
export const updateNihss = async (req, res, next) => {
 console.log(" matriculeId")
 try {
   const NihssId = req.params.id;
   console.log(NihssId)
     
   const nihss = await Nihss.findById(NihssId)
    

     const update = req.body;
     await nihss.updateOne(update);
     
   

   return res.status(201).json();
 } catch (error) {
   console.log(error.message);
   next(error);
   
 }
};


