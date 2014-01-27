'use strict';

angular.module('bowlingApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.game = new Game();
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
    $scope.game.bowl(3);
  }]);
