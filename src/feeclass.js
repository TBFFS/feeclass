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
