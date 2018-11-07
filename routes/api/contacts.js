const express = require("express");
const router = express.Router();
const uuidv1 = require("uuid/v1");

// Importing user model
const Contact = require("../../models/Contacts");

// @route GET api/users/test
// @desc Tests Users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "User data works!!" }));

// @route GET api/users/contacts
// @desc get all contacts
// @access
router.get("/contacts", (req, res) =>
  Contact.find({}, function(err, users) {
    res.json(users);
  })
);

// @route GET api/users/contacts
// @desc get one contact
// @access
router.get("/contacts/:id", (req, res) =>
  Contact.findById(req.params.id, function(err, users) {
    res.json(users);
  })
);

// @route POST api/contact/add
// @desc To add contacts
// @access Public
router.post("/contacts", (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city
  });

  newContact.save().then(contact => res.send(contact));
});

// @route GET api/users/test
// @desc Tests Users route
// @access Public
router.delete("/contacts/delete/:id", (req, res) => {
  Contact.findByIdAndRemove({ _id: req.params.id }).then(del => res.send(del));
});

// @route GET api/users/test
// @desc Tests Users route
// @access Public
router.post("/contacts/:id", (req, res) => {
  Contact.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      age: req.body.age,
      city: req.body.city
    }
  ).then(contact => console.log(contact));
});

module.exports = router;
