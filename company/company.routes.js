const Company = require("./schemes/company.scheme");

module.exports = function (app) {
  app.post("/api/company", (req, res) => {
    if (!req.body || !req.body.name)
      return res.status(400).send("You need to at least send a name");
    let companyInstace = new Company(req.body);
    companyInstace
      .save()
      .catch((err) => {
        res.status(500).send("");
      })
      .then((dbRes) => {
        res.json(dbRes);
      });
  });

  app.get("/api/company", (req, res) => {
    Company.find()
      .catch((err) => {
        res.status(500).send(err.toString());
      })
      .then((dbres) => {
        res.json(dbres);
      });
  });

  app.get("/api/company/:id", (req, res) => {
    let id = req.params.id;
    Company.findById(id)
      .catch((err) => {
        res.status(500).send(err.toString());
      })
      .then((dbres) => {
        res.json(dbres);
      });
  });

  app.delete("/api/company/:id", (req, res) => {
    let idToDelete = req.params.id;
    Company.findByIdAndRemove(idToDelete)
      .catch((err) => {
        res.status(500).send(err.toString());
      })
      .then((dbres) => {
        if (dbres) res.json(dbres);
        else res.status(404).send("ID doesn't exist");
      });
  });

  app.put("/api/company/:id", (req, res) => {
    let idToUpdate = req.params.id;

    if (!req.body || !req.body.name)
      return res.status(400).send("You need to at least send a name");

    Company.findByIdAndUpdate(idToUpdate, req.body, { new: true })
      .catch((err) => {
        res.status(500).send(err.toString());
      })
      .then((dbres) => {
        res.json(dbres);
      });
  });
};
