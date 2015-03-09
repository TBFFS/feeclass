app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'FriendsCtrl',
    controllerAs: 'vm',
    templateUrl: 'friends/friends.html'
    // resolve: {
    //   friends: ['friendsService', function (friendsService) {
    //     friendsService.get()
    //   }]
    // }
  };
  $routeProvider.when('/', routeDefinition).when('/friends', routeDefinition)
}]).controller('FriendsCtrl', ['Friend', 'friendsService', function (Friend, friendsService) {
  console.log('hey');

  var self = this;

  self.newFriend = Friend();

  self.addFriend = function () {
    friendsService.addFriend(self.newFriend);
  }

}])
