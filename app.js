const express = require("express");
const bodyParser = require("body-parser");
const searoute = require('searoute-js');
const cors = require("cors");

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   next();
// });

app.use(cors({
  origin: "*",//Hardcoded string of your coming request path or regex for check in string,
  //Like this: "http://frontend.mydomain.com" or /frontend.mydomain.com/
  credentials: true //Allow the server to get cookies and other auth data from other 
  // domains and ports
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, }));

app.post('/GetRoute', (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        const origin = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": data.InitPos.coordinates,
            },
        };
        const dest = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": data.DestPos.coordinates,
            },
        };

        const route = searoute(origin, dest);

        res.status(200).json({
            result: true,
            message: "Data retrieved successfully ... ",
            data: route,
        });
    } catch (error) {
        res.status(200).json({
            result: false,
            message: error,
            data: null,
        });
    }
});

const PORT = process.env.PORT || 3034;

var server = app.listen(PORT, () => {
    console.log(`Server is running on http://${server.address().address}:${PORT}`);
});