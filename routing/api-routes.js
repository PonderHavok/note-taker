const fs = require("fs");

module.exports = function (app) {
  let noteinfo = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  app.get("/api/notes", (req, res) => {
    return res.json(noteinfo);
  });

  app.post("/api/notes", (req, res) => {
    let lastId;
    if (noteinfo.length) {
      lastId = Math.max(...noteinfo.map((note) => note.id));
      
    } else {
      lastId = 0;
    }

    const id = lastId + 1;
    noteinfo.push({ id, ...req.body });
    res.json(noteinfo.slice(-1));
  });

  app.delete("/api/notes/:id", (req, res) => {
    let deletedNote = noteinfo.find(
      ({ id }) => id === JSON.parse(req.params.id)
    );

    noteinfo.splice(noteinfo.indexOf(deletedNote), 1);
    res.end("All Gone!");
  });
};
