import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import multiparty from "multiparty";

import {
	home,
	about,
	notFound,
	serverError,
	newsletter,
	newsletterSignup,
	newsletterSignupProcess,
	newsletterSignupThankYou,
	vacationPhotoContestProcess
} from "./lib/handlers.js";
import weatherMiddlware from "./lib/middleware/weather.js";

const app = express();
app.disable("x-powered-by");
app.set("view cache", true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure Handlebars view engine
app.engine(
	"handlebars",
	engine({
		defaultLayout: "main",
		helpers: {
			section: function (name, options) {
				if (!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	})
);
app.set("view engine", "handlebars");
app.set("views", "./views");

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(weatherMiddlware);

// ! routes
// home
app.get("/", home);

// about
app.get("/about", about);

// newletter
app.get("/newsletter", newsletter);
app.get("/newsletter-signup", newsletterSignup);
app.post("/newsletter-signup/process", newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", newsletterSignupThankYou);

// vacation photo contest

app.post("/contest/vacation-photo/:year/:month", (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err) return res.status(500).send({ error: err.message });
		vacationPhotoContestProcess(req, res, fields, files);
	});
});

// app.get("/contest/vacation-photo", vacationPhotoContest);
// app.get("/contest/vacation-photo-ajax", vacationPhotoContestAjax);
// app.post("/contest/vacation-photo/:year/:month", (req, res) => {
// 	const form = new multiparty.Form();
// 	form.parse(req, (err, fields, files) => {
// 		if (err) return vacationPhotoContestProcessError(req, res, err.message);
// 		console.log("got fields: ", fields);
// 		console.log("and files: ", files);
// 		vacationPhotoContestProcess(req, res, fields, files);
// 	});
// });
// app.get(
// 	"/contest/vacation-photo-thank-you",
// 	vacationPhotoContestProcessThankYou
// );
// app.post("/api/vacation-photo-contest/:year/:month", (req, res) => {
// 	const form = new multiparty.Form();
// 	form.parse(req, (err, fields, files) => {
// 		if (err) return api.vacationPhotoContestError(req, res, err.message);
// 		api.vacationPhotoContest(req, res, fields, files);
// 	});
// });

// custom 404 page
app.use(notFound);

// custom 500 page
app.use(serverError);

app.listen(port, () =>
	console.log(
		`Express started on http://localhost:${port}; ` +
			`press Ctrl-C to terminate.`
	)
);
