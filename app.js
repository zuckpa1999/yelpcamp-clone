const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
const Review = require('./models/review');
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')
const session = require('express-session')
const flash = require('connect-flash')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
const sessionConfig = {
	secret: 'thisshouldbeabettersecret',
	reave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 ^ 60 ^ 24 * 7
	}

}
app.use(session(sessionConfig))
app.use(flash())

app.use((req, res, next) => {
	res.locals.success = req.flash('success')
	res.locals.error = req.flash('error')
	next()
})


app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
	res.render('home')
});
// app.get('/campgrounds', catchAsync(async (req, res) => {
// 	const campgrounds = await Campground.find({});
// 	res.render('campgrounds/index', { campgrounds })
// }));

// app.get('/campgrounds/new', (req, res) => {
// 	res.render('campgrounds/new');
// })


// app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
// 	// if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
// 	const campground = new Campground(req.body.campground);
// 	await campground.save();
// 	res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.get('/campgrounds/:id', catchAsync(async (req, res, ) => {
// 	const campground = await Campground.findById(req.params.id).populate('reviews');
// 	res.render('campgrounds/show', { campground });
// }));

// app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
// 	const campground = await Campground.findById(req.params.id)
// 	res.render('campgrounds/edit', { campground });
// }))

// app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
// 	const { id } = req.params;
// 	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
// 	res.redirect(`/campgrounds/${campground._id}`)
// }));

// app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
// 	const { id } = req.params;
// 	await Campground.findByIdAndDelete(id);
// 	res.redirect('/campgrounds');
// }));


app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!'
	res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
	console.log('Serving on port 3000')
})