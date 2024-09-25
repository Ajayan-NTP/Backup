const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');
const path = require('path');



const FilePath = './Config.json';
const Data = JSON.parse(fs.readFileSync(FilePath, 'utf8'));
const filepath = Data.filepath;

// Load the JSON data from the file
const jsonFilePath = filepath.jsoninputpath2;
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//console.log(testData);
let BlockId = "20725";
it('Put api test to the block allocation', async function ({ supertest }) {
  const reservation = testData.reservation;
  await supertest
.request(reservation.request)
.put(`/blk/v1/hotels/GRVEU/blocks/${BlockId}/allocationRange`)
.set('Content-Type', 'application/json')
.set('x-hotelid', 'GRVEU')
.set('x-app-key', '028ab184-754f-4b0b-aae0-3202ae9f54a1')
.set('bypass-routing', 'N')
.set('Authorization', 'Bearer ' + reservation.authToken1)
.send(
  {
"blockAllocationRange": {
  "blockId": {
    "type": "Block",
    "idContext": "OPERA",
    "id": BlockId
  },
  "hotelId": reservation.hotelId,
  "roomTypes": reservation.roomType,
  "beginDate": reservation.startDate,
  "endDate": reservation.endDate,
  "allocationType": "Initial",
  "incrementFlag": "false",
  "blockInventory": {
    "onePerson": "2",
    "sellLimit": "2"
  },
  "blockRates": {
    "onePerson": "199"
  },
  "includedDays": "1111111",
  "rangeMode": "Core",
  "genericRoomType": "false"
},
"_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/SetBlockAllocationRange_Opera/types"
}
)
.expect(200)
.expect('Content-Type', /json/)
.then(function (response) {
console.log(response)
});
});
