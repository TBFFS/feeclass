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
}]).controller('DataCtrl', ['friends', function (friends) {
  console.log('fasd');
  var self = this;
  self.friendList = friends;
  console.log(self.friends);
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

  self.newFriend = Friend();

  self.addFriend = function () {
    console.log(self.newFriend);
    friendsService.addFriend(self.newFriend).then(function () {
      self.goToData();
    })
  }

  self.goToData = function () {
    $location.path('/data');
  }

}])
app.controller('NavCtrl', function () {
  console.log('test')
})
app.factory('friendsService', ['$http', '$log', function($http, $log) {
  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, friend) {
    return processAjaxPromise($http.post(url, friend));
  }

  function remove (url, friend) {
    return processAjaxPromise($http.delete(url, friend));
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

    removeFriend: function (friend) {
      return remove('/api/friends', friend);
    }
  };

}]);
