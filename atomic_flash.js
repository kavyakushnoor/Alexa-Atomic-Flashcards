/* Using Alexa Skill with AWS Lambda, AWS DynamoDB and API Gateway to display flashcards on web browser. */
/*This is the first lambda function */

'use strict';
const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to Atomich flash. To see elements, Tell me an atomic number between 1 and 20 or, say all,  to see all elements.');
    },
    
    'ShowAllElementPicturesIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var elementPictureNumber = 0;
        
        var params = {
            TableName: "AtomicFlashcards",
            Key: {
                "pictureid": 0,
                
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues:{
                ":newImageNumber" : elementPictureNumber
            }
        };
        
        docClient.update(params, (() => {
        this.emit(':ask', 'These are all available 20 elements on Atomic Flash');    
        }));
        
        
    },
    
    'ShowElementPictureIntent': function () {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var elementPictureNumber = this.event.request.intent.slots.number.value;
        
        var arr12 = ['hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine','neon', 'sodium', 'magnesium', 'aluminum', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
        var params = {
            TableName: "ElementPictures",
            Key: {
                "pictureid": 0,
                
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues:{
                ":newImageNumber" : elementPictureNumber
            }
        };
        docClient.update(params, (() => {
            this.emit(':ask', 'element with atomic number ' + elementPictureNumber + ' is ' + arr12[elementPictureNumber-1]);
        }));
        
        
    },
    
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'you can ask for an element picture by saying the atomic numbers or say all to see all elements atomic flas web page');

    },
    'AMAZON.CancelIntent': function () {
        this.emit(':ask', 'Thank you for visiting atomic flash, have a good day');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':ask', 'Thank you for visiting atomic flash, have a good day');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
