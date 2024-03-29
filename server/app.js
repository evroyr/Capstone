import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Fasting from "./routers/Fasting.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!"),
);

const PORT = process.env.PORT || 4040;

const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin",
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`,
  );
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);

app.get("/status", (request, response) => {
  response.status(200).json({ message: "Service healthy" });
});

app.get("/weather/:city", (request, response) => {
  const city = request.params.city;
  let cloudy = "clear";
  let rainy = false;
  let lowTemp = 32;

  if ("cloudy" in request.query) {
    cloudy = request.query.cloudy;
  }
  if ("rainy" in request.query && request.query.rainy === "true") {
    rainy = request.query.rainy;
  }
  if ("lowtemp" in request.query) {
    lowTemp = Number(request.query.lowtemp);
  }

  const min = 70;
  const max = 90;
  const temp = Math.floor(Math.random() * (max - min + 1) + min);

  response.json({
    text: `The weather in ${city} is ${temp} degrees today.`,
    cloudy,
    rainy,
    temp: {
      current: temp,
      low: lowTemp,
    },
    city,
  });
});

app.use("/Fasting", Fasting);

app.listen(PORT, () => console.log(`Listening on port 4040`));
