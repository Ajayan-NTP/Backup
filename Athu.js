const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');
const path = require('path');


const FilePath = './Config.json';
const Data = JSON.parse(fs.readFileSync(FilePath, 'utf8'));
const filepath = Data.filepath;

// Load the JSON data from the file
const jsonFilePath = filepath.jsoninputpath1;
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//console.log(testData);
let excelData = [];
let authToken1;
let BlockID;
let reservationId;
let authToken; 
let confirmationId;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;

 // Variable to store the campaign id from the first program's response 
 const reservation = testData.reservation;
 describe('api Authu Token', function () {
    const reservation = testData.reservation;
    before(async function() {
      const reservation = testData.reservation;
      await supertest(reservation.request)
          .post(reservation.Authendpath)
          .set('Content-Type', reservation['Content-Type'])
          .set('x-app-key', reservation['x-app-key'])
          .set('Authorization', reservation.Authorization)
          .send({
              username: reservation.username,
              password: reservation.password,
              grant_type: 'password'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function (response) {
            reservation.authToken1 = response.body.access_token;
            // Update the testData object with the new authToken
            testData.reservation = reservation;
            // Write the updated testData back to the JSON file
            fs.writeFileSync(jsonFilePath, JSON.stringify(testData, null, 2), 'utf8');
              //console.log('Auth Token:', authToken1); // Logging the token
          });
// Authenticate and set the second authToken before running tests
  await supertest(reservation.request1)
  .post(reservation.Authendpath1)
  .set('X-IHG-M2M', reservation['X-IHG-M2M'])
  .set('User-Agent', reservation['User-Agent'])
  .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
  .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
  .set('Authorization', reservation.Authorization1)
  .send({
      username: reservation.username3,
  })
  .expect(200)
  .expect('Content-Type', /json/)
  .then(function (response) {
    reservation.authToken = response.body.access_token;
    // Update the testData object with the new authToken
    testData.reservation = reservation;
    // Write the updated testData back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(testData, null, 2), 'utf8');
  })
      })
    });
