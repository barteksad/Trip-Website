import { Sequelize, DataTypes } from "sequelize";

// ssh -L 11212:lkdb:5432 bs429589@students.mimuw.edu.pl

const database = new Sequelize("bd", "bs429589", "iks", {
	host: "localhost",
	port: "11212",
    dialect: "postgres"
});

const Trips = database.define("Trips", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
	},
	short_description: {
		type: DataTypes.STRING,
	},
	image: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.INTEGER,
	},
	begin_date: {
		type: DataTypes.DATE,
	},
	end_date: {
		type: DataTypes.DATE,
		validate: {
			isAfterBeginning(value) {
				if (this.begin_date > value) {
					throw new Error("Data końca musi być po dacie początku!");
				}
			},
		},
	},
	available_places: {
		type: DataTypes.INTEGER,
		validate: {
			mustBePositive(value) {
				if (value < 1) {
					throw new Error(
						"Liczba dostępnych miejsc musi być dodatnia!"
					);
				}
			},
		},
	},
});

await Trips.sync({ force: true });

try {
	// Sprawdzenie poprawności połączenia (authenticate; co się dzieje, gdy błąd?)
	console.log("Nawiązuję połączenie z bazą...");
	await database.authenticate();

	console.log("Udało się.");

	// Jeśli modele zostały zmodyfikowane, to należy zmodyfikować tabele w bazie tak, by były zgodne.
	// Co się stanie z danymi? (sync)
	// console.log('Synchronizuję modele z zawartością bazy...');
	// Trips.hasMany(Registrations);
	await Trips.sync({force: true});
	// await Registrations.sync({force: true});
	console.log("Udało się.");
} catch (err) {
	console.log("Błąd podczas łączenia się z bazą danych!");
	console.log(err);
}

try {
  console.log("Zaczynam wstawiać ...");
  const trip1 = await Trips.build({
    id: 0,
    name: "Szczyt wszystkiego",
    description: "krótka wycieczka z wejściem na ten właśnie szczyt",
    short_description: "krótka z wejściem na szczyt",
    image: "https://www.waszaturystyka.pl/wp-content/uploads/2019/05/eba98af1fb28de58d1acc5b799bd7a50.jpg",
    price: 100,
    begin_date: new Date("2022.06.20"),
    end_date: new Date("2022.06.22"),
    available_places: 10,
  });

  await trip1.save();

  const trip2 = await Trips.build({
    name: "Dalekie morze",
    description: "bardzo ciekawa wycieczka do dalekich mórz",
    short_description: "nad morze!",
    image: "https://i.nocimg.pl/d9/389/146-wakacje-nad-morzem-zobacz-gdzie.jpg",
    price: 19191,
    begin_date: new Date("2022.07.20"),
    end_date: new Date("2022.08.22"),
    available_places: 200,
  });

  await trip2.save();

  console.log("Udało się wstawić!");
}catch (err) {
	console.log("Błąd podczas wstawiania do bazy danych!");
	console.log(err);
}

export { database, Trips };
