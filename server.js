const express = require("express");
const PDFDocument = require("pdfkit");

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta raíz para evitar el error "Cannot GET /"
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de generación de PDFs! 🚀 Prueba /generate-pdf");
});

// Ruta para generar PDF
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

// Iniciar servidor en el puerto asignado por Render
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
