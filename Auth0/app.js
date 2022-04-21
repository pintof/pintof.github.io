const express = require("express");
const app = express();
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");

app.use(
  auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
    authRequired: false,
    auth0Logout: true,
  })
);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(req.oidc.isAuthenticated() + JSON.stringify(req.oidc.user));
});

app.listen(3000);
