const express = require('express');

const app = express();

const mongoose = require('mongoose');

const Article = require('./models/article') // pulling article model

const articleRouter = require('./routes/articles');


const methodOverride = require('method-override')

// conneting to the DB

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useCreateIndex: true
});

// this view engine code will convert ejs code to html

app.set('view engine', 'ejs');


// access to article form inside article route
app.use(express.urlencoded({ extended: false}));


app.use(methodOverride('_method'));

app.get('/', async (req, res) => {

    // creating articles to array to display on the page
    // const articles = [{
    //     title: 'Test Article',
    //     createdAt: new Date(),
    //     description: 'Test Description'
    // },
    // {
    //     title: 'Test Article 2',
    //     createdAt: new Date(),
    //     description: 'Test Description 2'
    // }]

    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', {articles: articles});
});

app.use('/articles', articleRouter);


app.listen(5000);