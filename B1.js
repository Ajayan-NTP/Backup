const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');
const path = require('path');


const FilePath = './Config.json';
const Data = JSON.parse(fs.readFileSync(FilePath, 'utf8'));
const filepath = Data.filepath;

// Load the JSON data from the file
const jsonFilePath = filepath.jsoninputpath;
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
              username: reservation.username1,
              password: reservation.password1,
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
  await supertest(reservation.request2)
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


// // Create the Group Block
//   it('post api test to create the group block', async function({supertest}) {
//     await supertest
//     .request(reservation.request)
//     .post(reservation.Postendpath3)
//     .set('Content-Type', reservation['Content-Type1'])
//     .set('x-hotelid', reservation.hotelId)
//     .set('x-app-key', reservation['x-app-key'])
//     .set('bypass-routing', reservation['bypass-routing'])
//     .set('Authorization', 'Bearer ' + reservation.authToken1)
//     .send(
//         {
//             "blocks": {
//                 "blockInfo": {
//                     "block": {
//                         "blockDetails": {
//                             "blockCode": reservation.blockcode,
//                             "blockName": "allocation",
//                             "timeSpan": {
//                                 "startDate": reservation.arrivalDate,
//                                 "endDate": reservation.departureDate
//                             },
//                             "shoulderDates": "",
//                             "blockStatus": {
//                                 "bookingStatus": {
//                                     "status": {
//                                         "code": reservation.currentBlockStatus
//                                     }
//                                 }
//                             },
//                             "reservationType": {
//                                 "reservationType": "GT"
//                             },
//                             "marketCode": {
//                             "marketCode": "G"
//                             },
//                             "sourceOfSale": {
//                                 "sourceCode": {
//                                     "sourceCode": "GD"
//                                 }
//                             },
//                             "reservationMethod": "",
//                             "bookingType": "",
//                             "blockOrigin": "PMS",
//                             "rateProtectionDetails": {
//                                 "criteria": "None"
//                             },
//                             "nonCompeteDetails": {
//                                 "criteria": "None"
//                             },
//                             "blockClassification": "RegularBooking",
//                             "cateringOnlyBlock": "false",
//                             "allowRateOverride": "false",
//                             "manualCutOff": "false",
//                             "wholesaleBlock": "false",
//                             "controlBlockLocally": "false"
//                         },
//                         "blockOwners": {
//                             "owner": [
//                                 {
//                                     "ownership": "Block",
//                                     "ownerCode": "ALL",
//                                     "primary": "true"
//                                 },
//                                 {
//                                     "ownership": "Catering",
//                                     "ownerCode": "ALL",
//                                     "primary": "true"
//                                 },
//                                 {
//                                     "ownership": "Rooms",
//                                     "ownerCode": "ALL",
//                                     "primary": "true"
//                                 }
//                             ],
//                             "lockBlockOwners": "false",
//                             "lockRoomsOwners": "false",
//                             "lockCateringOwners": "false"
//                         },
//                         "reservationDetails": {
//                             "traceCode": "",
//                             "breakfast": {
//                                 "breakfastIncluded": "false",
//                                 "price": ""
//                             },
//                             "porterage": {
//                                 "porterageIncluded": "false",
//                                 "price": ""
//                             },
//                             "elastic": "2",
//                             "printRate": "true",
//                             "housing": "true",
//                             "controlBlockLocally": "false"
//                         },
//                         "catering": {
//                             "cateringStatus": {
//                                 "bookingStatus": {
//                                     "status": "PRO"
//                                 }
//                             },
//                             "eventAttendees": "",
//                             "overrideEventsProcessingWarnings": "true"
//                         },
//                         "blockProfiles": {
//                             "fullOverlay": "false"
//                         },
//                         "externalAttributes": {
//                             "eventType": "Convention",
//                             "rollEndDate": "false"
//                         },
//                         "hotelId": reservation.hotelId,
//                         "markAsRecentlyAccessed": "true"
//                     }
//                 }
//             }
//         }
//     )
    
    
//       .expect(201)
//       .expect('Content-Type', /json/)
//       .then(function(response){
//         //console.log(response)
//         const locationHeader = response.headers.location;
//        // console.log("Location Header: ", locationHeader);

