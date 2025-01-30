import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import patientRouter from './routes/patientRoutes.js';
import hospitalisationRouter from './routes/hospitalisationRoutes.js';

import dossierRouter from './routes/dossier/dossierRoutes.js';
import prehospitaliereRouter from './routes/dossier/prehospitaliereRoutes.js';
import hospitaliereRouter from './routes/dossier/hospitaliereRoutes.js';
import imagerieRouter from './routes/dossier/imagerieRoutes.js';
import flairRouter from './routes/dossier/imagerie/flairRoutes.js';
import TofWillisRouter from './routes/dossier/imagerie/TofWillisRoutes.js';
import T2SwanRouter from './routes/dossier/imagerie/T2SwanRoutes.js';
import FatSatRouter from './routes/dossier/imagerie/FatSatRoutes.js';
import TSARouter from './routes/dossier/imagerie/TSARoutes.js';
import SequencePerfusionRouter from './routes/dossier/imagerie/SequencePerfusionRoutes.js';
import ScannerRouter from './routes/dossier/imagerie/ScannerRoutes.js';
import TDMRouter from './routes/dossier/imagerie/TDMRoutes.js';

import ScannerPerfusionRouter from './routes/dossier/imagerie/ScannerPerfusionRoutes.js';
import IRMCérébraleRouter from './routes/dossier/imagerie/IRMCérébraleRoutes.js';
import xss from 'xss';
import TOASTRouter from './routes/dossier/etiologie/toastRoutes.js';
import ASCODRouter from './routes/dossier/etiologie/ascodRoutes.js';
import ASPECTSRouter from './routes/dossier/imagerie/ASPECTSRoutes.js';
import nihssRouter from './routes/dossier/nihssRoutes.js';
import biologieRouter from './routes/dossier/biologieRoutes.js';
import conclusionsortieRouter from './routes/dossier/conclusionsortieRoutes.js';
import conclusionSortieHematomeRouter from './routes/dossier/conclusionSortieHematomeRoutes.js';

import conclusioninitialeRouter from './routes/dossier/conclusioninitialeRoutes.js';
import conduitetenirinitialeRouter from './routes/dossier/conduitetenirinitialeRoutes.js';
import examencliniqueRouter from './routes/dossier/examencliniqueRoutes.js';
import examenscomplementairesRouter from './routes/dossier/examenscomplementairesRoutes.js';
import evolutionClassificationRouter from './routes/dossier/evolutionClassificationRoutes.js';
import requestRouter from './routes/requestRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import helmet  from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import generateRouter  from './routes/generateRoutes.js'
import conclusionSortieHematome from "./models/DossierMedical/ConclusionSortieHematome.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });
const rateLimitGlobal = Number(process.env.RATE_LIMIT_GLOBAL) || 1000;

const app = express();
// Use CORS middleware
const corsOptions = {
  origin: true,
  credentials: true,
};
const sanitizeRequest = (req, res, next) => {
  // Sanitize the body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = xss(req.body[key]);
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      req.query[key] = xss(req.query[key]);
    });
  }

  // Sanitize headers (optional)
  if (req.headers) {
    Object.keys(req.headers).forEach((key) => {
      req.headers[key] = xss(req.headers[key]);
    });
  }

  next();
};

const limiter  = rateLimit({
  max : rateLimitGlobal,
  windowMs : 3600*1000,
  message :"We received to many requests..."
})
app.use(sanitizeRequest);
app.use(helmet())
app.use('/api',limiter)
app.use(mongoSanitize());
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/patient', patientRouter);
app.use('/api/request', requestRouter);
app.use('/api/dossier', dossierRouter);
app.use('/api/hospitalisation', hospitalisationRouter);
app.use('/api/prehospitaliere', prehospitaliereRouter);
app.use('/api/hospitaliere', hospitaliereRouter);

app.use('/api/imagerie', imagerieRouter);
app.use('/api/imagerie/flair', flairRouter);
app.use('/api/imagerie/aspects', ASPECTSRouter);
app.use('/api/imagerie/tofwillis', TofWillisRouter);
app.use('/api/imagerie/t2swan', T2SwanRouter);
app.use('/api/imagerie/fatsat', FatSatRouter);
app.use('/api/imagerie/tsa', TSARouter);
app.use('/api/imagerie/scanner', ScannerRouter);
app.use('/api/imagerie/TDM', TDMRouter);

app.use('/api/imagerie/sequenceperfusion',SequencePerfusionRouter);
app.use('/api/imagerie/scannerperfusion',ScannerPerfusionRouter);
app.use('/api/imagerie/irm',IRMCérébraleRouter);


app.use('/api/etiologie/toast',TOASTRouter);
app.use('/api/etiologie/ascod',ASCODRouter);


app.use('/api/files',generateRouter)
app.use('/api/biologie', biologieRouter);
app.use('/api/nihss', nihssRouter);
app.use('/api/conclusionsortie', conclusionsortieRouter);
app.use('/api/conclusionsortiehematome', conclusionSortieHematomeRouter);

app.use('/api/conclusioninitiale', conclusioninitialeRouter);
app.use('/api/conduitetenirinitiale', conduitetenirinitialeRouter);
app.use('/api/examenclinique', examencliniqueRouter);
app.use('/api/examenscomplementaires', examenscomplementairesRouter);
app.use('/api/evolutionClassification', evolutionClassificationRouter);
app.use((err, req, res, next) => {
  // Error middleware
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
