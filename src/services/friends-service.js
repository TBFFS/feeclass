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

    updateFriend: function (id) {
      return update('/api/friends/' + id, friend);
    },

    getFriend: function (id) {
      return get('/api/friends/' + id);
    }
  };

}]);
