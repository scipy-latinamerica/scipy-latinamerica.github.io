
;(function() {
  app = angular.module('scipyla.redirect', []);

  app.controller('ClockCtl', function($scope) {
    $scope.clock = { count: Number.parseInt($('#clock').text())};
    // TODO: i18n
    $scope.lang = 'es';
    setInterval(function() {
      $scope.$apply(function() {
        count = --$scope.clock.count;
        if (count <= 0) {
          window.location.href = './' + $scope.lang;
        }
      });
    }, 1000);
  });
})()


