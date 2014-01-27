'use strict';

angular.module('bowlingApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.game = new Game();

  }]);
