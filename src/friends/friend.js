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
