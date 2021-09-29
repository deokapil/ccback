const e = require("express");
const Consent = require("../models/consent");
const Design = require("../models/cookiedesign");
const webpack = require("webpack");
const libutils = require("../utils/libutils");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request

  // Create a Tutorial
  const consentUuid = uuidv4();
  const consent = new Consent({
    domainGroup: req.body.domainGroup,
    domain: req.body.domain,
    primaryOwner: req.body.primaryOwner,
    ccUuid: consentUuid,
  });

  // Save Tutorial in the database
  consent
    .save(consent)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Consent.",
      });
    });
};

exports.addDesign = async (req, res) => {
  const bannerDesign = new Design({
    cookiePolicy: req.body.cookiePolicy,
    bannerPosition: req.body.bannerPosition,
    policyLink: req.body.policyLink,
    policyLinkText: req.body.policyLinkText,
    bannerColor: req.body.bannerColor,
    bannerText: req.body.bannerText,
    buttonColor: req.body.buttonColor,
    buttonText: req.body.buttonText,
    disclaimer: req.body.disclaimer,
    dismissButtonText: req.body.dismissButtonText,
    consent: req.body.consentId,
    refuseButtonColor: req.body.refuseButtonColor,
    refuseButtonText: req.body.refuseButtonText,
    acceptCookieButtonText: req.body.acceptCookieButtonText,
    refuseCookieButtonText: req.body.refuseCookieButtonText,
  });
  try {
    await bannerDesign.save();
    const consent = await Consent.findOneAndUpdate(
      { _id: req.body.consentId },
      { design: bannerDesign }
    );
    res.send(bannerDesign);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Consent.",
    });
  }
};

exports.createJs = async (req, res) => {
  let libPath = await libutils.getPkgJsonDir();
  // get by ID the object
  // const libPath = "/home/deo/cookcon/scripts/";
  const id = req.body.consentId;
  console.log(id);
  const consent = await Consent.findById(id).populate("design").exec();
  const jsonString = await JSON.stringify(consent);

  // create new config.json file
  console.log(libPath);
  fs.writeFileSync(libPath + "/public/wp/options.json", jsonString);

  // add options to config.json
  // compile web pack
  const compiler = webpack({
    mode: "production",
    entry: `./public/wp/main.js`,
    output: {
      path: libPath + "/public/wp/",
      filename: `${consent._id}.js`,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  });
  compiler.run((err, stats) => {
    // [Stats Object](#stats-object)
    // ...
    console.log(stats);
    compiler.close((closeErr) => {
      console.log(closeErr);
    });
  });

  res.status(200).send({});
};
