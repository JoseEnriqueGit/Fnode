import express from "express";
import { engine } from "express-handlebars";

import { home, about, notFound, serverError } from "./lib/handlers.js";
import weatherMiddlware from "./lib/middleware/weather.js";

const app = express();
app.disable("x-powered-by");
app.set("view cache", true);

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
app.get("/", home);

app.get("/about", about);

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
