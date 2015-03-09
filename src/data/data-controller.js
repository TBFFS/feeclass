app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/data', {
    controller: 'DataCtrl',
    controllerAs: 'vm',
    templateUrl: 'data/data.html',
    resolve: {
      friends: ['friendsService', function (friendsService) {
        return friendsService.getFriendList();
      }]
    }
  });
}]).controller('DataCtrl', ['friends', '$scope', function (friends, $scope) {
  console.log('fasd');
  var self = this;
  self.friendList = friends;
  console.log(self.friends);
}]);
