/* eslint-disable n/handle-callback-err */
import getFortune from "./fortune.js";

export const home = (req, res) => res.render("home");

export const about = (req, res) =>
	res.render("about", { fortune: getFortune() });

export const notFound = (req, res) => res.render("404");

export const serverError = (err, req, res, next) => res.render("500");

export const newsletterSignup = (req, res) => {
	// we will learn about CSRF later...for now, we just
	// provide a dummy value
	res.render("newsletter-signup", { csrf: "CSRF token goes here" });
};
export const newsletterSignupProcess = (req, res) => {
	console.log("Form (from querystring): " + req.query.form);
	console.log("CSRF token (from hidden form field): " + req.body._csrf);
	console.log("Name (from visible form field): " + req.body.name);
	console.log("Email (from visible form field): " + req.body.email);
	res.redirect(303, "/newsletter-signup/thank-you");
};
export const newsletterSignupThankYou = (req, res) =>
	res.render("newsletter-signup-thank-you");

export const newsletter = (req, res) => {
	// we will learn about CSRF later...for now, we just
	// provide a dummy value
	res.render("newsletter", { csrf: "CSRF token goes here" });
};

export const api = {
	newsletterSignup: (req, res) => {
		console.log("CSRF token (from hidden form field): " + req.body._csrf);
		console.log("Name (from visible form field): " + req.body.name);
		console.log("Email (from visible form field): " + req.body.email);
		res.send({ result: "success" });
	}
};

export const vacationPhotoContestProcess = (req, res, fields, files) => {
	console.log("field data: ", fields);
	console.log("files: ", files);
	res.redirect(303, "/contest/vacation-photo-thank-you");
};
