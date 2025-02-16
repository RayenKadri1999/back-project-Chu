import ExcelJS from "exceljs";
import Patient from "../models/Patient.js";
import Hospitalisation from "../models/Hospitalisation.js";
import Prehospitaliere from "../models/DossierMedical/Prehospitaliere.js";
import Hospitaliere from "../models/DossierMedical/Hospitaliere.js";
import Biologie from "../models/DossierMedical/Biologie.js";
import ConclusionInitiale from "../models/DossierMedical/ConclusionInitiale.js";
import ExamenClinique from "../models/DossierMedical/ExamenClinique.js";
import ExamensComplementaires from "../models/DossierMedical/ExamenComplementaire.js";
import ConduiteTenirInitiale from "../models/DossierMedical/ConduiteTenirInitiale.js";
import EvolutionClassification from "../models/DossierMedical/EvolutionClassification.js";
import NIHSS from "../models/DossierMedical/Nihss.js";
import ConclusionSortie from "../models/DossierMedical/ConclusionSortie.js";
import ASCOD from "../models/DossierMedical/etiologie/ASCOD.js";
import TOAST from "../models/DossierMedical/etiologie/TOAST.js";
import Scanner from "../models/DossierMedical/imagerie/Scanner.js";
import ScannerPerfusion from "../models/DossierMedical/imagerie/ScannerPerfusion.js";

