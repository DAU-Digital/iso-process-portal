const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const targetPath = path.join(__dirname, '../QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA/QUY TRÌNH THU LỆ PHÍ THI CHUẨN ĐẦU RA.pdf');

let dataBuffer = fs.readFileSync(targetPath);

pdf(dataBuffer).then(function(data) {
    console.log("----- PDF TEXT -----");
    console.log(data.text);
}).catch(err => {
    console.error("ERROR REading PDF:", err);
});
