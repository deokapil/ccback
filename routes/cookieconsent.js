const express = require("express");
const consentRouter = express.Router();
const HomeController = require("../controllers/home.controller");
const consentController = require("../controllers/consent.controller");
const operationsController = require("../controllers/operations.controller");

consentRouter.get("/home", HomeController.getOverviewData);

consentRouter.post("/create-consent", consentController.create);
consentRouter.post("/add-design", consentController.addDesign);
consentRouter.post("/create-js", consentController.createJs);

consentRouter.post(
  "/consent-config",
  operationsController.getUserConsentConfig
);

module.exports = consentRouter;
