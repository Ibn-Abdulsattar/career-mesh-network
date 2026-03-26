import PDFDocument from "pdfkit";
import fs from "fs";
import crypto from "node:crypto";
import axios from "axios";

const convertDataToPdf = async (userData) => {
  const { user } = userData;
  const { experiences, educations, ...data } = user.profile;

  const doc = new PDFDocument();

  let imageBuffer;

  try {
    const response = await axios.get(user.avatar_url, {
      responseType: "arraybuffer",
    });
    imageBuffer = Buffer.from(response.data);
  } catch (error) {}

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("./upload/" + outputPath);

  doc.pipe(stream);

  if (imageBuffer) {
    doc.image(imageBuffer, {
      fit: [100, 100],
      align: 'center',
      valign: 'center'
    });
    doc.moveDown(5); 
  }

  doc.fillColor("#2c3e50")
     .fontSize(28)
     .text(user.username, { align: "center", underline: true });
  
  doc.moveDown(1.5);

  // --- Experience Section ---
  doc.fillColor("#2980b9").fontSize(18).text("EXPERIENCE");
  doc.moveTo(70, doc.y).lineTo(500, doc.y).stroke();
  doc.moveDown(0.5);

  experiences.forEach(exp => {
    doc.fillColor("black").fontSize(14).text(exp.position, { continued: true });
    doc.fillColor("#7f8c8d").fontSize(12).text(`  |  ${exp.company}`, { align: "left" });
    doc.fontSize(10).text(exp.years);
    doc.moveDown(0.8);
  });

  doc.moveDown(1.2);

  // --- Education Section ---
  doc.fillColor("#2980b9").fontSize(18).text("EDUCATION");
  doc.moveTo(70, doc.y).lineTo(500, doc.y).stroke();
  doc.moveDown(0.5);

  educations.forEach(edu => {
    doc.fillColor("black").fontSize(14).text(edu.degree);
    doc.fillColor("#2c3e50").fontSize(12).text(`${edu.school} (${edu.field})`);
    doc.moveDown(0.8);
  });

  doc.end();

  return outputPath;
};

export default convertDataToPdf;
