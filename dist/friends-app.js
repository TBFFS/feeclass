var app = angular.module('app', ['ngRoute']);
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
(function () {
  app.directive('friendsList', function () {
    return {
      restrict: 'E',
      templateUrl: '/data/friends-list.html'
    }
  });
})();
$(function () {

  function redrawFriends() {
    $.getJSON('/api/friends').done(function (data) {
      $('.output').text(JSON.stringify(data));
    });
  }

  redrawFriends();

  $('.friend-form').submit(function () {
    var newFriend = {
      name: $('input[name=name]').val(),
      gender: $('input[name=gender]:checked').val()
    };

    $.ajax({
      type: "POST",
      url: '/api/friends',
      data: JSON.stringify(newFriend),
      contentType : 'application/json',
      dataType: 'json'
    }).done(redrawFriends);

    return false;
  });

});
app.factory('Friend', function () {
  return function (spec) {
    spec = spec || {};
    return {
      name: spec.name,
      address: spec.address,
      gender: spec.gender,
      birthDate: spec.birthDate,
      hair: spec.hair,
      birthCity: spec.birthCity
    };
  }
})
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

  self.saveText = 'Add Friend';

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
app.controller('NavCtrl', function () {
  console.log('test')
})
app.factory('friendsService', ['$http', '$log', function($http, $log) {
  function get (url) {
    return processAjaxPromise($http.get(url));
  }

  function post (url, friend) {
    return processAjaxPromise($http.post(url, friend));
  }

  function remove (url) {
    return processAjaxPromise($http.delete(url));
  }

  function update (url, friend) {
    return processAjaxPromise($http.put(url, friend));
  }

  function processAjaxPromise(p) {
    return p.then(function(result) {
      var data = result.data;
      return data;
    }).catch(function (error) {
      $log.log(error);
      throw error;
    });
  }

  return {
    getFriendList: function () {
      return get('/api/friends');
    },

    addFriend: function (friend) {
      return post('/api/friends', friend);
    },

    removeFriend: function (id) {
      return remove('/api/friends/' + id);
    },

    updateFriend: function (friend) {
      return update('/api/friends/' + friend._id, friend);
    },

    getFriend: function (id) {
      return get('/api/friends/' + id);
    }
  };

}]);
