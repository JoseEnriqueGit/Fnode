import getFortune from "./fortune.js";

const VALID_EMAIL_REGEX = new RegExp(
	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
		"[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
		"(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
);

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
	const name = req.body.name || "";
		const email = req.body.email || "";
	// input validation
	if (!VALID_EMAIL_REGEX.test(email)) {
		req.session.flash = {
			type: "danger",
			intro: "Validation error!",
			message: "The email address you entered was not valid."
		};
		return res.redirect(303, "/newsletter-signup");
	}
	// NewsletterSignup is an example of an object you might create; since
	// every implementation will vary, it is up to you to write these
	// project-specific interfaces.  This simply shows how a typical
	// Express implementation might look in your project.
	new newsletterSignup({ name, email })
		.save()
		.then(() => {
			req.session.flash = {
				type: "success",
				intro: "Thank you!",
				message: "You have now been signed up for the newsletter."
			};
			return res.redirect(303, "/newsletter-archive");
		})
		.catch((err) => {
			req.session.flash = {
				type: "danger",
				intro: "Database error!",
				message: "There was a database error; please try again later."
			};
			return res.redirect(303, "/newsletter-archive");
		});
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
