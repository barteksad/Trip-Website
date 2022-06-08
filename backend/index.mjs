// eslint-disable-next-line no-unused-vars
const { Trips, Reservations, Users } = await import("./database.mjs");

import express from "express";
import cors from "cors";
import { Op } from "sequelize";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3333;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get("/trips", (req, res) => {
    console.log("/trips request!");
    getTrips().then((trips) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(trips));
    });
});

app.post("/signin",
    body("name").isLength({ min: 1 }),
	body("last_name").isLength({ min: 1 }),
	body("email").isEmail(),
	body("password").isLength({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
        console.log("/signin");
		const name = req.body.name;
		const last_name = req.body.last_name;
		const email = req.body.email;
		const password = req.body.password;
        
        try {
            const new_user = await Users.create({
                name: name,
                last_name: last_name,
				email: email,
				password: password,
            })

            await new_user.save();

            console.log("user created");
            console.log(new_user);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({id : new_user.id}));
        } catch(e) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({error : e}));
        }
})

app.listen(port, () => {
    console.log(`app listens on port ${port}`);
});
