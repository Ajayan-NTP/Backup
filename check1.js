const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');
const path = require('path');

const jsonFilePath = 'C:/Users/Ajayan/NightWatch/nightwatch/Block_Flows/BLOCK_za/check.json';
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

it('GET Reservation  GRS', async function ({ supertest }) {
    await supertest
        .request(reservation.request1)
        .get(reservation.Getendpath1 + "43996709")
        .query({
            lastName: reservation.lastName
        })
        .set('Content-Length', '0')
        .set('X-IHG-M2M', reservation['X-IHG-M2M'])
        .set('User-Agent', reservation['User-Agent'])
        .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
        .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', 'Bearer ' + reservation.authToken)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          console.log(response)
            const responseBody = JSON.parse(response.text);
            const reservation = responseBody.hotelReservation;
  
            const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
            ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';
  
            const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
            externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';
  
            const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
            pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';
           
  
   
           // console.log(response)
            console.log("Status: Reservation created Successfully in GRS");
            console.log("IHG Confirmation Number:", ihgConfirmationNumber);
            console.log("External Confirmation Number:", externalConfirmationNumber);
            console.log("PMS Confirmation Number:", pmsConfirmationNumber);
            excelData.push([BlockID, reservationId, confirmationId, externalReferenceId, ihgConfirmationNumber, externalConfirmationNumber, pmsConfirmationNumber]);
        });
      });
 });