var toDoList = angular.module('ToDoListApp', ['ngResource', 'ui', 'ngAnimate']);

toDoList.controller('ToDoListController', function($scope, $resource) {

  $scope.itemsList = [];
  $scope.view = 0;
  var username = 'robertpulson';
  var key = '931f31c345f441bf6953';
  var image = 'photo';

  $scope.addNewItem = function() {
    var search = getLastWordFrom($scope.newItem);
    var searchResource = $resource('http://pixabay.com/api/?', {username: username, key: key, q: search, image_type: image});
    searchResource.get(function (data) {
      pushToList({ goal:capitalize($scope.newItem), complete:false, imgSrc:data.hits[0].previewURL });
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
