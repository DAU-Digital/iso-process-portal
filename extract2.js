const fs = require('fs');
const PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1); // 1 = returns unformatted text

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("./out.txt", pdfParser.getRawTextContent());
    console.log("Done extracting");
});

const targetPath = "D:/HoangLong/Dai-hoc-kien-truc/Tai-lieu/DAU-ISO/P.TCKT/QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA/QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA.pdf";
pdfParser.loadPDF(targetPath);