//         const urlParts = locationHeader.split('/');
//         BlockID = urlParts[urlParts.length - 1];
//         console.log("BLOCK ID: ", BlockID);
    
//     });
// });

// // Block Allocation
// it('Put api test to the block allocation', async function ({ supertest }) {
    
//         await supertest
//     .request(reservation.request)
//     .put(`/blk/v1/hotels/GRVXX/blocks/${BlockID}/allocationRange`)
//     .set('Content-Type', 'application/json')
//     .set('x-hotelid', 'GRVXX')
//     .set('x-app-key', '69594b78-9894-4914-a894-860ca6d056db')
//     .set('bypass-routing', 'N')
//     .set('Authorization', 'Bearer ' + reservation.authToken1)
//     .send(
//       {
//         "blockAllocationRange": {
//           "blockId": {
//             "type": "Block",
//             "idContext": "OPERA",
//             "id": BlockID
//           },
//           "hotelId": reservation.hotelId,
//           "roomTypes": reservation.roomType,
//           "beginDate": reservation.arrivalDate,
//           "endDate": reservation.arrivalDate,
//           "allocationType": "Initial",
//           "incrementFlag": false,
//           "blockInventory": {
//             "onePerson": 3,
//             "sellLimit": 3
//           },
//           "blockRates": {
//             "onePerson": 99
            
