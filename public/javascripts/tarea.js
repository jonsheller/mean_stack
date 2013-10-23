function TareaController($scope) {
	$scope.tareas = [];
	
	$scope.agregarTarea = function(){
		$scope.tareas.push({descripcion: $scope.tareaTexto, hecho: false});
		$scope.tareaTexto = "";
	};
	
	$scope.eliminar = function(tarea) {
		var indice = $scope.tareas.indexOf(tarea);
		if (indice != -1) {
			$scope.tareas.splice(indice, 1);
		}
	};
	
	$scope.restantes = function() {
		var restante = 0;
		angular.forEach($scope.tareas, function(tarea) {
			restante += tarea.hecho ? 0 : 1;
		});
		
		return restante;
	};
}