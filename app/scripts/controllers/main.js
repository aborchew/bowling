'use strict';

angular.module('bowlingApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.game = new Game();

    $scope.checkPins = function(pins) {
      if($scope.game.frames[$scope.game.frames.length-1].length == 1) {
        if($scope.game.frames[$scope.game.frames.length-1][0] + pins <= 10) {
          return false;
        } else if($scope.game.frames[$scope.game.frames.length-1][0] !== 10) {
          return true;
        }
      }
    }

  }]);
