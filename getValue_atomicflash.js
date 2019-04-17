/* Using Alexa Skill with AWS Lambda, AWS DynamoDB and API Gateway to display flashcards on web browser. */
/*This is the second lambda function */

'use strict';
var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "AtomicFlashcards",
    Key: {
        "pictureid": 0
    }
};
var elementPictureToDisplay = "picture not set";

exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data){
        if(err) {
            return console.error("that didn't work");
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        elementPictureToDisplay = obj.Item.pictureToShow;
        
        callback(null, {"elementPicture":elementPictureToDisplay});
    });
    
};
