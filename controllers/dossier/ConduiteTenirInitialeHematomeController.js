
import ConduiteTenirInitialeHematome from "../../models/DossierMedical/ConduiteTenirInitialeHematome.js";
import { errorHandler } from '../../utils/error.js';


export const createConduiteTenirInitialeHematome = async (req, res, next) => {
    try {

        console.log(req.body)
        await ConduiteTenirInitialeHematome.create(req.body)

        return res.status(201).json()
        console.log("succes")
    } catch (error) {
        console.log(error.message)
        next(error);

    }
};

export const getConduiteTenirInitialeHematomeDetails = async (req, res, next) => {
    try {
        const  matriculeId = req.params.id;

        const conduiteTenirInitiale = await ConduiteTenirInitialeHematome.findOne({ matricule : matriculeId})

        if (!conduiteTenirInitiale) {

            // return next(errorHandler(404, 'ConduiteTenirInitialeHematome not found'));
            return res.status(404).json({ message: 'ConduiteTenirInitialeHematome not found.' });

        }
        console.log( conduiteTenirInitiale )
        return res.json( conduiteTenirInitiale );

    } catch (error) {


        next(error);

    }
};


export const updateConduiteTenirInitialeHematome = async (req, res, next) => {
    console.log(" matriculeId")
    console.log(req.body)
    try {
        const  matriculeId = req.params.id;
        console.log( matriculeId)

        const conduiteTenirInitiale = await ConduiteTenirInitialeHematome.findOne({ matricule : matriculeId})


        const update = req.body;
        await ConduiteTenirInitialeHematome.updateOne(update);

        console.log("success")

        return res.status(201).json();
    } catch (error) {
        console.log(error.message);
        next(error);

    }
};


