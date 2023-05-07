import express from 'express';
import { engine } from 'express-handlebars';
import getFortune from './lib/fortune.js';

const app = express()

// configure Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const port = process.env.PORT || 3000

app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'))

// !

app.get('/about', (req, res) => {
  res.render('about', { fortune: getFortune() } )
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))