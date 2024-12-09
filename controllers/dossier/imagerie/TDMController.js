

import TDM from "../../../models/DossierMedical/imagerie/TDM.js";

import { errorHandler } from '../../../utils/error.js';


export const createTDM = async (req, res, next) => {

    try {
        const  TDMData  = req.body;
        console.log(req.body)

        await TDM.create(req.body)





        return res.status(201).json();
    } catch (error) {
        next(error);
        // console.log(error.message)
    }
};

export const getTDMDetails = async (req, res, next) => {
    console.log("getTDM")
    try {
        const  matriculeId = req.params.id;

        const TDM = await TDM.findOne({ matricule : matriculeId})

        if (!TDM) {

            // return next(errorHandler(404, 'TDM not found'));
            return res.status(404).json({ message: 'TDM not found.' });


        }
        console.log( TDM )
        return res.json( TDM );

    } catch (error) {
        console.log(error.message)

        next(error);

    }
};


export const updateTDM = async (req, res, next) => {

    try {
        const  matriculeId = req.params.id;


        const TDM = await TDM.findOne({ matricule : matriculeId})


        const update = req.body;
        await TDM.updateOne(update);



        return res.status(201).json();
    } catch (error) {
        console.log(error.message);
        next(error);

    }
};


