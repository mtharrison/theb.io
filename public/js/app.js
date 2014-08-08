'use strict';

var onebio = angular.module('onebio', []);

onebio.config(['$routeProvider', function($routeProvider) {

	$routeProvider.
	when('/', {
		templateUrl: '/ng-templates/index.html',
		controller: 'IndexController'
	});

}]);

onebio.controller('IndexController', function() {});