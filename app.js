var express = require('express')
    fs = require('fs')
    md = require('marked')
var app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'jade')

app.get('/', function(req, res) {
    res.render('index', {page: 'index'})
})

app.get('/blog', function(req, res) {
    var result = [],
        dir = fs.readdirSync('public/md')

    for (var i in dir) {
		var stats = fs.statSync('public/md/' + dir[i])

        result[i] = {}
        result[i].title = fs.readFileSync('public/md/' + dir[i], 'utf8').split('\r')[0]
        result[i].file = dir[i].split('.')[0];
		result[i].date = dateFormat(stats.getUTCDate()) + '/' + dateFormat((stats.getMonth() + 1)) + '/' + stats.getUTCFullYear()
		result[i].hour = dateFormat(stats.getHours()) + ':' + dateFormat(stats.getMinutes()) + ':' + dateFormat(stats.getSeconds())
    }
    res.render('blog', {articles: result, page: 'blog'})
})

app.get('/blog/:article', function(req, res) {
    var article = fs.readFileSync('public/md/' + req.params.article + '.md', 'utf8')
		stats = fs.statSync('public/md/' + req.params.article + '.md').birthtime
	var date = dateFormat(stats.getUTCDate()) + '/' + dateFormat((stats.getMonth() + 1)) + '/' + stats.getUTCFullYear()
		hour = dateFormat(stats.getHours()) + ':' + dateFormat(stats.getMinutes()) + ':' + dateFormat(stats.getSeconds())

    res.render('article', {article: fs.readFileSync('public/md/' + req.params.article + '.md', 'utf8'), md: md, date: date, hour: hour, page: 'blog'})
})

app.listen(8080, function() {
    console.log('http://localhost:8080/')
})

var dateFormat = function(nb) {
	if (nb < 10)
		return '0' + nb.toString()
	else
		return nb.toString()
}
