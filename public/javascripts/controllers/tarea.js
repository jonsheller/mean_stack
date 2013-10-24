var tareaListado = angular.module('tareaListado', ['tareaFuente']);

tareaListado.controller('TareaController', function TareaController($scope, Tarea) {
	$scope.tareas = Tarea.query();
	
	$scope.agregarTarea = function(){
		var nuevaTarea = new Tarea({descripcion: $scope.tareaTexto, hecho: false});
		nuevaTarea.guardando = true;
		nuevaTarea.$save(function(infoGuardada) {
			delete nuevaTarea.guardando;
			nuevaTarea._id = infoGuardada._id;
		});
		$scope.tareas.push(nuevaTarea);
		$scope.tareaTexto = "";
	};
	
	$scope.eliminar = function(tarea) {
		var indice = $scope.tareas.indexOf(tarea);
		if (indice != -1) {
			$scope.tareas.splice(indice, 1);
		}
		tarea.$delete();
	};
	
	$scope.hechoCambiado = function(tarea) {
		tarea.$save();
	};
	
	$scope.restantes = function() {
		var restante = 0;
		angular.forEach($scope.tareas, function(tarea) {
			restante += tarea.hecho ? 0 : 1;
		});
		
		return restante;
	};
});