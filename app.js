var express = require('express')
    fs = require('fs')
var app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'jade')

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/blog', function(req, res) {
    var result = [],
        dir = fs.readdirSync('public/md')

    for (var i in dir) {
        result[i] = {}
        result[i].title = fs.readFileSync('public/md/' + dir[i], 'utf8').split('\r')[0]
        result[i].file = dir[i].split('.')[0];
    }
    res.render('blog', {articles: result})
})

app.get('/blog/:article', function(req, res) {
    res.render('article', {article: req.query.article + '.md'})
})

app.listen(8080, function() {
    console.log('http://localhost:8080/')
})
