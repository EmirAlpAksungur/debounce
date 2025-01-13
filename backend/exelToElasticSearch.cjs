const xlsx = require('xlsx');
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
  log: 'trace'
});

const excelFile = 'airports.xlsx';

function uploadDataToElasticsearch() {
  return new Promise(async (resolve, reject) => {
    try {
      if (fs.existsSync(excelFile)) {
        const workbook = xlsx.readFile(excelFile);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log("girdi");

        await esClient.indices.create({
          index: 'iata'
        }, { ignore: [400] });
        console.log("oluştu");
        for (let i = 0; i < sheetData.length; i++) {
          const record = sheetData[i];
          console.log(record);

          await esClient.index({
            index: 'iata',
            id: i + 1,
            body: record
          });
        }
        console.log("Done");
        resolve(true);
      } else {
        console.error('Excel file not found');
        resolve(false);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}

module.exports = { uploadDataToElasticsearch };