//           },
//           "includedDays": 1111111,
//           "rangeMode": "Core",
//           "genericRoomType": false
//         }
//       }
//     )
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .then(function (response) {
//       //console.log(response)
//     });
// });
    
          
//        it('put api test Cancel the group block', async function({supertest}) {
//         await supertest
//          .request(reservation.request)
//          .put(`/blk/v1/hotels/GRVXX/blocks/${BlockID}/status`)
//           .set('Content-Type', reservation['Content-Type1'])
//          .set('x-hotelid', reservation.hotelId)
//          .set('x-app-key', reservation['x-app-key'])
//          .set('bypass-routing', reservation['bypass-routing'])
//          .set('Authorization', 'Bearer ' + reservation.authToken1)
//         .send(
//             {
            
//           "xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/Receive/types",
//           "verificationOnly": false,
//           "changeBlockStatus": {
//             "hotelId": reservation.hotelId,
//             "blockId": {
//               "type": "Block",
//               "idContext": "OPERA",
//               "id": BlockID
//             },
//             "currentBlockStatus": reservation.currentBlockStatus,
//             "newBlockStatus": reservation.newBlockStatus,
//             "reservationType": reservation.reservationType,
//             "overbookAll": false,
//             "cancelAllPMReservations": false,
//             "applyChangesToCateringSatus": false,
//             "overrideEventsProcessingWarnings": false
//           }
//         }
//         ,)
//         .expect(200)
//           .expect('Content-Type', /json/)
//           .then(function(response){
//             //console.log(response)
            
//         }
        
//         );
          
//       });
//       //check multi Availability
//       it('GET Check Multi Availability', async function ({ supertest }) {
//         await supertest
//        .request(reservation.request)
//        .get(reservation.Getendpath2)
//        .query({
//          "roomStayStartDate": reservation.arrivalDate,
//          "roomStayEndDate": reservation.departureDate,
//          "hotelIds": reservation.hotelId,
//          "children": reservation.children,
//          "roomTypeInfo": true,
//          "adults": reservation.adults,
//          "ratePlanInfo": true,
//          "limit": reservation.limit,
//          "redeemAwards": false,
//          "roomStayQuantity": reservation.roomStayQuantity,
//          "initialRatePlanSet": true,
//          "resGuaranteeInfo": false
//        })
//        .set('x-hotelid', reservation.hotelId)
//        .set('x-app-key', reservation['x-app-key1'])
//        .set('bypass-routing', reservation['bypass-routing'])
//        .set('Authorization', 'Bearer ' + reservation.authToken1)
//        .expect(200)
//        .expect('Content-Type', /json/)
//        .then(function (response) {
//          // console.log(response)
//        });
//     })
    
//     // Check block availability
//     it(`Post API Test for check block availability`, async function({ supertest }) {
//       await supertest
//       .request(reservation.request)
//       .get(`/blk/v1/hotels/GRVXX/blocks/${BlockID}/availability`)
//       .query({
//           "rooms": 1,
//           "roomTypeCount": 1,
//           "children": 0,
//           "nights": 1,
//           "adults": 1,
//           "fetchAllocatedRoomType": "Allocated",
//           "overrideRateCode": false,
//           "arrivalDate": reservation.arrivalDate
          
//           })
      
//          .set('x-hotelid', reservation.hotelId)
//          .set('x-app-key', reservation['x-app-key'])
//          .set('bypass-routing', reservation['bypass-routing'])
//          .set('Authorization', 'Bearer ' + reservation.authToken1)
//          .expect(200)
//          .expect('Content-Type', /json/)
//          .then(function (response) {
//            // console.log(response)
//          });
//       });
//     //check validation
//     it('PUT API test Check Validation', async function ({ supertest }) {
//     await supertest
//        .request(reservation.request)
//        .put(reservation.Putendpath)
//        .set('Content-Type', reservation['Content-Type1'])
//        .set('x-hotelid', reservation.hotelId)
//        .set('x-app-key', reservation['x-app-key'])
//        .set('bypass-routing', reservation['bypass-routing'])
//        .set('Authorization', 'Bearer ' + reservation.authToken1)
//        .send(
//          {
//            "instructions": {
//              "instruction": [
//                "Packages",
//                "InventoryItems",
//                "ReservationGuarantee",
//                "StayHeader",
//                "RefreshRates"
//              ]
//            },
//            "reservation": {
//              "roomStay": {
//                "roomRates": {
//                  "rates": {
//                    "rate": {
//                      "base": {
//                        "amountBeforeTax": 179,
//                        "baseAmount": 179,
//                        "currencyCode": "USD"
//                      },
//                      "discount": "",
//                      "eventStartDate": reservation.startDate,
//                      "startDate": reservation.startDate,
//                      "start": reservation.startDate,
//                      "end": reservation.endDate,
//                      "endDate": reservation.endDate,
//                      "eventEndDate": reservation.endDate
//                    }
//                  },
//                  "stayProfiles": [
//                    {
//                      "reservationProfileType": "Company"
//                    },
//                    {
//                      "reservationProfileType": "Group"
//                    },
//                    {
//                      "reservationProfileType": "TravelAgent"
//                    },
//                    {
//                      "reservationProfileType": "ReservationContact"
//                    },
//                    {
//                      "reservationProfileType": "BillingContact"
//                    },
//                    {
//                      "reservationProfileType": "Source"
//                    }
//                  ],
//                  "guestCounts": {
//                    "adults": reservation.adults,
//                    "children": reservation.children
//                  },
//                  "taxFreeGuestCounts": {
//                    "adults": 0,
//                    "children": 0
//                  },
//                  "roomType": reservation.roomType,
//                  "ratePlanCode": reservation.ratePlanCode,
//                  "marketCode": reservation.marketCode,
//                  "sourceCode": reservation.sourceCode,
//                  "numberOfUnits": reservation.numberOfUnits,
//                  "pseudoRoom": false,
//                  "roomTypeCharged": reservation.roomTypeCharged,
//                  "eventStartDate": reservation.startDate,
//                  "startDate": reservation.startDate,
//                  "start": reservation.startDate,
//                  "end": reservation.endDate,
//                  "endDate": reservation.endDate,
//                  "eventEndDate": reservation.endDate
//                },
//                "guestCounts": {
//                  "adults": reservation.adults,
//                  "children": reservation.children
//                },
//                "expectedTimes": {
//                  "reservationExpectedArrivalTime": reservation.arrivalDate,
//                  "resExpectedArrivalTime": reservation.arrivalDate,
//                  "reservationExpectedDepartureTime": reservation.departureDate,
//                  "resExpectedDepartureTime": reservation.departureDate
//                },
//                "guarantee": {
//                  "guaranteeCode": reservation.guaranteeCode
//                },
//                "arrivalDate": reservation.arrivalDate,
//                "departureDate": reservation.departureDate
//              },
//              "hotelId": reservation.hotelId,
//              "preRegistered": false,
//              "allowMobileCheckout": false,
//              "overrideOutOfServiceCheck": true
//            },
//            "timeSpan": {
//              "startDate": reservation.startDate,
//              "endDate": reservation.endDate
//            }
//          }
//        )
//        .expect(200)
//        .expect('Content-Type', /json/)
//        .then(function (response) {
//          // console.log(response)
//        });
//       });  
    
    
    
//     //Create the reservation
//     it(`Post API Test for create the reservation`, async function({ supertest }) {
//         await supertest
//              .request(reservation.request)
//             .post(reservation.Postendpath)
//             .set('Content-Type', reservation['Content-Type1'])
//             .set('x-hotelid',  reservation.hotelId)
//             .set('x-app-key', reservation['x-app-key'])
//             .set('bypass-routing', reservation['bypass-routing'])
//             .set('Authorization', 'Bearer ' + reservation.authToken1)
//             .send({
//               "reservations": {
//                 "reservation": {
//                   "roomStay": {
//                     "roomRates": {
//                       "rates": {
//                         "rate": {
//                           "base": {
//                             "amountBeforeTax": "199",
//                             "baseAmount": "199"
//                           },
//                           "start": reservation.arrivalDate,
//                           "end": reservation.arrivalDate
//                         }
//                       },
//                       "stayProfiles": [
//                         {
//                           "reservationProfileType": "Company"
//                         },
//                         {
//                           "reservationProfileType": "Group"
//                         },
//                         {
//                           "reservationProfileType": "TravelAgent"
//                         },
//                         {
//                           "reservationProfileType": "ReservationContact"
//                         },
//                         {
//                           "reservationProfileType": "BillingContact"
//                         },
//                         {
//                           "reservationProfileType": "Source"
//                         }
//                       ],
//                       "guestCounts": {
//                         "adults": "1",
//                         "children": "0"
//                       },
//                       "reservationBlock": {
//                         "blockIdList": [
//                           {
//                             "type": "Block",
//                             "idContext": "OPERA",
//                             "id": BlockID
//                           },
//                           {
//                             "type": "BlockCode",
//                             "idContext": "OPERA",
//                             "id": reservation.blockcode
//                           }
//                         ]
//                       },
//                       "roomType": reservation.roomType,
//                       "marketCode": "Z",
//                       "sourceCode": "GD",
//                       "numberOfUnits": "1",
//                       "pseudoRoom": "false",
//                       "roomTypeCharged": reservation.roomTypeCharged,
//                       "start": reservation.startDate,
//                       "end": reservation.endDate
//                     },
//                     "guestCounts": {
//                       "adults": "1",
//                       "children": "0"
//                     },
//                     "expectedTimes": {
//                       "reservationExpectedArrivalTime": reservation.arrivalDate,
//                       "reservationExpectedDepartureTime": reservation.departureDate
//                     },
//                     "guarantee": {
//                       "guaranteeCode": "INN",
//                       "onHold": "false"
//                     },
//                     "arrivalDate": reservation.arrivalDate,
//                     "departureDate": reservation.departureDate
//                   },
//                   "reservationGuests": {
//                     "profileInfo": {
//                       "profileIdList": {
//                         "type": "Profile",
//                         "id": reservation.profileIdguest
//                       },
//                       "profile": {
//                         "customer": {
//                           "personName": [
//                             {
//                               "givenName": "Mahavignesh",
//                               "surname": "KP",
//                               "nameType": "Primary"
//                             },
//                             {
//                               "nameType": "Alternate"
//                             }
//                           ]
//                         },
//                         "addresses": {
//                           "addressInfo": {
//                             "address": {
//                               "isValidated": "false",
//                               "addressLine": [
//                                 "",
//                                 "",
//                                 "",
//                                 ""
//                               ],
//                               "country": {
//                                 "code": "US"
//                               },
//                               "type": "HOME"
//                             },
//                             "type": "Address",
//                             "id": reservation.addressId
//                           }
//                         }
//                       }
//                     }
//                   },
//                   "reservationProfiles": {
//                     "reservationProfile": [
//                       {
//                         "reservationProfileType": "Company"
//                       },
//                       {
//                         "profileIdList": {
//                           "type": "Profile",
//                           "idContext": "OPERA",
//                           "id": reservation.profileId
//                         },
//                         "reservationProfileType": "Group"
//                       },
//                       {
//                         "reservationProfileType": "TravelAgent"
//                       },
//                       {
//                         "reservationProfileType": "ReservationContact"
//                       },
//                       {
//                         "reservationProfileType": "Source"
//                       },
//                       {
//                         "reservationProfileType": "Addressee"
//                       }
//                     ]
//                   },
//                   "reservationPaymentMethods": [
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "paymentMethod": "CASH",
//                       "folioView": "1"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "2"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "3"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "4"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "5"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "6"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "7"
//                     },
//                     {
//                       "emailFolioInfo": {
//                         "emailFolio": "false"
//                       },
//                       "folioView": "8"
//                     }
//                   ],
//                   "cashiering": {
//                     "taxType": {
//                       "code": "",
//                       "collectingAgentTax": "false",
//                       "printAutoAdjust": "false"
//                     },
//                     "reverseCheckInAllowed": "false",
//                     "reverseAdvanceCheckInAllowed": "false"
//                   },
//                   "hotelId": reservation.hotelId,
//                   "reservationStatus": "Reserved",
//                   "customReference": "",
//                   "displayColor": "",
//                   "markAsRecentlyAccessed": "true",
//                   "preRegistered": "false",
//                   "allowMobileCheckout": "false",
//                   "overrideOutOfServiceCheck": "true"
//                 }
//               },
//               "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/CreateReservation/types"
//             }
            
//             )
            
    
//             .expect(201)
//             .expect("Content-Type", /json/)
//             .then(function (response) {
//                // console.log(response)
//                 const locationHeader = response.headers.location;
//                 const urlParts = locationHeader.split('/');
//                 reservationId = urlParts[urlParts.length - 1];
//                 console.log(`Reservation created successfully, Reservation ID: ${reservationId}`);
//             })
        
            
//     // // GET request in OHIP
//     it('GET Reservation  OHIP', async function ({ supertest }) {
//       await supertest
//           .request(reservation.request)
//           .get(reservation.Getendpath + reservationId)
//           .set('Content-Type', reservation['Content-Type1'])
//           .set('x-hotelid', reservation.hotelId)
//           .set('x-app-key', reservation['x-app-key1'])
//           .set('bypass-routing', reservation['bypass-routing'])
//           .set('Authorization', 'Bearer ' + reservation.authToken1)
//           .expect(200)
//           .expect('Content-Type', /json/)
//           .then(function (response) {
//            // console.log(response.text)
//               const responseBody = JSON.parse(response.text);
//               const reservation = responseBody.reservations.reservation[0];
    
//               const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
//               confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';
    
//               const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_HIEUAT');
//               externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';
    
//               console.log("Status : Reservation created Successfully in OHIP");
//               console.log("Reservation ID :", reservationId);
//               console.log('Confirmation ID:', confirmationId);
//               console.log('External Reference ID:', externalReferenceId);
//           })
//     });
//   // Get reservation Grs
//     it('GET Reservation  GRS', async function ({ supertest }) {
//       await supertest
//           .request(reservation.request2)
//           .get(reservation.Getendpath1 + externalReferenceId)
//           .query({
//               lastName: reservation.lastName
//           })
//           .set('Content-Length', '0')
//           .set('X-IHG-M2M', reservation['X-IHG-M2M'])
//           .set('User-Agent', reservation['User-Agent'])
//           .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
//           .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
//           .set('bypass-routing', reservation['bypass-routing'])
//           .set('Authorization', 'Bearer ' + reservation.authToken)
//           .expect(200)
//           .expect('Content-Type', /json/)
//           .then(function (response) {
//            // console.log(response)
//               const responseBody = JSON.parse(response.text);
//               const reservation = responseBody.hotelReservation;
    
//               const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
//               ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';
    
//               const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
//               externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';
    
//               const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
//               pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';
             
    
     
//              // console.log(response)
//               console.log("Status: Reservation created Successfully in GRS");
//               console.log("IHG Confirmation Number:", ihgConfirmationNumber);
//               console.log("External Confirmation Number:", externalConfirmationNumber);
//               console.log("PMS Confirmation Number:", pmsConfirmationNumber);
//               excelData.push([BlockID, reservationId, confirmationId, externalReferenceId, ihgConfirmationNumber, externalConfirmationNumber, pmsConfirmationNumber]);
//           });
//         });
//       });
     
//       after(function () {
//         const excelFilePath = path.join(filepath.exceloutputpath);
        
//         // Ensure the directory exists
//         const dir = path.dirname(excelFilePath);
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir, { recursive: true });
//         }
      
//         let wb;
//         let ws;
        
//         // Define a unique sheet name for each program
//         const sheetName = 'Block Flow1';  // Change this for each program (e.g., 'Program1', 'Program2', etc.)
      
//         // Use an object to map sheet names to their corresponding headers
//         const headersMap = {
//             'Block Flow1': ['BlockID', 'Reservation ID', 'Confirmation ID', 'External Reference ID', 'IHG Confirmation Number', 'External Confirmation Number', 'PMS Confirmation Number'],
            
//         };
      
//         // Get the appropriate headers for the current program from the map
//         const headers = headersMap[sheetName];
      
//         // Check if the Excel file exists
//         if (fs.existsSync(excelFilePath)) {
//             // If the file exists, read the workbook
//             wb = XLSX.readFile(excelFilePath);
      
//             // Check if the specific sheet for the program exists
//             if (wb.SheetNames.includes(sheetName)) {
//                 // Load the existing sheet
//                 ws = wb.Sheets[sheetName];
      
//                 // Convert the existing sheet to JSON format for easy manipulation
//                 let existingData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
//                 // Append new data to the existing sheet
//                 existingData.push(...excelData);
      
//                 // Log the data being appended for debugging
//              //   console.log("Data being appended:", existingData);
      
//                 // Convert the updated data back to a sheet
//                 ws = XLSX.utils.aoa_to_sheet(existingData);
      
//                 // Remove the old sheet
//                 wb.SheetNames = wb.SheetNames.filter(sheet => sheet !== sheetName);
//             } else {
//                 // If the sheet doesn't exist, create it and prepend headers
//                 let existingData = [];
//                 existingData.push(headers);  // Add headers for the new sheet
//                 existingData.push(...excelData);
      
//                 // Create a new sheet from the data
//                 ws = XLSX.utils.aoa_to_sheet(existingData);
//             }
//         } else {
//             // If the file doesn't exist, create a new workbook and sheet
//             wb = XLSX.utils.book_new();
      
//             let existingData = [];
//             existingData.push(headers);  // Add headers for the new sheet
//             existingData.push(...excelData);
      
//             // Create a new sheet from the data
//             ws = XLSX.utils.aoa_to_sheet(existingData);
//         }
      
//         // Append the updated or newly created sheet to the workbook
//         XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
//         // Save the updated workbook to the Excel file
//         XLSX.writeFile(wb, excelFilePath);
//        // console.log(`Data successfully saved to ${excelFilePath} under sheet: ${sheetName}`);
//       });
      
    
});