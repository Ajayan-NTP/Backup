const fs = require('fs');
const supertest = require('supertest');




// Load the JSON data from the file
const jsonFilePath = 'C:/Users/Ajayan/NightWatch/nightwatch/Block_Flows/BLOCK_za/check.json';
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//console.log(testData);



let authToken1;
let BlockId ; 
let reservationId;
let authToken;
let externalReferenceId;
let pmsConfirmationNumber;
let externalConfirmationNumber;
let ihgConfirmationNumber;
describe('api Authu Token', function () {
    const reservation = testData.reservation;
    before(async function () {
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
                authToken1 = response.body.access_token;
                //console.log('Auth Token:', authToken1); // Logging the token
            });
     
              
    // Authenticate and set the second authToken before running tests
    // await supertest(reservation.request1)
    //     .post(reservation.Authendpath1)
    //     .set('X-IHG-M2M', reservation['X-IHG-M2M'])
    //     .set('User-Agent', reservation['User-Agent'])
    //     .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
    //     .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
    //     .set('Authorization', reservation.Authorization1)
    //     .send({
    //         username: reservation.username1,
    //     })
    //     .expect(200)
    //     .expect('Content-Type', /json/)
    //     .then(function (response) {
    //         authToken = response.body.access_token;
    //       // console.log(response)
    //     })
});

//create the group block
 it('post api test to create the group block', async function({supertest}) {
    await supertest
    .request(reservation.request)
    .post(reservation.Postendpath3)
    .set('Content-Type', reservation['Content-Type1'])
    .set('x-hotelid', reservation.hotelId)
    .set('x-app-key', reservation['x-app-key'])
    .set('bypass-routing', reservation['bypass-routing'])
    .set('Authorization', 'Bearer ' + authToken1)
      .send(
        {
          "blocks": {
            "blockInfo": {
              "block": {
                "blockDetails": {
                  "blockCode": "VX8",
                  "blockName": "Valid",
                  "timeSpan": {
                    "startDate": "2024-09-26",
                    "endDate": "2024-09-27"
                  },
                  "shoulderDates": "",
                  "blockStatus": {
                    "bookingStatus": {
                      "status": {
                        "code": "TEN"
                      }
                    }
                  },
                  "reservationType": {
                    "reservationType": "GT"
                  },
                  "marketCode": {
                    "marketCode": "Z"
                  },
                  "sourceOfSale": {
                    "sourceCode": {
                      "sourceCode": "GD"
                    }
                  },
                  "reservationMethod": "",
                  "bookingType": "",
                  "blockOrigin": "PMS",
                  "rateProtectionDetails": {
                    "criteria": "None"
                  },
                  "nonCompeteDetails": {
                    "criteria": "None"
                  },
                  "blockClassification": "RegularBooking",
                  "cateringOnlyBlock": "false",
                  "allowRateOverride": "false",
                  "manualCutOff": "false",
                  "wholesaleBlock": "false",
                  "controlBlockLocally": "false"
                },
                "blockOwners": {
                  "owner": [
                    {
                      "ownership": "Block",
                      "ownerCode": "ALL",
                      "primary": "true"
                    },
                    {
                      "ownership": "Catering",
                      "ownerCode": "ALL",
                      "primary": "true"
                    },
                    {
                      "ownership": "Rooms",
                      "ownerCode": "ALL",
                      "primary": "true"
                    }
                  ],
                  "lockBlockOwners": "false",
                  "lockRoomsOwners": "false",
                  "lockCateringOwners": "false"
                },
                "reservationDetails": {
                  "traceCode": "",
                  "breakfast": {
                    "breakfastIncluded": "false",
                    "price": ""
                  },
                  "porterage": {
                    "porterageIncluded": "false",
                    "price": ""
                  },
                  "elastic": "2",
                  "printRate": "true",
                  "housing": "true",
                  "controlBlockLocally": "false"
                },
                "catering": {
                  "cateringStatus": {
                    "bookingStatus": {
                      "status": ""
                    }
                  },
                  "eventAttendees": "",
                  "overrideEventsProcessingWarnings": "true"
                },
                "blockProfiles": {
                  "fullOverlay": "false"
                },
                "externalAttributes": {
                  "eventType": "Convention",
                  "rollEndDate": "false"
                },
                "hotelId": "GRVXX",
                "markAsRecentlyAccessed": "true"
              }
            }
          },
          "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/CreateGroupBlock/types"
        }
    )
    
    
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function(response){
       // console.log(response)
        const locationHeader = response.headers.location;
        console.log("Location Header: ", locationHeader);

        const urlParts = locationHeader.split('/');
        BlockId = urlParts[urlParts.length - 1];
        console.log("Block_ID: ", BlockId);
    });
      
  });
  
  it('PUT API Test to Update Block Inventory', async function ({supertest}) {
    await supertest
    .request(reservation.request)
        .put(`/blk/v1/hotels/GRVXX/blocks/${BlockId}/allocation`)
        .set('Content-Type', reservation['Content-Type1'])
        .set('x-hotelid', reservation.hotelId)
        .set('x-app-key', reservation['x-app-key1'])
        .set('bypass-routing', reservation['bypass-routing'])
        .set('Authorization', 'Bearer ' + authToken1)
        .send({
          "criteria": {
            "hotelId": "GRVXX",
            "blockId": {
              "type": "Block",
              "idContext": "OPERA",
              "id": BlockId
            },
            "allocationRoomTypes": {
              "allocationGridDates": [
                {
                  "roomAllocationInfo": {
                    "inventory": {
                      "forceOverbook": "false"
                    },
                    "rate": {
                      "onePerson": "199"
                    },
                    "start": "2024-09-26",
                    "end": "2024-09-26"
                  },
                  "allocation": "RATES"
                },
                {
                  "roomAllocationInfo": {
                    "inventory": {
                      "forceOverbook": "false",
                      "onePerson": "3"
                    },
                    "rate": "",
                    "start": "2024-09-26",
                    "end": "2024-09-26"
                  },
                  "allocation": "INITIAL"
                }
              ],
              "sellLimitGridDates": {
                "sellLimit": "3",
                "start": "2024-09-26",
                "end": "2024-09-26"
              },
              "roomType": "KNGN"
            },
            "genericRoomType": "false"
          },
          "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/Create_Group_Block_Inventory/types"
        }
        )
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
            //console.log(response)
        });
});

