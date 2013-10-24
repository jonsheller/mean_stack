var tareaModel = require('../models/tarea').TareaModel;

var jsonCallback = function(res) {
	return function(err, objs) {
		if (err) {
			res.json(err);
		} else {
			res.json(objs);
		}
	};
};

var tareasListado = function(req, res) {
	tareaModel.find(jsonCallback(res));
};

var tarea = function(req, res) {
	tareaModel.findById(req.params.id, jsonCallback(res)); 
};

var exito = function(res) {
	return function(err, obj) {
		if (err) {
			res.json(err);
		} else {
			res.json(obj);
		}
	};
};

agregarTarea = function(req, res) {
	var tarea = new tareaModel();
	tarea.descripcion = req.body.descripcion;
	tarea.hecho = req.body.hecho;
	tarea.save(exito(res));
};

eliminarTarea = function(req, res) {
	tareaModel.findByIdAndRemove(req.params.id, exito(res));
};

modificarTarea = function(req, res) {
	tareaModel.findById(req.params.id, function(err, tarea) {
		if (err) {
			res.json(err);
		} else {
			tarea.descripcion = req.body.descripcion;
			tarea.hecho = req.body.hecho;
			tarea.save(exito(res));
		}
	});
};

exports.agregarRutas = function(app, prefix) {
	app.get(prefix, tareasListado);
	app.get(prefix + '/:id', tarea);
	app.post(prefix, agregarTarea);
	app.delete(prefix + '/:id', eliminarTarea);
	app.post(prefix + '/:id', modificarTarea);
};