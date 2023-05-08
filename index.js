import express from "express";
import { engine } from "express-handlebars";

// eslint-disable-next-line semi
import { home, about, notFound, serverError } from "./lib/handlers.js";

const app = express();
app.disable('x-powered-by')

// configure Handlebars view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

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
