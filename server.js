const express = require("express");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = 3000;

app.get("/generate-pdf", (req, res) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        const base64String = pdfData.toString("base64");

        res.json({ base64: base64String });
    });

    // Contenido del PDF
    doc.fontSize(20).text("📄 ¡Hola desde tu API en PDF!", { align: "center" });
    doc.text("\nEste PDF ha sido generado dinámicamente en la API.");
    doc.end();
});

app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de generación de PDFs! 🚀 Prueba /generate-pdf");
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});