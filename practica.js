var express = require("express"),
app = express(),
bodyParser = require('body-parser'),
noticias = require('./models/prod');

app.use(bodyParser.json());//
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','jade');

app.get('/', function(req,res){
	res.send('Hola mundo');
})


app.get('/news', noticias.show_db);
app.get('/news_listar',noticias.show);
app.post('/news_crear',noticias.create);
app.get('/news_crear',function(req,res){
    res.render('crear');
});
app.post('/news_update',noticias.update);
app.post('/news_remove', noticias.delete);

//metodos añadidos

app.get('/news_detail',noticias.show);
app.get('/comment_create',noticias.view_comment);
app.post('/comment_create',noticias.create_comment);

app.get('/news_update',noticias.edit);

app.listen(9090, function(){
	console.log('Iniciando Practica');
});