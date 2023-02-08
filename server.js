require("dotenv").config();
const express = require("express");
app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const orgRoutes = require("./routes/org");
const landRoutes = require("./routes/land");
const tranRouter = require("./routes/transaction");
const fs = require("fs");
const land=require('./models/Land');
const landOwner=require('./models/landOwnerAccount');
const organisation=require('./models/OrganisationAccount');
const landOwnerAccount = require("./models/landOwnerAccount");
const OrganisationAccount = require("./models/OrganisationAccount");
app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://raman:ggEUfu5HwjckgrEI@cluster0.siajibf.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use("/auth/user", authRoutes);
app.use("/auth/org", orgRoutes);
app.use("/auth/land", landRoutes);
app.use("/transaction", tranRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
