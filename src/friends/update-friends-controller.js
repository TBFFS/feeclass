app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    controller: 'UpdateFriendsCtrl',
    controllerAs: 'vm',
    templateUrl: 'friends/friends.html',
    resolve: {
      friend: ['friendsService', '$route', function (friendsService, $route) {
        return friendsService.getFriend($route.current.params.friendId);
      }]
    }
  };
  $routeProvider.when('/friends/:friendId/edit', routeDefinition)
}])
.controller('UpdateFriendsCtrl', ['$location', 'friend', 'friendsService', function ($location, friend, friendsService) {

  var self = this;

  self.friend = friend;

  console.log(self.friend);
  
  self.saveText = 'Save friend';

  self.saveFriend = function () {
    console.log(self.friendList);
    friendsService.updateFriend(self.friend).then(function () {
      self.goToData();
    })
  };

  self.removeFriend = function (id) {
    alert('delete');
    friendsService.removeFriend(id);
    self.goToData();
  };

  self.goToData = function () {
    $location.path('/data');
  };

}])
