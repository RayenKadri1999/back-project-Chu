import { generatePatientsExcel } from "../services/downloadService.js"; // Move logic to a service
import fs from "fs";
import path from "path";

export const downloadPatientsExcel = async (req, res) => {
    try {
        const buffer = await generatePatientsExcel();

        // Define a file name
        const fileName = `patients_${Date.now()}.xlsx`;
        const filePath = path.join("/tmp", fileName);

        // Write buffer to a temporary file
        fs.writeFileSync(filePath, buffer);

        // Set response headers
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        // Send file as response
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "Error sending file" });
            }

            // Cleanup temporary file after sending
            fs.unlinkSync(filePath);
        });

    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).json({ message: "Failed to generate Excel file" });
    }
};
