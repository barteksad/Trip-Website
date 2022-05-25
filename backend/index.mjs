const { Trips } = await import('./database.mjs');

import express from "express";
import cors from "cors";
import { Op } from "sequelize";

const app = express();
const port = 3333;

app.use(cors())

const getTrips = async () => {
	let trips = await Trips.findAll({
		where: {
			begin_date: {
				[Op.gt]: new Date(),
			},
		},
		order: [["begin_date", "ASC"]],
	});
	return trips;
};

app.get('/trips', (req, res) => {
    console.log("/trips request!");
    getTrips().then((trips) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(trips));
        // res.json();
    });
})

app.listen(port, () => {
	console.log(`app listens on port ${port}`);
});