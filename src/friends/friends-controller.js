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
}])
.controller('FriendsCtrl', ['$location', 'Friend', 'friends', 'friendsService', function ($location, Friend, friends, friendsService) {

  var self = this;

  self.friendList = friends;

  console.log(self.friendList);

  self.friend = Friend();

  self.saveFriend = function () {
    console.log(self.friendList);
    friendsService.addFriend(self.friend).then(function () {
      self.goToData();
    })
  };

  self.removeFriend = function (id) {
    alert('delete');
    friendsService.removeFriend(id);
  };

  self.goToData = function () {
    $location.path('/data');
  };

}])
