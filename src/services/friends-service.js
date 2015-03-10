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