export const generatePatientsExcel = async () => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Hospitalisations");

        // Define static columns for patient, hospitalisation, prehospitalière and hospitalière data
        worksheet.columns = [
            // Patient Columns
            { header: "Patient ID", key: "patient_id", width: 20 },
            { header: "Patient Nom", key: "patient_nom", width: 20 },
            { header: "Patient Prenom", key: "patient_prenom", width: 20 },
            { header: "Sexe", key: "sexe", width: 10 },
            { header: "Numero Dossier", key: "numero_dossier", width: 20 },
            { header: "Adresse", key: "Adresse", width: 30 },
            { header: "Telephone", key: "telephone", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Date Naissance", key: "dateNaissance", width: 20 },
            { header: "Aidant Principal", key: "aidantPrincipal", width: 20 },
            { header: "Numero Aidant Principal", key: "numeroAidantPrincipal", width: 20 },
            { header: "Signature Docteur", key: "signatureDocteur", width: 20 },
            // Hospitalisation Columns
            { header: "Hospitalisation ID", key: "hospitalisation_id", width: 20 },
            { header: "Date Entree", key: "dateEntree", width: 20 },
            { header: "Date Sortie", key: "dateSortie", width: 20 },
            { header: "Type AVC", key: "TypeAVC", width: 20 },
            { header: "Status", key: "status", width: 20 },
            { header: "Entree Fait Par", key: "entreeFaitPar", width: 20 },
            { header: "Sortie Fait Par", key: "sortieFaitPar", width: 20 },
            // Prehospitalière Columns
            { header: " quiAppelNeurologue", key: "prehosp_quiAppelNeurologue", width: 20 },
            { header: " dateDebutSymptome", key: "prehosp_dateDebutSymptome", width: 20 },
            { header: " dateAppelNeurologue", key: "prehosp_dateAppelNeurologue", width: 20 },
            { header: " motifAppel", key: "prehosp_motifAppel", width: 20 },
            { header: "Prehospital - autre1", key: "prehosp_autre1", width: 20 },
            { header: "Prehospital - autre2", key: "prehosp_autre2", width: 20 },
            // Hospitalière Columns
            { header: " Allergies", key: "hospitaliere_Allergies", width: 20 },
            { header:  "HTA", key: "hospitaliere_HTA", width: 20 },
            { header:  "Hypercholestérolémie", key: "hospitaliere_Hypercholestérolémie", width: 20 },
            { header:  "Diabète", key: "hospitaliere_Diabète", width: 20 },
            { header:  "Fibrillation_auriculaire", key: "hospitaliere_Fibrillation_auriculaire", width: 20 },
            { header:  "Ancienneté_fibrillation", key: "hospitaliere_Ancienneté_fibrillation", width: 20 },
            { header:  "SAS", key: "hospitaliere_SAS", width: 20 },
            { header:  "SAS_appareillé", key: "hospitaliere_SAS_appareillé", width: 20 },
            { header:  "AIT", key: "hospitaliere_AIT", width: 20 },
            { header:  "AVC", key: "hospitaliere_AVC", width: 20 },
            { header:  "Cardiopathie_ischémique", key: "hospitaliere_Cardiopathie_ischémique", width: 20 },
            { header:  "Artériopathie", key: "hospitaliere_Artériopathie", width: 20 },
            { header:  "Autres_antécédents", key: "hospitaliere_Autres_antécédents", width: 20 },
            { header:  "Vit", key: "hospitaliere_Vit", width: 20 },
            { header:  "Latéralité", key: "hospitaliere_Latéralité", width: 20 },
            { header:  "Profession", key: "hospitaliere_Profession", width: 20 },
            { header:  "Autonomie", key: "hospitaliere_Autonomie", width: 20 },
            { header:  "Tabagisme", key: "hospitaliere_Tabagisme", width: 20 },
            { header:  "Chicha", key: "hospitaliere_Chicha", width: 20 },
            { header:  "Neffa", key: "hospitaliere_Neffa", width: 20 },
            { header:  "Consommation_alcool", key: "hospitaliere_Consommation_alcool", width: 20 },
            { header:  "Rankin_préAVC", key: "hospitaliere_Rankin_préAVC", width: 20 },
            { header:  "GIR", key: "hospitaliere_GIR", width: 20 },
            { header:  "Poids", key: "hospitaliere_Poids", width: 20 },
            { header:  "Taille", key: "hospitaliere_Taille", width: 20 },
            { header:  "IMC", key: "hospitaliere_IMC", width: 20 },
            { header:  "HistoireMaladie", key: "hospitaliere_HistoireMaladie", width: 20 },
            { header: " TraitementEntrée", key: "hospitaliere_TraitementEntrée", width: 20 },
                { header: " Sodium", key: "biologie_Sodium", width: 15 },
                { header: " Potassium", key: "biologie_Potassium", width: 15 },
                { header: " Urée", key: "biologie_Urée", width: 15 },
                { header: " Créatinine", key: "biologie_Créatinine", width: 15 },
                { header: " CRP", key: "biologie_CRP", width: 15 },
                { header: " CPK", key: "biologie_CPK", width: 15 },
                { header: " HbA1C", key: "biologie_HbA1C", width: 15 },
                { header: " Myoglobine", key: "biologie_Myoglobine", width: 15 },
                { header: " Troponine", key: "biologie_Troponine", width: 15 },
                { header: " NT_pro_BNP", key: "biologie_NT_pro_BNP", width: 15 },
                { header: " VSH1", key: "biologie_VSH1", width: 15 },
                { header: " Hémoglobine", key: "biologie_Hémoglobine", width: 15 },
                { header: " Leucocytes", key: "biologie_Leucocytes", width: 15 },
                { header: " Plaquettes", key: "biologie_Plaquettes", width: 15 },
                { header: " D_dimères", key: "biologie_D_dimères", width: 15 },
                { header: " Monomères_de_fbrine", key: "biologie_Monomères_de_fbrine", width: 15 },
                { header: " Fibrinogène", key: "biologie_Fibrinogène", width: 15 },
                { header: " TP", key: "biologie_TP", width: 15 },
                { header: " Ratio_TCA", key: "biologie_Ratio_TCA", width: 15 },
                { header: " ASAT_GOT", key: "biologie_ASAT_GOT", width: 15 },
                { header: " ALAT_GPT", key: "biologie_ALAT_GPT", width: 15 },
                { header: " GGT", key: "biologie_GGT", width: 15 },
                { header: " PAL", key: "biologie_PAL", width: 15 },
                { header: " Hdl_Ch", key: "biologie_Hdl_Ch", width: 15 },
                { header: " Ldl_Ch", key: "biologie_Ldl_Ch", width: 15 },
                { header: " TG", key: "biologie_TG", width: 15 },
                { header: " CT_Total", key: "biologie_CT_Total", width: 15 },
                { header: " Bilirubine_totale", key: "biologie_Bilirubine_totale", width: 15 },
                { header: " Bilirubine_libre", key: "biologie_Bilirubine_libre", width: 15 },
            { header: " ECG", key: "conclusion_ECG", width: 15 },
            { header: " TP", key: "conclusion_TP", width: 15 },
            { header: " Ratio_TCA", key: "conclusion_Ratio_TCA", width: 15 },
            { header: " INR", key: "conclusion_INR", width: 15 },
            { header: " Plaquettes", key: "conclusion_Plaquettes", width: 15 },
            { header: " Hémoglobine", key: "conclusion_Hémoglobine", width: 15 },
            { header: " Dosage", key: "conclusion_Dosage", width: 15 },
            { header: " ConclusionIntiale_Conclusion", key: "conclusion_Conclusion", width: 20 },
            { header: "ExamenClinique - NIHSSValue", key: "examen_NIHSSValue", width: 15 },
            { header: "ExamenClinique - LASTInitial", key: "examen_LASTInitial", width: 15 },
            { header: " ResultExamenNeuroInitial", key: "examen_ResultExamenNeuroInitial", width: 20 },
            { header: " TA", key: "examen_TA", width: 15 },
            { header: " Dextro", key: "examen_Dextro", width: 15 },
            { header: " AuscultationCardiaque", key: "examen_AuscultationCardiaque", width: 20 },
            { header: " AuscultationPulmonaire", key: "examen_AuscultationPulmonaire", width: 20 },
            { header: " SouffleCarotidien", key: "examen_SouffleCarotidien", width: 15 },
            { header: " ResultsExamenGeneral", key: "examen_ResultsExamenGeneral", width: 20 },
            { header: " testDeglutition - testDone", key: "examen_testDeglutition_testDone", width: 15 },
            { header: " testDeglutition - hasTrouble", key: "examen_testDeglutition_hasTrouble", width: 15 },
            { header: " testDeglutition - typeOfTrouble", key: "examen_testDeglutition_typeOfTrouble", width: 20 },
            { header: "ETT", key: "examens_ETT", width: 10 },
            { header: "DescETT", key: "examens_DescETT", width: 20 },
            { header: "ETO", key: "examens_ETO", width: 10 },
            { header: "DescETO", key: "examens_DescETO", width: 20 },
            { header: "TélémétrieCardiaque", key: "examens_TélémétrieCardiaque", width: 10 },
            { header: "DescTélémétrieCardiaque", key: "examens_DescTélémétrieCardiaque", width: 20 },
            { header: "Arteriographie", key: "examens_Arteriographie", width: 10 },
            { header: "DescArteriographie", key: "examens_DescArteriographie", width: 20 },
            { header: "HolterRythmique", key: "examens_HolterRythmique", width: 10 },
            { header: "DescHolterRythmique", key: "examens_DescHolterRythmique", width: 20 },
            { header: "EDTSA", key: "examens_EDTSA", width: 10 },
            { header: "DescEDTSA", key: "examens_DescEDTSA", width: 20 },
            { header: "EDTC", key: "examens_EDTC", width: 10 },
            { header: "DescEDTC", key: "examens_DescEDTC", width: 20 },
            { header: "AutreExamens", key: "examens_AutreExamens", width: 10 },
            { header: "DescAutreExamens", key: "examens_DescAutreExamens", width: 20 },
            { header: "Thrombolyse Intraveineuse", key: "conduite_thrombolyseIntraveineuse", width: 25 },
            { header: "Door To Needle", key: "conduite_doorToNeedle", width: 20 },
            { header: "Door To Needle Details", key: "conduite_doorToNeedleDetails", width: 30 },
            { header: "Actilyse", key: "conduite_actilyse", width: 15 },
            { header: "Tenecteplase", key: "conduite_tenecteplase", width: 15 },
            { header: "Delay Exceeded", key: "conduite_delayExceeded", width: 15 },
            { header: "Recent Hypodensity", key: "conduite_recentHypodensity", width: 20 },
            { header: "Other Causes", key: "conduite_otherCauses", width: 30 },
            { header: "Anticoagulation Therapy", key: "conduite_anticoagulationTherapy", width: 25 },
            { header: "Motor Rehabilitation", key: "conduite_motorRehabilitation", width: 20 },
            { header: "Rehabilitation Time", key: "conduite_rehabilitationTime", width: 20 },
            { header: "Plaquettes (Conduite)", key: "conduite_plaquettes", width: 15 },
            { header: "INR (Conduite)", key: "conduite_INR", width: 15 },
            { header: "Anticoagulation Curative", key: "conduite_AnticoagulationCurative", width: 25 },
            { header: "AIT Sans Occlusion", key: "conduite_AITSansOcclusion", width: 20 },
            { header: "Deficit Mineur Sans Occlusion", key: "conduite_DeficitMineurSansOcclusion", width: 30 },
            { header: "Chirurgie Recente", key: "conduite_ChirurgieRecente", width: 20 },
            { header: "Hemorragie Recente", key: "conduite_HemorragieRecente", width: 20 },
            { header: "Anticoagulation Curative II", key: "conduite_AnticoagulationCurativeII", width: 30 },
            { header: "Thrombectomie Mecanique", key: "conduite_ThrombectomieMecanique", width: 25 },
            { header: "Thrombectomie Mecanique Heure", key: "conduite_ThrombectomieMecaniqueHeure", width: 30 },
            { header: "Stent Retriever", key: "conduite_StentRetriever", width: 20 },
            { header: "Thrombo Aspiration", key: "conduite_ThromboAspiration", width: 20 },
            { header: "TICI", key: "conduite_TICI", width: 10 },
            { header: "HNF", key: "conduite_HNF", width: 10 },
            { header: "HBPM", key: "conduite_HBPM", width: 10 },
            { header: "AOD", key: "conduite_AOD", width: 10 },
            { header: "Delai Intro", key: "conduite_DelaiIntro", width: 20 },
            { header: "Simple Anti Agregation Plaquetaire", key: "conduite_SimpleAntiAgregationPlaquetaire", width: 35 },
            { header: "Simple Anti Agregation Plaquetaire Type", key: "conduite_SimpleAntiAgregationPlaquetaireType", width: 35 },
            { header: "Double Anti Agregation Plaquetaire", key: "conduite_DoubleAntiAgregationPlaquetaire", width: 35 },
            { header: "Double Anti Agregation Plaquetaire Dose", key: "conduite_DoubleAntiAgregationPlaquetaireDose", width: 35 },
            { header: "Double Anti Agregation Plaquetaire Dose Heure", key: "conduite_DoubleAntiAgregationPlaquetaireDoseHeure", width: 35 },
            { header: "Double Anti Agregation Plaquetaire Type", key: "conduite_DoubleAntiAgregationPlaquetaireType", width: 35 },
            { header: "Anticoagulation Curative II Heure", key: "conduite_AnticoagulationCurativeIIHeure", width: 35 },
            { header: "Traitement Antihypertenseur", key: "conduite_TraitementAntihypertenseur", width: 25 },
            { header: "Traitement Par Voie Intraveineuse", key: "conduite_TraitementParVoieIntraveineuse", width: 30 },
            { header: "Traitement Par Voie Intraveineuse Heure", key: "conduite_TraitementParVoieIntraveineuseHeure", width: 35 },
            { header: "Nicardipine", key: "conduite_Nicardipine", width: 15 },
            { header: "Traitement Par Voie Intraveineuse Autres Molecules", key: "conduite_TraitementParVoieIntraveineuseAutresMolecules", width: 40 },
            { header: "Traitement Par Voie Orale", key: "conduite_TraitementParVoieOrale", width: 25 },
            { header: "Traitement Par Voie Orale Heure", key: "conduite_TraitementParVoieOraleHeure", width: 30 },
            { header: "Insulinotherapie En SC", key: "conduite_InsulinotherapieEnSC", width: 20 },
            { header: "Traitement Par Voie Orale Type", key: "conduite_TraitementParVoieOraleType", width: 30 },
            { header: "Insulinotherapie En SC Heure", key: "conduite_InsulinotherapieEnSCHeure", width: 30 },
            { header: "Hypolipemiants", key: "conduite_Hypolipemiants", width: 15 },
            { header: "Atorvastatine", key: "conduite_Atorvastatine", width: 15 },
            { header: "Atorvastatine Dose", key: "conduite_AtorvastatineDose", width: 20 },
            { header: "Ezetimib", key: "conduite_Ezetimib", width: 15 },
            { header: "PCSK9", key: "conduite_PCSK9", width: 15 },
            { header: "Matelas Anti Escarre", key: "conduite_MatelasAntiEscarre", width: 20 },
            { header: "Matelas Anti Escarre Heure", key: "conduite_MatelasAntiEscarreHeure", width: 30 },
            { header: "Reeducation Orthophonique", key: "conduite_ReeducationOrthophonique", width: 25 },
            { header: "Reeducation Orthophonique Heure", key: "conduite_ReeducationOrthophoniqueHeure", width: 30 },
            { header: "Verticalisation", key: "conduite_Verticalisation", width: 15 },
            { header: "Verticalisation Heure", key: "conduite_VerticalisationHeure", width: 20 },
            { header: "Sonde Nasogastrique", key: "conduite_SondeNasogastrique", width: 20 },
            { header: "Sonde Nasogastrique Heure", key: "conduite_SondeNasogastriqueHeure", width: 30 },
            { header: "Reeducation Motrice", key: "conduite_ReeducationMotrice", width: 20 },
            { header: "Reeducation Motrice Heure", key: "conduite_ReeducationMotriceHeure", width: 30 },
            {header:"PlanClinique", key: "evolution_PlanClinique", width: 15},
            {header:"PlanEtiologique", key: "evolution_PlanEtiologique", width: 15},
            {header:"PlanThérapeutique", key: "evolution_PlanThérapeutique", width: 15},
            {header:"DescPlanClinique", key: "evolution_DescPlanClinique", width: 25},
            {header:"DescPlanEtiologique", key: "evolution_DescPlanEtiologique", width: 25},
            {header:"DescPlanThérapeutique", key: "evolution_DescPlanThérapeutique", width: 25},
            {header:"PneumopathieInhalation", key: "evolution_PneumopathieInhalation", width: 20},
            {header:"InfectionUrinaire", key: "evolution_InfectionUrinaire", width: 20},
            {header:"EmboliePulmonaire", key: "evolution_EmboliePulmonaire", width: 20},
            {header:"ThromboseVeineuseProfonde", key: "evolution_ThromboseVeineuseProfonde", width: 25},
            {header:"HemorragieExtracranienne", key: "evolution_HemorragieExtracranienne", width: 25},
            {header:"Escarre", key: "evolution_Escarre", width: 15},
            // NIHSS Columns
            { header: "NIHSS - Categorie", key: "nihss_categorie", width: 20 },
            { header: "NIHSS - Date", key: "nihss_date", width: 20 },
            { header: "NIHSS - TotalAuto", key: "nihss_totalAuto", width: 15 },
            { header: "NIHSS - Vigilance", key: "nihss_vigilance", width: 15 },
            { header: "NIHSS - Orientation", key: "nihss_orientation", width: 15 },
            { header: "NIHSS - Commandes", key: "nihss_commandes", width: 15 },
            { header: "NIHSS - Oculomotricite", key: "nihss_oculomotricite", width: 15 },
            { header: "NIHSS - ChampVisuel", key: "nihss_champVisuel", width: 15 },
            { header: "NIHSS - ParalysieFaciale", key: "nihss_paralysieFaciale", width: 15 },
            { header: "NIHSS - MotriciteMembreSupG", key: "nihss_motriciteMembreSupG", width: 20 },
            { header: "NIHSS - MotriciteMembreSupD", key: "nihss_motriciteMembreSupD", width: 20 },
            { header: "NIHSS - MotriciteMembreIntG", key: "nihss_motriciteMembreIntG", width: 20 },
            { header: "NIHSS - MotriciteMembreIntD", key: "nihss_motriciteMembreIntD", width: 20 },
            { header: "NIHSS - Ataxie", key: "nihss_ataxie", width: 15 },
            { header: "NIHSS - Sensibilite", key: "nihss_sensibilite", width: 15 },
            { header: "NIHSS - Langage", key: "nihss_langage", width: 15 },
            { header: "NIHSS - Dysarthrie", key: "nihss_dysarthrie", width: 15 },
            { header: "NIHSS - ExtinctionNegligence", key: "nihss_extinctionNegligence", width: 25 },

            { header: "ConclusionSortie - NIHSSValue", key: "conclusionsortie_NIHSSValue", width: 15 },
            { header: "ConclusionSortie - mRsSortie", key: "conclusionsortie_mRsSortie", width: 15 },
            { header: "ConclusionSortie - LastSortie", key: "conclusionsortie_LastSortie", width: 15 },
            { header: "ModeSortie", key: "conclusionsortie_ModeSortie", width: 20 },
            { header: " TraitementSortie", key: "conclusionsortie_TraitementSortie", width: 30 },
            { header: "RecommandationsSortie", key: "conclusionsortie_RecommandationsSortie", width: 35 },
            { header: "ConclusionSortie - Conclusion", key: "conclusionsortie_Conclusion", width: 30 },

            { header: " Etiologie-ASCOD - A", key: "ascod_A", width: 10 },
            { header: " Etiologie-ASCOD - S", key: "ascod_S", width: 10 },
            { header: " Etiologie-ASCOD - C", key: "ascod_C", width: 10 },
            { header: " Etiologie-ASCOD - O", key: "ascod_O", width: 10 },
            { header: " Etiologie-ASCOD - D", key: "ascod_D", width: 10 },
            { header: " Etiologie-ASCOD - Info", key: "ascod_info", width: 30 },

            // TOAST Columns
            { header: " Etiologie-TOAST - Atherothrombotique", key: "toast_atherothrombotique", width: 15 },
            { header: " Etiologie-TOAST - Atherothrombotique Content", key: "toast_atherothrombotiqueContent", width: 30 },
            { header: " Etiologie-TOAST - Info", key: "toast_info", width: 30 },
            { header: " Etiologie-TOAST - Cardioembolique", key: "toast_cardioembolique", width: 15 },
            { header: " Etiologie-TOAST - Cardioembolique Content", key: "toast_cardioemboliqueContent", width: 30 },
            { header: " Etiologie-TOAST - Fibrillation Valvulaire", key: "toast_fibrillation_valvulaire", width: 25 },
            { header: " Etiologie-TOAST - Fibrillation Type", key: "toast_fibrillation_type", width: 25 },
            { header: " Etiologie-TOAST - Fibrillation Anticoagulee", key: "toast_fibrillation_anticoagulee", width: 25 },
            { header: " Etiologie-TOAST - Lacune", key: "toast_lacune", width: 15 },
            { header: " Etiologie-TOAST - Indetermine", key: "toast_Indetermine", width: 15 },
            { header: " Etiologie-TOAST - Indetermine Content", key: "toast_IndetermineContent", width: 30 },
// Scanner Columns
            { header: "Scanner - Status", key: "scanner_status", width: 10 },
            { header: "Scanner - DateScanner", key: "scanner_DateScanner", width: 20 },
            { header: "Scanner - AngioscanTSA_Willis", key: "scanner_AngioscanTSA_Willis", width: 25 },
            { header: "Scanner - Occlusin", key: "scanner_Occlusin", width: 20 },
            { header: "Scanner - Stenose", key: "scanner_Stenose", width: 20 },
            { header: "Scanner - StenosePercent", key: "scanner_StenosePercent", width: 20 },
            { header: "Scanner - Description", key: "scanner_Description", width: 30 },
            { header: "Scanner - Score", key: "scanner_Score", width: 10 },
            { header: "Scanner - ACGauche", key: "scanner_ACGauche", width: 20 },
            { header: "Scanner - ACDroite", key: "scanner_ACDroite", width: 20 },
            { header: "Scanner - troncbasilaire", key: "scanner_troncbasilaire", width: 15 },
            { header: "Scanner - AVGauche", key: "scanner_AVGauche", width: 20 },
            { header: "Scanner - AVDroite", key: "scanner_AVDroite", width: 20 },
            { header: "Scanner - AngioWillisGauche", key: "scanner_AngioWillisGauche", width: 25 },
            { header: "Scanner - AngioWillisDroite", key: "scanner_AngioWillisDroite", width: 25 },
            { header: "Scanner - AngioTSAGauche", key: "scanner_AngioTSAGauche", width: 25 },
            { header: "Scanner - AngioTSADroite", key: "scanner_AngioTSADroite", width: 25 },
            // ScannerPerfusion Columns
            { header: "ScannerPerfusion - Status", key: "scannerPerfusion_status", width: 10 },
            { header: "ScannerPerfusion - DateScanner", key: "scannerPerfusion_DateScanner", width: 20 }
        ];

        // Fetch all records from the database
        const hospitalisations = await Hospitalisation.find().lean();
        const patients = await Patient.find().lean();
        const prehospitalieres = await Prehospitaliere.find().lean();
        const hospitalieres = await Hospitaliere.find().lean();
        const biologies = await Biologie.find().lean();
        const conclusionInitiale = await ConclusionInitiale.find().lean();
        const examens = await ExamenClinique.find().lean();
        const examensComplementaires = await ExamensComplementaires.find().lean();
        const conduites = await ConduiteTenirInitiale.find().lean(); // Fetch
        const evolutions = await EvolutionClassification.find().lean(); // Fetch
        const nihsses = await NIHSS.find().lean(); // Fetch
        const conclusionSorties = await ConclusionSortie.find().lean(); // Fetch
        const ascods = await ASCOD.find().lean(); // Fetch
        const toasts = await TOAST.find().lean(); // Fetch
        const scanners = await Scanner.find().lean(); // Fetch
        const scannerPerfusions = await ScannerPerfusion.find().lean();  // Fetch



        // Map patients by _id for quick lookup
        const patientMap = patients.reduce((acc, patient) => {
            acc[patient._id] = patient;
            return acc;
        }, {});

        // Map prehospitalière records by hospitalisation id (using matricule)
        const prehospitalMap = prehospitalieres.reduce((acc, prehosp) => {
            acc[prehosp.matricule] = prehosp;
            return acc;
        }, {});

        // Map hospitalière records by hospitalisation id (using matricule)
        const hospitaliereMap = hospitalieres.reduce((acc, hospiere) => {
            acc[hospiere.matricule] = hospiere;
            return acc;
        }, {});
        const biologieMap = biologies.reduce((acc, bio) => {
            acc[bio.matricule] = bio;
            return acc;
        }, {});
        const conclusionMap = conclusionInitiale.reduce((acc, concl) => {
            acc[concl.matricule] = concl;
            return acc;
        }, {});
        const examenMap = examens.reduce((acc, exam) => {
            acc[exam.matricule] = exam;
            return acc;
        }, {});
        const examensComplementairesMap = examensComplementaires.reduce((acc, examComp) => { // Map ExamensComplementaires
            acc[examComp.matricule] = examComp;
            return acc;
        }, {});
        const conduiteMap = conduites.reduce((acc, conduite) => {
            acc[conduite.matricule] = conduite;
            return acc;
        }, {});
        const evolutionMap = evolutions.reduce((acc, evolution) => {
            acc[evolution.matricule] = evolution;
            return acc;
        }, {});
        const nihssMap = nihsses.reduce((acc, nihss) => {
            acc[nihss.matricule] = nihss;
            return acc;
        }, {});
        // Debug: log the hospitaliereMap to verify keys
        const conclusionSortieMap = conclusionSorties.reduce((acc, conclusionSortie) => {
            acc[conclusionSortie.matricule] = conclusionSortie;
            return acc;
        }, {});
        const ascodMap = ascods.reduce((acc, ascod) => {
            acc[ascod.matricule] = ascod;
            return acc;
        }, {});
        const toastMap = toasts.reduce((acc, toast) => {
            acc[toast.matricule] = toast;
            return acc;
        }, {});
        const scannerMap = scanners.reduce((acc, scanner) => {
            acc[scanner.matricule] = scanner;
            return acc;
        }, {});
        const scannerPerfusionMap = scannerPerfusions.reduce((acc, scannerPerfusion) => {
            acc[scannerPerfusion.matricule] = scannerPerfusion;
            return acc;
        }, {});

        // Loop through each hospitalisation
        hospitalisations.forEach((hosp) => {
            const row = {};

            // Hospitalisation basic fields
            row["hospitalisation_id"] = hosp._id;
            row["dateEntree"] = hosp.dateEntree
                ? new Date(hosp.dateEntree).toISOString().split("T")[0]
                : "";
            row["dateSortie"] = hosp.dateSortie
                ? new Date(hosp.dateSortie).toISOString().split("T")[0]
                : "N/A";
            row["TypeAVC"] = hosp.TypeAVC || "";
            row["status"] = hosp.status || "";
            row["entreeFaitPar"] = hosp.entreeFaitPar || "";
            row["sortieFaitPar"] = hosp.sortieFaitPar || "";

            // Retrieve associated patient using hosp.dossier
            const patient = patientMap[hosp.dossier];
            if (patient) {
                row["patient_id"] = patient._id;
                row["patient_nom"] = patient.Nom || "";
                row["patient_prenom"] = patient.Prenom || "";
                row["sexe"] = patient.sexe || "";
                row["numero_dossier"] = patient.numero_dossier || "";
                row["Adresse"] = patient.Adresse || "";
                row["telephone"] = patient.telephone || "";
                row["email"] = patient.email || "";
                row["dateNaissance"] = patient.dateNaissance || "";
                row["aidantPrincipal"] = patient.aidantPrincipal || "";
                row["numeroAidantPrincipal"] = patient.numeroAidantPrincipal || "";
                row["signatureDocteur"] = patient.signatureDocteur || "";
            }

            // Append Prehospitalière data for this hospitalisation
            const prehosp = prehospitalMap[hosp._id] || {};
            row["prehosp_quiAppelNeurologue"] = prehosp.quiAppelNeurologue || "";
            row["prehosp_dateDebutSymptome"] = prehosp.dateDebutSymptome
                ? new Date(prehosp.dateDebutSymptome).toISOString().split("T")[0]
                : "";
            row["prehosp_dateAppelNeurologue"] = prehosp.dateAppelNeurologue
                ? new Date(prehosp.dateAppelNeurologue).toISOString().split("T")[0]
                : "";
            row["prehosp_motifAppel"] = prehosp.motifAppel || "";
            row["prehosp_autre1"] = prehosp.autre1 || "";
            row["prehosp_autre2"] = prehosp.autre2 || "";

            // Append Hospitalière data for this hospitalisation
            const hospiere = hospitaliereMap[hosp._id] || {};

            row["hospitaliere_Allergies"] = hospiere.Allergies || "";
            row["hospitaliere_HTA"] = hospiere.HTA || "";
            row["hospitaliere_Hypercholestérolémie"] = hospiere["Hypercholestérolémie"] || "";
            row["hospitaliere_Diabète"] = hospiere["Diabète"] || "";
            row["hospitaliere_Fibrillation_auriculaire"] = hospiere["Fibrillation_auriculaire"] || "";
            row["hospitaliere_Ancienneté_fibrillation"] = hospiere["Ancienneté_fibrillation"] || "";
            row["hospitaliere_SAS"] = hospiere.SAS || "";
            row["hospitaliere_SAS_appareillé"] = hospiere.SAS_appareillé || "";
            row["hospitaliere_AIT"] = hospiere.AIT || "";
            row["hospitaliere_AVC"] = hospiere.AVC || "";
            row["hospitaliere_Cardiopathie_ischémique"] = hospiere["Cardiopathie_ischémique"] || "";
            row["hospitaliere_Artériopathie"] = hospiere.Artériopathie || "";
            row["hospitaliere_Autres_antécédents"] = hospiere["Autres_antécédents"] || "";
            row["hospitaliere_Vit"] = hospiere.Vit || "";
            row["hospitaliere_Latéralité"] = hospiere.Latéralité || "";
            row["hospitaliere_Profession"] = hospiere.Profession || "";
            row["hospitaliere_Autonomie"] = hospiere.Autonomie || "";
            row["hospitaliere_Tabagisme"] = hospiere.Tabagisme || "";
            row["hospitaliere_Chicha"] = hospiere.Chicha || "";
            row["hospitaliere_Neffa"] = hospiere.Neffa || "";
            row["hospitaliere_Consommation_alcool"] = hospiere.Consommation_alcool || "";
            row["hospitaliere_Rankin_préAVC"] = hospiere.Rankin_préAVC || "";
            row["hospitaliere_GIR"] = hospiere.GIR || "";
            row["hospitaliere_Poids"] = hospiere.Poids || "";
            row["hospitaliere_Taille"] = hospiere.Taille || "";
            row["hospitaliere_IMC"] = hospiere.IMC || "";
            row["hospitaliere_HistoireMaladie"] = hospiere.HistoireMaladie || "";
            row["hospitaliere_TraitementEntrée"] = hospiere.TraitementEntrée || "";
            const bio = biologieMap[hosp._id] || {};
            row["biologie_Sodium"] = (bio.Sodium != null) ? bio.Sodium : "";
            row["biologie_Potassium"] = (bio.Potassium != null) ? bio.Potassium : "";
            row["biologie_Urée"] = (bio["Urée"] != null) ? bio["Urée"] : "";
            row["biologie_Créatinine"] = (bio["Créatinine"] != null) ? bio["Créatinine"] : "";
            row["biologie_CRP"] = (bio.CRP != null) ? bio.CRP : "";
            row["biologie_CPK"] = (bio.CPK != null) ? bio.CPK : "";
            row["biologie_HbA1C"] = (bio.HbA1C != null) ? bio.HbA1C : "";
            row["biologie_Myoglobine"] = (bio.Myoglobine != null) ? bio.Myoglobine : "";
            row["biologie_Troponine"] = (bio.Troponine != null) ? bio.Troponine : "";
            row["biologie_NT_pro_BNP"] = (bio.NT_pro_BNP != null) ? bio.NT_pro_BNP : "";
            row["biologie_VSH1"] = (bio.VSH1 != null) ? bio.VSH1 : "";
            row["biologie_Hémoglobine"] = (bio["Hémoglobine"] != null) ? bio["Hémoglobine"] : "";
            row["biologie_Leucocytes"] = (bio.Leucocytes != null) ? bio.Leucocytes : "";
            row["biologie_Plaquettes"] = (bio.Plaquettes != null) ? bio.Plaquettes : "";
            row["biologie_D_dimères"] = (bio["D_dimères"] != null) ? bio["D_dimères"] : "";
            row["biologie_Monomères_de_fbrine"] = (bio["Monomères_de_fbrine"] != null) ? bio["Monomères_de_fbrine"] : "";
            row["biologie_Fibrinogène"] = (bio.Fibrinogène != null) ? bio.Fibrinogène : "";
            row["biologie_TP"] = (bio.TP != null) ? bio.TP : "";
            row["biologie_Ratio_TCA"] = (bio.Ratio_TCA != null) ? bio.Ratio_TCA : "";
            row["biologie_ASAT_GOT"] = (bio.ASAT_GOT != null) ? bio.ASAT_GOT : "";
            row["biologie_ALAT_GPT"] = (bio.ALAT_GPT != null) ? bio.ALAT_GPT : "";
            row["biologie_GGT"] = (bio.GGT != null) ? bio.GGT : "";
            row["biologie_PAL"] = (bio.PAL != null) ? bio.PAL : "";
            row["biologie_Hdl_Ch"] = (bio.Hdl_Ch != null) ? bio.Hdl_Ch : "";
            row["biologie_Ldl_Ch"] = (bio.Ldl_Ch != null) ? bio.Ldl_Ch : "";
            row["biologie_TG"] = (bio.TG != null) ? bio.TG : "";
            row["biologie_CT_Total"] = (bio.CT_Total != null) ? bio.CT_Total : "";
            row["biologie_Bilirubine_totale"] = (bio.Bilirubine_totale != null) ? bio.Bilirubine_totale : "";
            row["biologie_Bilirubine_libre"] = (bio.Bilirubine_libre != null) ? bio.Bilirubine_libre : "";
            const concl = conclusionMap[hosp._id] || {};
            row["conclusion_ECG"] = (concl.ECG != null) ? concl.ECG : "";
            row["conclusion_TP"] = (concl.TP != null) ? concl.TP : "";
            row["conclusion_Ratio_TCA"] = (concl.Ratio_TCA != null) ? concl.Ratio_TCA : "";
            row["conclusion_INR"] = (concl.INR != null) ? concl.INR : "";
            row["conclusion_Plaquettes"] = (concl.Plaquettes != null) ? concl.Plaquettes : "";
            row["conclusion_Hémoglobine"] = (concl["Hémoglobine"] != null) ? concl["Hémoglobine"] : "";
            row["conclusion_Dosage"] = (concl.Dosage != null) ? concl.Dosage : "";
            row["conclusion_Conclusion"] = concl.Conclusion || "";
            const exam = examenMap[hosp._id] || {};
            row["examen_NIHSSValue"] = (exam.NIHSSValue != null) ? exam.NIHSSValue : "";
            row["examen_LASTInitial"] = (exam.LASTInitial != null) ? exam.LASTInitial : "";
            row["examen_ResultExamenNeuroInitial"] = exam.ResultExamenNeuroInitial || "";
            row["examen_TA"] = exam.TA || "";
            row["examen_Dextro"] = exam.Dextro || "";
            row["examen_AuscultationCardiaque"] = exam.AuscultationCardiaque || "";
            row["examen_AuscultationPulmonaire"] = exam.AuscultationPulmonaire || "";
            row["examen_SouffleCarotidien"] = exam.SouffleCarotidien || "";
            row["examen_ResultsExamenGeneral"] = exam.ResultsExamenGeneral || "";
            if (exam.testDeglutition) {
                // For booleans, we convert to "1" or "0" immediately
                row["examen_testDeglutition_testDone"] = (typeof exam.testDeglutition.testDone === "boolean")
                    ? (exam.testDeglutition.testDone ? "1" : "0")
                    : "";
                row["examen_testDeglutition_hasTrouble"] = (typeof exam.testDeglutition.hasTrouble === "boolean")
                    ? (exam.testDeglutition.hasTrouble ? "1" : "0")
                    : "";
                row["examen_testDeglutition_typeOfTrouble"] = exam.testDeglutition.typeOfTrouble || "";
            } else {
                row["examen_testDeglutition_testDone"] = "";
                row["examen_testDeglutition_hasTrouble"] = "";
                row["examen_testDeglutition_typeOfTrouble"] = "";
            }
            const examComp = examensComplementairesMap[hosp._id] || {}; // Retrieve ExamensComplementaires

            row["examens_ETT"] = examComp.ETT != null ? (examComp.ETT ? "1" : "0") : "";
            row["examens_DescETT"] = examComp.DescETT || "";
            row["examens_ETO"] = examComp.ETO != null ? (examComp.ETO ? "1" : "0") : "";
            row["examens_DescETO"] = examComp.DescETO || "";
            row["examens_TélémétrieCardiaque"] = examComp.TélémétrieCardiaque != null ? (examComp.TélémétrieCardiaque ? "1" : "0") : "";
            row["examens_DescTélémétrieCardiaque"] = examComp.DescTélémétrieCardiaque || "";
            row["examens_Arteriographie"] = examComp.Arteriographie != null ? (examComp.Arteriographie ? "1" : "0") : "";
            row["examens_DescArteriographie"] = examComp.DescArteriographie || "";
            row["examens_HolterRythmique"] = examComp.HolterRythmique != null ? (examComp.HolterRythmique ? "1" : "0") : "";
            row["examens_DescHolterRythmique"] = examComp.DescHolterRythmique || "";
            row["examens_EDTSA"] = examComp.EDTSA != null ? (examComp.EDTSA ? "1" : "0") : "";
            row["examens_DescEDTSA"] = examComp.DescEDTSA || "";
            row["examens_EDTC"] = examComp.EDTC != null ? (examComp.EDTC ? "1" : "0") : "";
            row["examens_DescEDTC"] = examComp.DescEDTC || "";
            row["examens_AutreExamens"] = examComp.AutreExamens != null ? (examComp.AutreExamens ? "1" : "0") : "";
            row["examens_DescAutreExamens"] = examComp.DescAutreExamens || "";
            const conduite = conduiteMap[hosp._id] || {}; // Retrieve ConduiteTenirInitiale
            row["conduite_thrombolyseIntraveineuse"] = conduite.thrombolyseIntraveineuse || "";
            row["conduite_doorToNeedle"] = conduite.doorToNeedle ? new Date(conduite.doorToNeedle).toISOString() : "";
            row["conduite_doorToNeedleDetails"] = conduite.doorToNeedleDetails || "";
            row["conduite_actilyse"] = conduite.actilyse || "";
            row["conduite_tenecteplase"] = conduite.tenecteplase || "";
            row["conduite_delayExceeded"] = conduite.delayExceeded || "";
            row["conduite_recentHypodensity"] = conduite.recentHypodensity || "";
            row["conduite_otherCauses"] = conduite.otherCauses || "";
            row["conduite_anticoagulationTherapy"] = conduite.anticoagulationTherapy || "";
            row["conduite_motorRehabilitation"] = conduite.motorRehabilitation || "";
            row["conduite_rehabilitationTime"] = conduite.rehabilitationTime ? new Date(conduite.rehabilitationTime).toISOString() : "";
            row["conduite_plaquettes"] = conduite.plaquettes || "";
            row["conduite_INR"] = conduite.INR || "";
            row["conduite_AnticoagulationCurative"] = conduite.AnticoagulationCurative || "";
            row["conduite_AITSansOcclusion"] = conduite.AITSansOcclusion || "";
            row["conduite_DeficitMineurSansOcclusion"] = conduite.DeficitMineurSansOcclusion || "";
            row["conduite_ChirurgieRecente"] = conduite.ChirurgieRecente || "";
            row["conduite_HemorragieRecente"] = conduite.HemorragieRecente || "";
            row["conduite_AnticoagulationCurativeII"] = conduite.AnticoagulationCurativeII || "";
            row["conduite_ThrombectomieMecanique"] = conduite.ThrombectomieMecanique || "";
            row["conduite_ThrombectomieMecaniqueHeure"] = conduite.ThrombectomieMecaniqueHeure ? new Date(conduite.ThrombectomieMecaniqueHeure).toISOString() : "";
            row["conduite_StentRetriever"] = conduite.StentRetriever || "";
            row["conduite_ThromboAspiration"] = conduite.ThromboAspiration || "";
            row["conduite_TICI"] = conduite.TICI || "";
            row["conduite_HNF"] = conduite.HNF || "";
            row["conduite_HBPM"] = conduite.HBPM || "";
            row["conduite_AOD"] = conduite.AOD || "";
            row["conduite_DelaiIntro"] = conduite.DelaiIntro ? new Date(conduite.DelaiIntro).toISOString() : "";
            row["conduite_SimpleAntiAgregationPlaquetaire"] = conduite.SimpleAntiAgregationPlaquetaire || "";
            row["conduite_SimpleAntiAgregationPlaquetaireType"] = conduite.SimpleAntiAgregationPlaquetaireType || "";
            row["conduite_DoubleAntiAgregationPlaquetaire"] = conduite.DoubleAntiAgregationPlaquetaire || "";
            row["conduite_DoubleAntiAgregationPlaquetaireDose"] = conduite.DoubleAntiAgregationPlaquetaireDose || "";
            row["conduite_DoubleAntiAgregationPlaquetaireDoseHeure"] = conduite.DoubleAntiAgregationPlaquetaireDoseHeure ? new Date(conduite.DoubleAntiAgregationPlaquetaireDoseHeure).toISOString() : "";
            row["conduite_DoubleAntiAgregationPlaquetaireType"] = conduite.DoubleAntiAgregationPlaquetaireType || "";
            row["conduite_AnticoagulationCurativeIIHeure"] = conduite.AnticoagulationCurativeIIHeure ? new Date(conduite.AnticoagulationCurativeIIHeure).toISOString() : "";
            row["conduite_TraitementAntihypertenseur"] = conduite.TraitementAntihypertenseur || "";
            row["conduite_TraitementParVoieIntraveineuse"] = conduite.TraitementParVoieIntraveineuse || "";
            row["conduite_TraitementParVoieIntraveineuseHeure"] = conduite.TraitementParVoieIntraveineuseHeure ? new Date(conduite.TraitementParVoieIntraveineuseHeure).toISOString() : "";
            row["conduite_Nicardipine"] = conduite.Nicardipine || "";
            row["conduite_TraitementParVoieIntraveineuseAutresMolecules"] = conduite.TraitementParVoieIntraveineuseAutresMolecules || "";
            row["conduite_TraitementParVoieOrale"] = conduite.TraitementParVoieOrale || "";
            row["conduite_TraitementParVoieOraleHeure"] = conduite.TraitementParVoieOraleHeure ? new Date(conduite.TraitementParVoieOraleHeure).toISOString() : "";
            row["conduite_InsulinotherapieEnSC"] = conduite.InsulinotherapieEnSC || "";
            row["conduite_TraitementParVoieOraleType"] = conduite.TraitementParVoieOraleType || "";
            row["conduite_InsulinotherapieEnSCHeure"] = conduite.InsulinotherapieEnSCHeure ? new Date(conduite.InsulinotherapieEnSCHeure).toISOString() : "";
            row["conduite_Hypolipemiants"] = conduite.Hypolipemiants || "";
            row["conduite_Atorvastatine"] = conduite.Atorvastatine || "";
            row["conduite_AtorvastatineDose"] = conduite.AtorvastatineDose || "";
            row["conduite_Ezetimib"] = conduite.Ezetimib || "";
            row["conduite_PCSK9"] = conduite.PCSK9 || "";
            row["conduite_MatelasAntiEscarre"] = conduite.MatelasAntiEscarre || "";
            row["conduite_MatelasAntiEscarreHeure"] = conduite.MatelasAntiEscarreHeure ? new Date(conduite.MatelasAntiEscarreHeure).toISOString() : "";
            row["conduite_ReeducationOrthophonique"] = conduite.ReeducationOrthophonique || "";
            row["conduite_ReeducationOrthophoniqueHeure"] = conduite.ReeducationOrthophoniqueHeure ? new Date(conduite.ReeducationOrthophoniqueHeure).toISOString() : "";
            row["conduite_Verticalisation"] = conduite.Verticalisation || "";
            row["conduite_VerticalisationHeure"] = conduite.VerticalisationHeure ? new Date(conduite.VerticalisationHeure).toISOString() : "";
            row["conduite_SondeNasogastrique"] = conduite.SondeNasogastrique || "";
            row["conduite_SondeNasogastriqueHeure"] = conduite.SondeNasogastriqueHeure ? new Date(conduite.SondeNasogastriqueHeure).toISOString() : "";
            row["conduite_ReeducationMotrice"] = conduite.ReeducationMotrice || "";
            row["conduite_ReeducationMotriceHeure"] = conduite.ReeducationMotriceHeure ? new Date(conduite.ReeducationMotriceHeure).toISOString() : "";

            const evolution = evolutionMap[hosp._id] || {}; // Retrieve EvolutionClassification
            row["evolution_PlanClinique"] = evolution.PlanClinique != null ? (evolution.PlanClinique ? "1" : "0") : "";
            row["evolution_PlanEtiologique"] = evolution.PlanEtiologique != null ? (evolution.PlanEtiologique ? "1" : "0") : "";
            row["evolution_PlanThérapeutique"] = evolution.PlanThérapeutique != null ? (evolution.PlanThérapeutique ? "1" : "0") : "";
            row["evolution_DescPlanClinique"] = evolution.DescPlanClinique || "";
            row["evolution_DescPlanEtiologique"] = evolution.DescPlanEtiologique || "";
            row["evolution_DescPlanThérapeutique"] = evolution.DescPlanThérapeutique || "";
            row["evolution_PneumopathieInhalation"] = evolution.PneumopathieInhalation || "";
            row["evolution_InfectionUrinaire"] = evolution.InfectionUrinaire || "";
            row["evolution_EmboliePulmonaire"] = evolution.EmboliePulmonaire || "";
            row["evolution_ThromboseVeineuseProfonde"] = evolution.ThromboseVeineuseProfonde || "";
            row["evolution_HemorragieExtracranienne"] = evolution.HemorragieExtracranienne || "";
            row["evolution_Escarre"] = evolution.Escarre || "";
            const nihss = nihssMap[hosp._id] || {}; // Retrieve NIHSS
            row["nihss_categorie"] = nihss.categorie || "";
            row["nihss_date"] = nihss.date ? new Date(nihss.date).toISOString() : "";
            row["nihss_totalAuto"] = nihss.totalAuto || "";
            row["nihss_vigilance"] = nihss.vigilance || "";
            row["nihss_orientation"] = nihss.orientation || "";
            row["nihss_commandes"] = nihss.commandes || "";
            row["nihss_oculomotricite"] = nihss.oculomotricite || "";
            row["nihss_champVisuel"] = nihss.champVisuel || "";
            row["nihss_paralysieFaciale"] = nihss.paralysieFaciale || "";
            row["nihss_motriciteMembreSupG"] = nihss.motriciteMembreSupG || "";
            row["nihss_motriciteMembreSupD"] = nihss.motriciteMembreSupD || "";
            row["nihss_motriciteMembreIntG"] = nihss.motriciteMembreIntG || "";
            row["nihss_motriciteMembreIntD"] = nihss.motriciteMembreIntD || "";
            row["nihss_ataxie"] = nihss.ataxie || "";
            row["nihss_sensibilite"] = nihss.sensibilite || "";
            row["nihss_langage"] = nihss.langage || "";
            row["nihss_dysarthrie"] = nihss.dysarthrie || "";
            row["nihss_extinctionNegligence"] = nihss.extinctionNegligence || "";

            const conclusionSortie = conclusionSortieMap[hosp._id] || {}; // Retrieve ConclusionSortie

            row["conclusionsortie_NIHSSValue"] = conclusionSortie.NIHSSValue || "";
            row["conclusionsortie_mRsSortie"] = conclusionSortie.mRsSortie || "";
            row["conclusionsortie_LastSortie"] = conclusionSortie.LastSortie || "";
            row["conclusionsortie_ModeSortie"] = conclusionSortie.ModeSortie || "";
            row["conclusionsortie_TraitementSortie"] = conclusionSortie.TraitementSortie ? JSON.stringify(conclusionSortie.TraitementSortie) : ""; // Convert Array to string for Excel
            row["conclusionsortie_RecommandationsSortie"] = conclusionSortie.RecommandationsSortie ? JSON.stringify(conclusionSortie.RecommandationsSortie) : ""; // Convert Array to string for Excel
            row["conclusionsortie_Conclusion"] = conclusionSortie.Conclusion || "";
            const ascod = ascodMap[hosp._id] || {}; // Retrieve ASCOD

            row["ascod_A"] = ascod.A || "";
            row["ascod_S"] = ascod.S || "";
            row["ascod_C"] = ascod.C || "";
            row["ascod_O"] = ascod.O || "";
            row["ascod_D"] = ascod.D || "";
            row["ascod_info"] = ascod.info || "";
            const toast = toastMap[hosp._id] || {}; // Retrieve TOAST

            row["toast_atherothrombotique"] = toast.atherothrombotique || "";
            row["toast_atherothrombotiqueContent"] = toast.atherothrombotiqueContent ? JSON.stringify(toast.atherothrombotiqueContent) : "";
            row["toast_info"] = toast.info || "";
            row["toast_cardioembolique"] = toast.cardioembolique || "";
            row["toast_cardioemboliqueContent"] = toast.cardioemboliqueContent ? JSON.stringify(toast.cardioemboliqueContent) : "";
            row["toast_fibrillation_valvulaire"] = toast.fibrillation_valvulaire || "";
            row["toast_fibrillation_type"] = toast.fibrillation_type || "";
            row["toast_fibrillation_anticoagulee"] = toast.fibrillation_anticoagulee || "";
            row["toast_lacune"] = toast.lacune || "";
            row["toast_Indetermine"] = toast.Indetermine || "";
            row["toast_IndetermineContent"] = toast.IndetermineContent || "";

            const scanner = scannerMap[hosp._id] || {}; // Retrieve Scanner
            row["scanner_status"] = scanner.status || "";
            row["scanner_DateScanner"] = scanner.DateScanner ? new Date(scanner.DateScanner).toISOString() : "";
            row["scanner_AngioscanTSA_Willis"] = scanner.AngioscanTSA_Willis || "";
            row["scanner_Occlusin"] = scanner.Occlusin || "";
            row["scanner_Stenose"] = scanner.Stenose || "";
            row["scanner_StenosePercent"] = scanner.StenosePercent || "";
            row["scanner_Description"] = scanner.Description || "";
            row["scanner_Score"] = scanner.Score || "";
            row["scanner_ACGauche"] = scanner.ACGauche || "";
            row["scanner_ACDroite"] = scanner.ACDroite || "";
            row["scanner_troncbasilaire"] = scanner.troncbasilaire || "";
            row["scanner_AVGauche"] = scanner.AVGauche || "";
            row["scanner_AVDroite"] = scanner.AVDroite || "";
            row["scanner_AngioWillisGauche"] = scanner.AngioWillisGauche || "";
            row["scanner_AngioWillisDroite"] = scanner.AngioWillisDroite || "";
            row["scanner_AngioTSAGauche"] = scanner.AngioTSAGauche || "";
            row["scanner_AngioTSADroite"] = scanner.AngioTSADroite || "";
            const scannerPerfusion = scannerPerfusionMap[hosp._id] || {}; // Retrieve ScannerPerfusion
            row["scannerPerfusion_status"] = scannerPerfusion.status || "";
            row["scannerPerfusion_DateScanner"] = scannerPerfusion.DateScanner ? new Date(scannerPerfusion.DateScanner).toISOString() : ""
            // Convert any value that equals "oui"/"non" (case-insensitive) to 1 or 0
            Object.keys(row).forEach(key => {
                if (typeof row[key] === "string") {
                    const lowerVal = row[key].trim().toLowerCase();
                    if (lowerVal === "oui") {
                        row[key] = "1";
                    } else if (lowerVal === "non") {
                        row[key] = "0";
                    }
                }
            });

            // Debug: log the complete row to verify conversion
            worksheet.addRow(row);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    } catch (error) {
        console.log("Error generating Excel:", error.message);

        console.error("Error generating Excel:", error.message);
        throw new Error(error.message);
    }
};
