var tareaListado = angular.module('tareaListado', ['tareaFuente']);

tareaListado.controller('TareaController', function TareaController($scope, Tarea) {
	$scope.cargando = true;
	$scope.guardando = 0;
	
	$scope.tareas = Tarea.query(function() {
		$scope.cargando = false;
	});
	
	$scope.agregarTarea = function(){
		var nuevaTarea = new Tarea({descripcion: $scope.tareaTexto, hecho: false});
		$scope.guardando += 1;
		nuevaTarea.$save(function(infoGuardada) {
			nuevaTarea._id = infoGuardada._id;
			$scope.guardando -= 1;
		});
		
		$scope.tareas.push(nuevaTarea);
		$scope.tareaTexto = "";
	};
	
	$scope.eliminar = function(tarea) {
		var indice = $scope.tareas.indexOf(tarea);
		if (indice != -1) {
			$scope.tareas.splice(indice, 1);
		}
		
		$scope.guardando += 1;
		tarea.$delete(function() {
			$scope.guardando -= 1;
		});
	};
	
	$scope.hechoCambiado = function(tarea) {
		$scope.guardando += 1;
		tarea.$save(function() {
			$scope.guardando -= 1;
		});
	};
	
	$scope.restantes = function() {
		var restante = 0;
		angular.forEach($scope.tareas, function(tarea) {
			restante += tarea.hecho ? 0 : 1;
		});
		
		return restante;
	};
});