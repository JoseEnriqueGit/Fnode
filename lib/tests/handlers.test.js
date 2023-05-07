// const { home, about, notFound, serverError } = require('../handlers')
// import { home, about, notFound, serverError } from "../handlers.js";

const fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

const getFortune = () => {
	const idx = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[idx];
};

const home = (req, res) => res.render("home");

const about = (req, res) =>
	res.render("about", { fortune: getFortune() });

const notFound = (req, res) => res.render("404");

const serverError = (err, req, res, next) => res.render("500");

test("home page renders", () => {
	const req = {};
	const res = { render: jest.fn() };
	home(req, res);
	expect(res.render.mock.calls[0][0]).toBe("home");
});
test("about page renders with fortune", () => {
	const req = {};
	const res = { render: jest.fn() };
	about(req, res);
	expect(res.render.mock.calls.length).toBe(1);
	expect(res.render.mock.calls[0][0]).toBe("about");
	expect(res.render.mock.calls[0][1]).toEqual(
		expect.objectContaining({
			fortune: expect.stringMatching(/\W/)
		})
	);
});

test("404 handler renders", () => {
	const req = {};
	const res = { render: jest.fn() };
	notFound(req, res);
	expect(res.render.mock.calls.length).toBe(1);
	expect(res.render.mock.calls[0][0]).toBe("404");
});

test("500 handler renders", () => {
	const err = new Error("some error");
	const req = {};
	const res = { render: jest.fn() };
	const next = jest.fn();
	serverError(err, req, res, next);
	expect(res.render.mock.calls.length).toBe(1);
	expect(res.render.mock.calls[0][0]).toBe("500");
});
