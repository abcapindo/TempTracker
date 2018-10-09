const express = require('express');
const app = express();
const intervalTrack = 3000;
const uuidv4 = require('uuid/v4');

var fs = require('fs');
var admin = require('firebase-admin');
var minTemp = { c : 93, f : 200}
var sentNotification = false;

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["../SmokeMeatErryDay/Adafruit_Python_MAX31855/examples/simpletest.py"]);

var serviceAccount = require('./adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smoker-temp-app.firebaseio.com"
});

app.use(express.static('dist/smokerTempApp'));

app.get('/fiveMinute', function(req, res) {
    fs.readFile('fiveMinute.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var myRe = /\*[C|F]/;
        let result = {c : [], f : []};
        let lines = data.split("\n");
        lines.forEach(line => {
            let arr = line.split(" ");
            arr = arr[1].split("/").map(str => str.replace(myRe,""));
            result.c.push(parseFloat(arr[0]));
            result.f.push(parseFloat(arr[1]));
        });

        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });   
});

app.get('/update', function (req, res) {
    fs.readFile('temperature.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var myRe = /\*[C|F]/;
        var arr = data.split(" ");
        arr = arr[1].split("/").map(str => str.replace(myRe,""));
        var result = {
            c : parseFloat(arr[0]),
            f : parseFloat(arr[1]) 
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });
});

function trackTemp() {
    readTempTxt().then(function(temp) {
        if (temp.f < minTemp.f) {
            if (!this.sentNotification) {
                sendNotification();
                this.sentNotification = true;
            }
        }
        else {
            this.sentNotification = false;
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getUser() {
    return new Promise(function(resolve, reject) {
        var db = admin.database();
        var ref = db.ref("/fcmTokens/");
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
            resolve(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            reject(errorObject.code);
        });   
    });
}

function sendNotification() {
    getUser().then(function(tokens) {
            for (token in tokens) {
                
            var registrationToken = tokens[token]; 
            var message = {
                notification: {
                    title: "Smoker Temp Tracker", 
                    body: "The temperature has fallen below " + minTemp.f 
                },
                token: registrationToken
            };

            if (!sentNotification) {
                admin.messaging().send(message).then((response) => {
                    console.log('Successfully sent message:', response);
                }).catch((error) => {
                    console.log('Error sending message:', error);
                });
                sentNotification = true;
            }
            else {
                sentNotification = false;
            }
        }

    }).catch(function(error) {
        console.log(error);
    });
}

function readTempTxt() {
    return new Promise(function(resolve, reject) {
        fs.readFile('temperature.txt', 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                var myRe = /\*[C|F]/;
                var arr = data.split(" ");
                arr = arr[1].split("/").map(str => str.replace(myRe,""));
                var result = {
                    c : parseFloat(arr[0]),
                    f : parseFloat(arr[1]) 
                };
                resolve(result);
            }
        });
    });
}

app.listen(3002, function() {
    console.log('Example app listening on port 3002!');
});

trackTemp();
// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["../SmokeMeatErryDay/Adafruit_Python_MAX31855/examples/simpletest.py"]);
setInterval(trackTemp, intervalTrack);