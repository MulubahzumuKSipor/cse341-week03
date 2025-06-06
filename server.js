const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const dotenv = require("dotenv").config();
const MongoStore = require("connect-mongo");

const port = process.env.PORT || 3000;
app.use(express.json());
app
  .use(bodyParser.json())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({ origin: "*", methods: "GET, POST, PUT, DELETE, OPTIONS" }))
  .use("/", require("./routes/index.js"));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.GITHUB_CALLBACK_URL ||
        "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you can save the user profile to your database
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
