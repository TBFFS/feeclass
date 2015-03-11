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
}]).controller('DataCtrl', ['$location', 'friends', 'friendsService', function ($location, friends, friendsService) {
  var self = this;
  self.friendList = friends;

  self.removeFriend = function (id) {
    console.log(id)
    friendsService.removeFriend(id).then(function () {
      for (var i = 0; i < self.friendList.length; ++i) {
        if (self.friendList[i]._id === id) {
          self.friendList.splice(i, 1);
        }
      }
    })
  };

  self.goToEdit = function (id) {
    $location.path('/friends/' + id + '/edit');
    console.log(id);
  };


}]);
