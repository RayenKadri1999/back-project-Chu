import Patient from "../models/Patient.js";
import Hospitalisation from "../models/Hospitalisation.js";
import XLSX from "xlsx";
import { createObjectCsvStringifier } from "csv-writer";

// Middleware for exporting to Excel format
const exportToExcel = async (req, res, next) => {

  
    try {
      // Fetch all hospitalisations and populate the 'dossier' (patient) field
      const hospitalisations = await Hospitalisation.find().populate('dossier').exec();
  
      // Prepare the data to be exported to Excel
      const data = hospitalisations.map(hospitalisation => {
        const patient = hospitalisation.dossier;
        return {
          patientName: patient.nom,               // Patient's last name
          patientFirstName: patient.prenom,        // Patient's first name
          patientDOB: patient.dateNaissance,       // Patient's date of birth
          patientEmail: patient.email,             // Patient's email
          patientDossier: patient._id,             // Patient's dossier (ID)
          dateEntree: hospitalisation.dateEntree,  // Hospitalisation entry date
          dateSortie: hospitalisation.dateSortie,  // Hospitalisation exit date
          typeAVC: hospitalisation.TypeAVC,        // Type of AVC
          status: hospitalisation.status,          // Status of the hospitalisation
        };
      });
  
      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Patients_Hospitalisations");
  
      // Write the workbook to a buffer
      req.fileBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  
      // Set the file details for further use
      req.fileName = "patients_hospitalisations.xlsx";
      req.fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  
      // Proceed to the next middleware or function
      next();
  
    } catch (error) {
      console.error("Error exporting patients and hospitalisations to Excel:", error);
      res.status(500).json({ error: "An error occurred while exporting to Excel." });
    }
  };
  
  

// Middleware for exporting to CSV format
const exportToCsv = async (req, res, next) => {
  try {
    // Fetch all patients with their associated hospitalisations
    const patients = await Patient.find().populate({
      path: 'hospitalisations',
      model: Hospitalisation,
    });

    // Set up CSV writer
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: "PatientNom", title: "Patient Nom" },
        { id: "PatientPrenom", title: "Patient Prenom" },
        { id: "Sexe", title: "Sexe" },
        { id: "Adresse", title: "Adresse" },
        { id: "Téléphone", title: "Téléphone" },
        { id: "Email", title: "Email" },
        { id: "DateNaissance", title: "Date de Naissance" },
        { id: "AidantPrincipal", title: "Aidant Principal" },
        { id: "NuméroAidant", title: "Numéro Aidant" },
        { id: "HospitalisationEntreeFaitPar", title: "Entree Fait Par" },
        { id: "HospitalisationSortieFaitPar", title: "Sortie Fait Par" },
        { id: "DateEntree", title: "Date Entree" },
        { id: "DateSortie", title: "Date Sortie" },
        { id: "TypeAVC", title: "Type AVC" },
        { id: "Status", title: "Status" },
      ],
    });

    // Flatten the data for CSV output
    const records = [];
    patients.forEach(patient => {
      patient.hospitalisations.forEach(hospitalisation => {
        records.push({
          PatientNom: patient.Nom,
          PatientPrenom: patient.Prenom,
          Sexe: patient.sexe,
          Adresse: patient.Adresse,
          Téléphone: patient.telephone,
          Email: patient.email,
          DateNaissance: patient.dateNaissance,
          AidantPrincipal: patient.aidantPrincipal,
          NuméroAidant: patient.numeroAidantPrincipal,
          HospitalisationEntreeFaitPar: hospitalisation.entreeFaitPar,
          HospitalisationSortieFaitPar: hospitalisation.sortieFaitPar,
          DateEntree: hospitalisation.dateEntree,
          DateSortie: hospitalisation.dateSortie,
          TypeAVC: hospitalisation.TypeAVC,
          Status: hospitalisation.status,
        });
      });
    });

    // Generate CSV data
    req.fileBuffer = Buffer.from(
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records)
    );
    req.fileName = "patients_hospitalisations.csv";
    req.fileType = "text/csv";

    next();
  } catch (error) {
    console.error("Error exporting patients and hospitalisations to CSV:", error);
    res.status(500).json({ error: "An error occurred while exporting to CSV." });
  }
};

// Final handler to send the file to the client
const sendFile = (req, res) => {
  res.setHeader("Content-Disposition", `attachment; filename=${req.fileName}`);
  res.setHeader("Content-Type", req.fileType);
  res.send(req.fileBuffer);
};

export { exportToExcel, exportToCsv, sendFile };
