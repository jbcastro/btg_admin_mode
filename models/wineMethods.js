var Wines = require("../models/wine.js");

exports.getAll = () => {
  return Wines.find({}, (err, result) => {
    if (err) {
      return err;
    }

    console.log(result);

    return result;
  });
};

exports.getOne = wine1 => {
  return Wines.findOne({ _id: wine1 }, (err, result) => {
    if (err) {
      return err;
    }
    console.log(result);
    return result;
  });
};

exports.addOne = (
  vinyard1,
  name1,
  grape11,
  grape21,
  grape31,
  grape41,
  grapes1,
  year1,
  place1,
  area1,
  country1,
  appellation1,
  description11,
  description21,
  description31,
  description41,
  description51,
  description61,
  description71,
  description81,
  description91,
  description101,
  description111,
  description121,
  description131,
  description141,
  funfact1,
  timestamp1,
  price1,
  mise1,
  lastUpdated1,

  color1,
  status1,
  picture1,
  coravin1
) => {
  return Wines.create(
    {
      vinyard: vinyard1,
      name: name1,
      grape1: grape11,
      grape2: grape21,
      grape3: grape31,
      grapes: grapes1,
      grape4: grape41,
      year: year1,
      place: place1,
      area: area1,
      country: country1,
      appellation: appellation1,
      description1: description11,
      description2: description21,
      description3: description31,
      description4: description41,
      description5: description51,
      description6: description61,
      description7: description71,
      description8: description81,
      description9: description91,
      description10: description101,
      description11: description111,
      description12: description121,
      description13: description131,
      description14: description141,
      funfact: funfact1,
      timestamp: timestamp1,
      price: price1,
      mise: mise1,

      color: color1,
      status: status1,
      lastUpadted: lastUpdated1,
      picture: picture1,
      coravin: coravin1
    },
    (err, result) => {
      if (err) throw err;
      return result;
    }
  );
};

exports.killOne = wine1 => {
  return Wines.findOne({ _id: wine1 }, (err, result) => {
    if (err) throw err;

    result.remove(function(err) {
      if (err) throw err;
      //console.log(wine1);
    });
  });
};
