'use strict';

var onebio = angular.module('onebio', []);

onebio.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/', {
    templateUrl: '/ng-templates/index.html',
    controller: 'IndexController'
  });

}]);

onebio.controller('IndexController', function($scope, $http) {

  $scope.loggedIn = window.loggedIn;

  $scope.login = function() {

    $('#loginTwitter').button('loading');

    $http.get('/login')
    .success(function(data){
      window.location = "https://api.twitter.com/oauth/authenticate?oauth_token=" + data;
    });
  };

  if($scope.loggedIn){
    $http.get('/twitterBio')
    .success(function(data){
      $scope.twitterBio = data;
    })
  }

});
