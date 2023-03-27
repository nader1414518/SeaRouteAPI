const express = require("express");
const bodyParser = require("body-parser");
const searoute = require('searoute-js');

const app = express();

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