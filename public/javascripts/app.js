var toDoList = angular.module('ToDoListApp', ['ngResource', 'ui', 'ngAnimate', 'ngRoute', 'LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
 localStorageServiceProvider.setPrefix('ls');
}])
.config(function ($routeProvider) {
   $routeProvider
     .when('/', {
       templateUrl: 'views/main.html',
       controller: 'MainCtrl'
     })
     .when('/about', {
       templateUrl: 'views/about.html',
       controller: 'AboutCtrl'
     })
     .otherwise({
       redirectTo: '/'
     });
 });

'use strict';

toDoList.controller('ToDoListController', function($scope, $resource, localStorageService) {

  var itemsList = localStorageService.get('itemsList');
  $scope.itemsList = itemsList || [];
  $scope.$watch('itemsList', function() { localStorageService.set('itemsList', $scope.itemsList); }, true)

  $scope.view = 0;
  var username = 'robertpulson';
  var key = '931f31c345f441bf6953';
  var image = 'photo';
  var defaultPhoto = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSWGPhSKKBivkGsqr2qwJJAsXQ_fgm7oVyYIVWMOkfxYLA0IXgprw'

  $scope.addNewItem = function() {
    var search = getLastWordFrom($scope.newItem);
    var searchResource = $resource('http://pixabay.com/api/?', {username: username, key: key, q: search, image_type: image});
    searchResource.get(function (data) {
      if (data.hits[0] == null) {
        pushToList({ goal:capitalize($scope.newItem), complete:false, imgSrc:defaultPhoto });  
      } else {
        pushToList({ goal:capitalize($scope.newItem), complete:false, imgSrc:data.hits[0].previewURL });
      }
      $scope.newItem = '';
    })
  };

  function pushToList(item) {
    $scope.itemsList.push(item);
  };

  $scope.changeView = function(newView) {
    $scope.view = newView;
  };

  $scope.markAsComplete = function(index) {
    if ($scope.itemsList[index].complete == true) { $scope.itemsList[index].complete = false; } 
    else { $scope.itemsList[index].complete = true; }
  };

  $scope.checkComplete = function(index) {
    return $scope.itemsList[index].complete;
  };

  $scope.clearAll = function() {
    $scope.itemsList = [];
    $scope.itemImages = [];
  };

  function capitalize(string) {
    return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
  };

  function getLastWordFrom(string) {
    return string.split(' ').pop();
  };

});
