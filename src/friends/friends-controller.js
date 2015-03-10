app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'FriendsCtrl',
    controllerAs: 'vm',
    templateUrl: 'friends/friends.html',
    resolve: {
      friends: ['friendsService', function (friendsService) {
        return friendsService.getFriendList();
      }]
    }
  };
  $routeProvider.when('/', routeDefinition).when('/friends', routeDefinition)
}]).controller('FriendsCtrl', ['Friend', 'friends', 'friendsService',
  function (Friend, friends, friendsService) {

  var self = this;

  self.friendList = friends;

  console.log(self.friendList);

  self.newFriend = Friend();

  self.addFriend = function () {
    console.log(self.newFriend);
    friendsService.addFriend(self.newFriend).then(function () {
      self.friendList.push(self.newFriend);
    })
  }

}])
