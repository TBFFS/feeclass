(function () {
  console.log('heyfasdf')
  app.directive('friendsList', function () {
    return {
      restrict: 'E',
      templateUrl: '/data/friends-list.html'
    }
  });
})();