it('put api test Cancel the group block', async function({supertest}) {
    await supertest
     .request(reservation.request)
     .put(`/blk/v1/hotels/GRVXX/blocks/${BlockId}/status`)
      .set('Content-Type', reservation['Content-Type1'])
     .set('x-hotelid', reservation.hotelId)
     .set('x-app-key', reservation['x-app-key'])
     .set('bypass-routing', reservation['bypass-routing'])
     .set('Authorization', 'Bearer ' + authToken1)
    .send(
      {
        "verificationOnly": "false",
        "changeBlockStatus": {
          "hotelId": "GRVXX",
          "blockId": {
            "type": "Block",
            "idContext": "OPERA",
            "id": BlockId
          },
          "currentBlockStatus": "TEN",
          "newBlockStatus": "DEF",
          "reservationType": "GC",
          "overbookAll": "false",
          "cancelAllPMReservations": "false",
          "applyChangesToCateringSatus": "false",
          "overrideEventsProcessingWarnings": "false"
        },
        "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/Receive/types"
      }
    )
    .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response){
       //console.log(response)
        
    });

      });
      it('put api test update the payment type', async function({supertest}) {
        await supertest
         .request(reservation.request)
         .put(`/blk/v1/hotels/GRVXX/blocks/${BlockId}`)
          .set('Content-Type', reservation['Content-Type1'])
         .set('x-hotelid', reservation.hotelId)
         .set('x-app-key', reservation['x-app-key1'])
         .set('bypass-routing', reservation['bypass-routing'])
         .set('Authorization', 'Bearer ' + authToken1)
        .send({
          "blocks": {
            "responseInstructions": {
              "confirmationOnly": "true"
            },
            "blockIdList": {
              "type": "Block",
              "idContext": "OPERA",
              "id": BlockId
            },
            "blockDetails": {
              "blockCode": "VX8",
              "blockName": "Valid",
              "timeSpan": {
                "startDate": "2024-09-26",
                "endDate": "2024-09-27"
              },
              "blockDates": {
                "startDate": "2024-09-26",
                "endDate": "2024-09-27"
              },
              "shoulderDates": "",
              "blockStatus": {
                "bookingStatus": {
                  "status": {
                    "code": "DEF"
                  }
                }
              },
              "reservationType": {
                "reservationType": "GC"
              },
              "marketCode": {
                "marketCode": "Z"
              },
              "sourceOfSale": {
                "sourceCode": {
                  "sourceCode": "GD"
                }
              },
              "reservationMethod": "",
              "status": "O",
              "paymentMethod": {
                "code": "CASH"
              },
              "currencyCode": "USD",
              "blockClassification": "RegularBooking",
              "synchronized": "false",
              "cateringOnlyBlock": "false",
              "flexibleDates": "false",
              "autoloadContractGrid": "true",
              "allowRateOverride": "false",
              "manualCutOff": "false",
              "wholesaleBlock": "false",
              "controlBlockLocally": "true"
            },
            "blockOwners": {
              "owner": [
                {
                  "ownership": "Block",
                  "hotel": {
                    "code": "GRVXX"
                  },
                  "ownerCode": "ALL",
                  "profileId": {
                    "type": "Profile",
                    "idContext": "OPERA",
                    "id": "14466"
                  },
                  "name": {
                    "givenName": "Default Owner",
                    "surname": "HIEUAT"
                  },
                  "email": {
                    "email": ""
                  },
                  "primary": "true"
                },
                {
                  "ownership": "Rooms",
                  "hotel": {
                    "code": "GRVXX"
                  },
                  "ownerCode": "ALL",
                  "profileId": {
                    "type": "Profile",
                    "idContext": "OPERA",
                    "id": "14466"
                  },
                  "name": {
                    "givenName": "Default Owner",
                    "surname": "HIEUAT"
                  },
                  "email": {
                    "email": ""
                  },
                  "primary": "true"
                },
                {
                  "ownership": "Catering",
                  "hotel": {
                    "code": "GRVXX"
                  },
                  "ownerCode": "ALL",
                  "profileId": {
                    "type": "Profile",
                    "idContext": "OPERA",
                    "id": "14466"
                  },
                  "name": {
                    "givenName": "Default Owner",
                    "surname": "HIEUAT"
                  },
                  "email": {
                    "email": ""
                  },
                  "primary": "true"
                }
              ],
              "lockBlockOwners": "false",
              "lockRoomsOwners": "false",
              "lockCateringOwners": "false"
            },
            "reservationDetails": {
              "breakfast": {
                "breakfastIncluded": "false",
                "price": ""
              },
              "porterage": {
                "porterageIncluded": "false",
                "price": ""
              },
              "cutOffDays": "0",
              "updateGridOnCutoffChange": "false",
              "elastic": "2",
              "suppressRate": "false",
              "printRate": "true",
              "rateGuarantee": "false",
              "housing": "true",
              "guaranteeRequired": "false",
              "controlBlockLocally": "true"
            },
            "catering": {
              "cateringStatus": {
                "bookingStatus": {
                  "status": ""
                }
              },
              "eventAttendees": {
                "attendeesGuaranteed": "false"
              },
              "trackChanges": "false",
              "eventOrder": {
                "distributed": "false"
              },
              "pkgsTmplt": "false",
              "overrideEventsProcessingWarnings": "false"
            },
            "blockSecurity": {
              "securedFromDIDisplayYn": "false",
              "securedFromDIDisplay": "false",
              "securedFromDIdisplayYn": "false",
              "allDescriptionDDSecured": "false",
              "allDescriptionDDSecuredYn": "false",
              "ratesSecuredfromGNRYn": "false",
              "ratesSecuredfromGNR": "false",
              "ratesSecuredfromAllDisplays": "false",
              "ratesSecuredfromAllDisplaysYn": "false",
              "housingInformationSecured": "false",
              "housingInformationSecuredYn": "false",
              "returnOneDayAtTimeYn": "false",
              "commissionableYn": "false"
            },
            "externalAttributes": {
              "eventType": "Convention",
              "rollEndDate": "false"
            },
            "hotelId": "GRVXX",
            "markAsRecentlyAccessed": "true"
          },
          "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/UpdateGroupBlock/types"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
          //
         // console.log(response)
          
      });
    });
    it(`Post API Test for check block availability`, async function({ supertest }) {
        await supertest
        .request(reservation.request)
        .get(`/blk/v1/hotels/GRVXX/blocks/${BlockId}/availability`)
        .query({
          "rooms": 1,
      "roomTypeCount": -1,
      "children": 0,
      "nights": 1,
      "adults": 1,
      "fetchAllocatedRoomType": "Allocated",
      "overrideRateCode": false,
      "arrivalDate": "2024-09-26",
    }
        )
        
        //.set('Content-Type', reservation['Content-Type'])
           .set('x-hotelid', reservation.hotelId)
           .set('x-app-key', reservation['x-app-key'])
           .set('bypass-routing', reservation['bypass-routing'])
           .set('Authorization', 'Bearer ' + authToken1)
           .expect(200)
           .expect('Content-Type', /json/)
           .then(function (response) {
            // console.log(response)
           });
        });
        it('post api test to create the block rooming list', async function({supertest}) {
            await supertest
            .request(reservation.request)
            .post(`/blk/v1/blocks/${BlockId}/roomingList`)
            .set('Content-Type', reservation['Content-Type1'])
            .set('x-hotelid', reservation.hotelId)
            .set('x-app-key', reservation['x-app-key'])
            .set('bypass-routing', reservation['bypass-routing'])
            .set('Authorization', 'Bearer ' + authToken1)
              .send({
                "blockInfo": {
                  "hotelId": "GRVXX",
                  "blockIdList": [
                    {
                      "type": "Block",
                      "idContext": "OPERA",
                      "id": BlockId
                    },
                    {
                      "type": "BlockCode",
                      "idContext": "OPERA",
                      "id": "VX8"
                    }
                  ]
                },
                "reservations": {
                  "reservation": {
                    "roomingListSequence": "1",
                    "hotelReservation": {
                      "reservationIdList": {
                        "type": "Reservation",
                        "idContext": "OPERA",
                        "id": "-1"
                      },
                      "roomStay": {
                        "roomRates": {
                          "reservationBlock": {
                            "blockIdList": [
                              {
                                "type": "Block",
                                "idContext": "OPERA",
                                "id": BlockId
                              },
                              {
                                "type": "BlockCode",
                                "idContext": "OPERA",
                                "id": "VX8"
                              }
                            ],
                            "hotelId": "GRVXX"
                          },
                          "roomType": "KNGN",
                          "numberOfUnits": "1",
                          "start": "2024-09-26",
                          "end": "2024-09-27"
                        },
                        "guestCounts": {
                          "adults": "1",
                          "children": "0"
                        },
                        "expectedTimes": {
                          "reservationExpectedArrivalTime": "2024-09-26",
                          "reservationExpectedDepartureTime": "2024-09-27"
                        },
                        "guarantee": {
                          "guaranteeCode": "GC"
                        },
                        "arrivalDate": "2024-09-26",
                        "departureDate": "2024-09-27"
                      },
                      "reservationGuests": {
                        "profileInfo": {
                          "profile": {
                            "customer": {
                              "personName": [
                                {
                                  "givenName": "test",
                                  "surname": "ww",
                                  "nameType": "Primary"
                                },
                                {
                                  "nameType": "Alternate"
                                }
                              ]
                            },
                            "addresses": {
                              "addressInfo": {
                                "address": {
                                  "addressLine": [
                                    "",
                                    "",
                                    "",
                                    ""
                                  ],
                                  "country": ""
                                }
                              }
                            }
                          }
                        }
                      },
                      "reservationProfiles": {
                        "reservationProfile": [
                          {
                            "resProfileType": "Company",
                            "reservationProfileType": "Company"
                          },
                          {
                            "resProfileType": "Group",
                            "reservationProfileType": "Group"
                          },
                          {
                            "resProfileType": "TravelAgent",
                            "reservationProfileType": "TravelAgent"
                          },
                          {
                            "resProfileType": "ReservationContact",
                            "reservationProfileType": "ReservationContact"
                          },
                          {
                            "resProfileType": "Source",
                            "reservationProfileType": "Source"
                          },
                          {
                            "resProfileType": "BillingContact",
                            "reservationProfileType": "BillingContact"
                          },
                          {
                            "resProfileType": "Addressee",
                            "reservationProfileType": "Addressee"
                          }
                        ],
                        "commissionPayoutTo": "None"
                      },
                      "reservationPaymentMethods": [
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "paymentMethod": "CASH",
                          "folioView": "1"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "2"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "3"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "4"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "5"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "6"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "7"
                        },
                        {
                          "emailFolioInfo": {
                            "emailFolio": "false"
                          },
                          "folioView": "8"
                        }
                      ],
                      "cashiering": {
                        "taxType": {
                          "code": "0",
                          "collectingAgentTax": "false",
                          "printAutoAdjust": "false"
                        },
                        "reverseCheckInAllowed": "false",
                        "reverseAdvanceCheckInAllowed": "false"
                      },
                      "extSystemSync": "false",
                      "userDefinedFields": {
                        "characterUDFs": {
                          "name": "UDFC23"
                        }
                      },
                      "hotelId": "GRVXX",
                      "reservationStatus": "Reserved",
                      "preRegistered": "false",
                      "allowMobileCheckout": "false"
                    }
                  }
                },
                "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/CreateRoomingList_Opera/types"
              })
              .expect(201)
              .expect("Content-Type", /json/)
              .then(function (response) {
               console.log(response);
              });
        });
      //   it(`Post API Test for create the reservation`, async function({ supertest }) {
      //     await supertest
      //          .request(reservation.request)
      //         .post(reservation.Postendpath)
      //         .set('Content-Type', reservation['Content-Type1'])
      //         .set('x-hotelid',  reservation.hotelId)
      //         .set('x-app-key', reservation['x-app-key'])
      //         .set('bypass-routing', reservation['bypass-routing'])
      //         .set('Authorization', 'Bearer ' + authToken1)
      //         .send({
      //             "reservations": {
      //               "reservation": {
      //                 "roomStay": {
      //                   "roomRates": {
      //                     "rates": {
      //                       "rate": {
      //                         "base": {
      //                           "amountBeforeTax": 99,
      //                           "baseAmount": 99
      //                         },
      //                         "start": reservation.startDate,
      //                         "end": reservation.endDate
      //                       }
      //                     },
      //                     "stayProfiles": [
      //                       {
      //                         "reservationProfileType": "Company"
      //                       },
      //                       {
      //                         "reservationProfileType": "Group"
      //                       },
      //                       {
      //                         "reservationProfileType": "TravelAgent"
      //                       },
      //                       {
      //                         "reservationProfileType": "ReservationContact"
      //                       },
      //                       {
      //                         "reservationProfileType": "BillingContact"
      //                       },
      //                       {
      //                         "reservationProfileType": "Source"
      //                       }
      //                     ],
      //                     "guestCounts": {
      //                       "adults": 1,
      //                       "children": 0
      //                     },
      //                     "reservationBlock": {
      //                       "blockIdList": [
      //                         {
      //                           "type": "Block",
      //                           "idContext": "OPERA",
      //                           "id": BlockId
      //                         },
      //                         {
      //                           "type": "BlockCode",
      //                           "idContext": "OPERA",
      //                           "id": reservation.blockcode
      //                         }
      //                       ]
      //                     },
      //                     "roomType": reservation.roomType,
      //                     "marketCode": "G",
      //                     "sourceCode": "GD",
      //                     "numberOfUnits": 1,
      //                     "pseudoRoom": false,
      //                     "roomTypeCharged": reservation.roomTypeCharged,
      //                     "start": reservation.startDate,
      //                     "end": reservation.endDate
      //                   },
      //                   "guestCounts": {
      //                     "adults": 1,
      //                     "children": 0
      //                   },
      //                   "expectedTimes": {
      //                     "reservationExpectedArrivalTime": reservation.arrivalDate,
      //                     "reservationExpectedDepartureTime": reservation.departureDate
      //                   },
      //                   "guarantee": {
      //                     "guaranteeCode": "GC",
      //                     "onHold": false
      //                   },
      //                   "arrivalDate": reservation.arrivalDate,
      //                   "departureDate": reservation.departureDate
      //                 },
      //                 "reservationGuests": {
      //                   "profileInfo": {
      //                     "profileIdList": {
      //                       "type": "Profile",
      //                       "id": reservation.profileId
      //                     },
      //                     "profile": {
      //                       "customer": {
      //                         "personName": [
      //                           {
      //                             "givenName": reservation.givenName,
      //                             "surname": reservation.lastName,
      //                             "nameType": "Primary"
      //                           },
      //                           {
      //                             "nameType": "Alternate"
      //                           }
      //                         ]
      //                       },
      //                       "addresses": {
      //                         "addressInfo": {
      //                           "address": {
      //                             "isValidated": false,
      //                             "addressLine": [
      //                               "",
      //                               "",
      //                               "",
      //                               ""
      //                             ],
      //                             "country": "",
      //                             "type": "HOME"
      //                           },
      //                           "type": "Address",
      //                           "id": "48582"
      //                         }
      //                       }
      //                     }
      //                   }
      //                 },
      //                 "reservationProfiles": {
      //                   "reservationProfile": [
      //                     {
      //                       "reservationProfileType": "Company"
      //                     },
      //                     {
      //                       "profileIdList": {
      //                         "type": "Profile",
      //                         "idContext": "OPERA",
      //                         "id": reservation.profileId
      //                       },
      //                       "reservationProfileType": "Group"
      //                     },
      //                     {
      //                       "reservationProfileType": "TravelAgent"
      //                     },
      //                     {
      //                       "reservationProfileType": "ReservationContact"
      //                     },
      //                     {
      //                       "reservationProfileType": "Source"
      //                     },
      //                     {
      //                       "reservationProfileType": "Addressee"
      //                     }
      //                   ]
      //                 },
      //                 "reservationPaymentMethods": [
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "paymentMethod": "CASH",
      //                     "folioView": 1
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 2
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 3
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 4
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 5
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 6
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 7
      //                   },
      //                   {
      //                     "emailFolioInfo": {
      //                       "emailFolio": false
      //                     },
      //                     "folioView": 8
      //                   }
      //                 ],
      //                 "cashiering": {
      //                   "taxType": {
      //                     "code": "PRO",
      //                     "collectingAgentTax": false,
      //                     "printAutoAdjust": false
      //                   },
      //                   "reverseCheckInAllowed": false,
      //                   "reverseAdvanceCheckInAllowed": false
      //                 },
      //                 "hotelId": reservation.hotelId,
      //                 "reservationStatus": "Reserved",
      //                 "customReference": "",
      //                 "displayColor": "",
      //                 "markAsRecentlyAccessed": true,
      //                 "preRegistered": false,
      //                 "allowMobileCheckout": false,
      //                 "overrideOutOfServiceCheck": true
      //               }
      //             }
      //           })
              
      
      //         .expect(201)
      //         .expect("Content-Type", /json/)
      //         .then(function (response) {
      //             const locationHeader = response.headers.location;
      //             const urlParts = locationHeader.split('/');
      //             reservationId = urlParts[urlParts.length - 1];
      //             console.log(`Reservation created successfully, Reservation ID: ${reservationId}`);
      //         })
          
              
      // // // GET request
      // it('GET Reservation  OHIP', async function ({ supertest }) {
      //   await supertest
      //       .request(reservation.request)
      //       .get(reservation.Getendpath + reservationId)
      //       .set('Content-Type', reservation['Content-Type1'])
      //       .set('x-hotelid', reservation.hotelId)
      //       .set('x-app-key', reservation['x-app-key1'])
      //       .set('bypass-routing', reservation['bypass-routing'])
      //       .set('Authorization', 'Bearer ' + authToken1)
      //       .expect(200)
      //       .expect('Content-Type', /json/)
      //       .then(function (response) {
      //           const responseBody = JSON.parse(response.text);
      //           const reservation = responseBody.reservations.reservation[0];
      
      //           const confirmationIdEntry = reservation.reservationIdList.find(idEntry => idEntry.type === 'Confirmation');
      //           confirmationId = confirmationIdEntry ? confirmationIdEntry.id : 'Not found';
      
      //           const externalReferenceIdEntry = reservation.externalReferences.find(ref => ref.idContext === 'CRS_IHGSIT');
      //           externalReferenceId = externalReferenceIdEntry ? externalReferenceIdEntry.id : 'Not found';
      //        //   console.log(response)
      //           console.log("Status : Reservation created Successfully in OHIP");
      //           console.log("Reservation ID :", reservationId);
      //           console.log('Confirmation ID:', confirmationId);
      //           console.log('External Reference ID:', externalReferenceId);
      //       })
      // });
      // it('GET Reservation  GRS', async function ({ supertest }) {
      //   await supertest
      //       .request(reservation.request1)
      //       .get(reservation.Getendpath1 + externalReferenceId)
      //       .query({
      //           lastName: reservation.lastName
      //       })
      //       .set('Content-Length', '0')
      //       .set('X-IHG-M2M', reservation['X-IHG-M2M'])
      //       .set('User-Agent', reservation['User-Agent'])
      //       .set('X-IHG-AUTO', reservation['X-IHG-AUTO'])
      //       .set('X-IHG-API-KEY', reservation['X-IHG-API-KEY'])
      //       .set('bypass-routing', reservation['bypass-routing'])
      //       .set('Authorization', 'Bearer ' + authToken)
      //       .expect(200)
      //       .expect('Content-Type', /json/)
      //       .then(function (response) {
      //           const responseBody = JSON.parse(response.text);
      //           const reservation = responseBody.hotelReservation;
      
      //           const ihgConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.ihgConfirmationNumber);
      //           ihgConfirmationNumber = ihgConfirmationNumberEntry ? ihgConfirmationNumberEntry.ihgConfirmationNumber : 'Not found';
      
      //           const externalConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.externalConfirmationNumber && entry.externalConfirmationNumber.number);
      //           externalConfirmationNumber = externalConfirmationNumberEntry ? externalConfirmationNumberEntry.externalConfirmationNumber.number : 'Not found';
      
      //           const pmsConfirmationNumberEntry = reservation.reservationIds.confirmationNumbers.find(entry => entry.pmsConfirmationNumber);
      //           pmsConfirmationNumber = pmsConfirmationNumberEntry ? pmsConfirmationNumberEntry.pmsConfirmationNumber : 'Not found';
               
      
       
      //          // console.log(response)
      //           console.log("Status: Reservation created Successfully in GRS");
      //           console.log("IHG Confirmation Number:", ihgConfirmationNumber);
      //           console.log("External Confirmation Number:", externalConfirmationNumber);
      //           console.log("PMS Confirmation Number:", pmsConfirmationNumber);
      //       })
      // });
      // it('Get api test to get block details', async function ({ supertest }) {
      //   await supertest
      //     .request(reservation.request)
      //     .get(`/blk/v1/hotels/GRVXX/blocks/${BlockId}`)
      //    .set('Content-Type', reservation['Content-Type1'])
      //   .set('x-hotelid', reservation.hotelId)
      //   .set('x-app-key', reservation['x-app-key1'])
      //   .set('bypass-routing', reservation['bypass-routing'])
      //   .set('Authorization', 'Bearer ' + authToken1)
      //     .expect(200)
      //     .expect('Content-Type', /json/)
      //     .then(function (response) {
      //       console.log(response.text); // Output the raw response for debugging
            
      //       // Parse the response text into a JSON object
      //       const jsonResponse = JSON.parse(response.text);
            
      //       // Now access the fields safely
      //       const blockInfo = jsonResponse.blocks.blockInfo[0].block.blockDetails;
      //       const startDate = blockInfo.timeSpan.startDate;
      //       const endDate = blockInfo.timeSpan.endDate;
      //       const blockCode = blockInfo.blockCode;
      //       const currencyCode = blockInfo.currencyCode;
            
          
      //       // Print the extracted data
      //       console.log(`Start Date: ${startDate}`);
      //       console.log(`End Date: ${endDate}`);
      //       console.log(`Block Code: ${blockCode}`);
      //       console.log(`Currency Code: ${currencyCode}`);
            
      //     })
           
      //     });
      });
      //});
