
import EtiologieHematome from "../../../models/DossierMedical/etiologie/Etiologie_hematome.js";
import { errorHandler } from '../../../utils/error.js';


export const createEtiologieHematome = async (req, res, next) => {
    try {

        console.log(req.body)

        await EtiologieHematome.create(req.body)

        return res.status(201).json();
    } catch (error) {
        console.log(error);
        next(error);
        // console.log(error.message)
    }
};

export const getEtiologieHematomeDetails = async (req, res, next) => {
    try {
        const  matriculeId = req.params.id;

        const evolutionClassification = await EtiologieHematome.findOne({ matricule : matriculeId})

        if (!evolutionClassification) {

            // return next(errorHandler(404, 'EtiologieHematome not found'));
            return res.status(404).json({ message: 'EtiologieHematome not found.' });

        }
        console.log( evolutionClassification )
        return res.json( evolutionClassification );

    } catch (error) {


        next(error);

    }
};


export const updateEtiologieHematome = async (req, res, next) => {
    console.log(" matriculeId")
    try {
        const  matriculeId = req.params.id;
        console.log( matriculeId)

        const evolutionClassification = await EtiologieHematome.findOne({ matricule : matriculeId})


        const update = req.body;
        await evolutionClassification.updateOne(update);



        return res.status(201).json();
    } catch (error) {
        console.log(error.message);
        next(error);

    }
};


