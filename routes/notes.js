const router = require("express").Router();
let Note = require("../models/noteModel");

// READ
router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

// CREATE
router.route("/add").post((req, res) => {
  const newTitle = req.body.title;
  const newContent = req.body.content;

  const newNote = new Note({
    title: newTitle,
    content: newContent,
  });

  newNote
    .save()
    .then(() =>{res.json("Note added.")
  console.log("Note added");
  })
    .catch((err) => {res.status(400).json("Error: " + err)
  console.log(err);
  });
});

// UPDATE
router.route("/update/:id").patch((req, res) => {
  Note.findByIdAndUpdate(req.params.id)
    .then((note) => {
      note.title = req.body.title;
      note.content = req.body.content;

      note
        .save()
        .then(() => {res.json("Note Updated")
      console.log("Note Updated");
      })
        .catch((err) => {res.status(400).json("Error: " + err)
      console.log(err);
      });
    })
    .catch((err) =>{res.status(400).json("Error: " + err)
  console.log(err);
  });
});

// DELETE
router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {res.json("Note deleted.")
  console.log("Note Deleted");
  })
    .catch((err) =>{res.status(400).json("Error: " + err)
  console.log(err);
  });
});

module.exports = router;