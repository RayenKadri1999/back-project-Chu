import express from "express";
import { exportToExcel, exportToCsv, sendFile } from "../controllers/generateController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { authorizeRoles } from "../utils/authorizeRoles.js";

const router = express.Router();

// Route to export patients to CSV or Excel based on format query parameter
router.get("/export", [verifyToken, authorizeRoles("admin")], async (req, res, next) => {
  const format = req.query.format;
  
  try {
    if (format === "Excel") {
      // Call exportToExcel middleware to create the Excel file
      await exportToExcel(req, res, next);
    } else if (format === "Csv") {
      // Call exportToCsv middleware to create the CSV file
      await exportToCsv(req, res, next);
    } else {
      return res.status(400).json({ error: "Invalid format. Use 'format=csv' or 'format=excel'." });
    }
    
    // Send the file to the user
    sendFile(req, res);
  } catch (error) {
    console.error("Error exporting data:", error);
    return res.status(500).json({ error: "An error occurred during the export process." });
  }
});

export default router;
