var express = require("express");

var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/index.html");

  //   res.send(`
  //     <form action='/answer' method='POST'>
  //     <p> what color is the sky on a clear and sunny day ? </p>
  //     <input name="skyColor" autocomplete="off">
  //     <button> Submit Answer <button>
  //     </form>
  //     `);
});

// app.get("/answer", (req, res) => {
//   res.send("Thank you for submiting the form.");
// });

app.post("/answer", (req, res) => {
//   if (req.body.email === "BLUE") {

//     res.send(`
    
//         <p>Congrats, Your is the correct answer </p>
//         <a href='/'> Back To Home Page </a>
//         `);
//   } else {
//     res.send(`<p> Sorry Your Answer is Not Correct </p>
//       `);
//   }
  console.log('user name:', req.body.email) 
  console.log( ' password: ', req.body.password)


});

app.listen(3000, () => console.log("Server listening on port 3000!"));