var mongoose = require('mongoose'),
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');

var noticias_schema = new Schema({
        titulo: String,
        descripcion: String,
        categoria: String,
        fecha: String,
        comentarios:  [{ autor: String, mensaje: String, fecha: String }]
    });
noticias_model = mongoose.model('noticias', noticias_schema,'noticias');

module.exports = {
        show_db: function(req,res){
        noticias_model.find({},function(err,items){
            if(!err){
              // res.secmdnd(items);
              res.render('index',{data: items});
                }else{
                  return console.log(err);
                }
              });
            },
        show: function(req,res){
              if(req.query._id == null){
            noticias_model.find({},function(err,items){
                if(!err){
                // res.secmdnd(items);
                res.send(items);
                }else{
                    return console.log(err);
                }
            });
        }else{
            noticias_model.findOne({_id: req.query._id},function(err,items){
                if(!err){
                    res.render('detalle',{data: items});
                }else{
                    return console.log(err);
                }
            }); 
        }
    },
        create: function(req,res){
        	var item = {
        		titulo: req.body.titulo,
        		descripcion: req.body.descripcion,
        		categoria: req.body.categoria,
            fecha: req.body.fecha
        	};
        	var nuevo = new noticias_model(item).save();
        	res.redirect('/news')
        },
        update: function(req,res){
        	noticias_model.findOne({_id: req.query._id},function(err,noticias){
        		noticias.titulo = req.query.titulo;
        		noticias.descripcion = req.query.descripcion;
        		noticias.categoria = req.query.categoria;
        		noticias.fecha = req.query.fecha;
            noticias.comentarios = req.query.comentarios;
            noticias.save();
        		res.redirect('/news');
        	});
        },
        delete: function(req,res){
        	noticias_model.findOne({_id: req.query._id}, function(err,noticias){
        		noticias.remove();
        		console.log('Se borró con éxito!');
            res.redirect("/news");
        	});
        },
        view_comment:function(req,res){
        noticias_model.findOne({_id: req.query._id},function(err,items){
            if(!err){
                res.render('crearComentario',{data: items});
            }else{
                return console.log(err);
            }
          }); 
        },
        create_comment: function(req,res){
        noticias_model.findOne({_id: req.body._id},function(err,noticias){
            noticias.comentarios = [
                {   autor: req.body.autor, 
                    mensaje: req.body.mensaje, 
                    fecha: req.body.fecha 
                }]
            noticias.save();
            res.redirect('/news');
        });
       },
        edit: function(req,res){
        noticias_model.findOne({_id: req.query._id},function(err,items){
            if(!err){
                res.render('editar',{data: items});
            }else{
                return console.log(err);
            }
          }); 
        },
    };