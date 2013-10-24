var tareaFuente = angular.module('tareaFuente', ['ngResource']);

tareaFuente.factory('Tarea', function($resource) {
	return $resource("/tarea/:tareaId", {"tareaId": "@_id"});
});
