const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
var wineMethods = require("./models/wineMethods");
var Wines = require("./models/wine");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
// app.get("/", require("./client/public/index"));

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
app.get("/", function(req, res) {
  res.render("/client/index", {});
});
app.get("/express_backend", (req, res, next) => {
  wineMethods
    .getAll()
    .then(items => {
      // res.sendFile("home", { wines: JSON.stringify(items) });
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.get("/express_backend/get/", (req, res, next) => {
  wineMethods
    .getOne(req.query._id)
    .then(items => {
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.get("/express_backend/delete", (req, res, next) => {
  wineMethods
    .killOne(req.query._id)
    .then(items => {
      res.send({ express: items });
    })
    .catch(err => {
      return next(err);
    });
});

app.put("/express_backend/add", (req, res, next) => {
  Wines.updateOne(
    {
      _id: req.body._id
    },
    {
      vinyard: req.body.vinyard,
      name: req.body.name,
      grape: req.body.grape,

      grapes: req.body.grapes,
      year: req.body.year,
      place: req.body.place,
      area: req.body.area,
      country: req.body.country,
      appellation: req.body.appellation,
      description: req.body.description,

      funfact: req.body.funfact,
      price: req.body.price,
      lastUpdated: Date.now(),
      mise: req.body.mise,

      color: req.body.color,
      status: req.body.status,
      picture: req.body.picture,
      coravin: req.body.coravin
    },
    (err, result) => {
      if (err) return next(err);
      res.json({ updated: result.nModified, _id: req.body._id });
    }
  );
});

app.post("/express_backend/add", (req, res, next) => {
  if (!req.body._id) {
    let wine = new Wines(
      // {
      //   _id: req.body._id
      // },
      {
        vinyard: req.body.vinyard,
        name: req.body.name,
        grape: req.body.grape,
        grapes: req.body.grapes,
        year: req.body.year,
        place: req.body.place,
        area: req.body.area,
        country: req.body.country,
        appellation: req.body.appellation,
        description: req.body.description,
        funfact: req.body.funfact,
        timestamp: Date.now(),
        price: req.body.price,
        mise: req.body.mise,
        lastUpdated: Date.now(),

        color: req.body.color,
        status: req.body.status,
        picture: req.body.picture,
        coravin: req.body.coravin
      }
    );
    // wine.save().then(item => res.json(item));
    wine.save((err, newWine) => {
      if (err) return next(err);
      return res.json({ updated: 0, _id: newWine._id });
    });
  } else {
    Wines.updateOne(
      { _id: req.body._id },
      {
        vinyard: req.body.vinyard,
        name: req.body.name,
        grape: req.body.grape,
        grapes: req.body.grapes,
        year: req.body.year,
        place: req.body.place,
        area: req.body.area,
        country: req.body.country,
        appellation: req.body.appellation,
        description: req.body.description,
        funfact: req.body.funfact,
        timestamp: Date.now(),
        price: req.body.price,
        mise: req.body.mise,
        lastUpdated: Date.now(),

        color: req.body.color,
        status: req.body.status,
        picture: req.body.picture,
        coravin: req.body.coravin
      },
      (err, result) => {
        if (err) return next(err);
        res.json({ updated: result.nModified, _id: req.body._id });
      }
    );
  }
});
