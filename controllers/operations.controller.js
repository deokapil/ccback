const e = require("express");
const Consent = require("../models/consent");
const consentOp = require("../models/consentOp");
const ConsentOp = require("../models/consentOp");

module.exports.getUserConsentConfig = async function (req, res) {
  const ccUuid = req.body.ccUuid;
  const consent = await Consent.findOne({ ccUuid: ccUuid })
    .populate("design")
    .exec();
  res.status(200).send(consent);
};

module.exports.setConsent = async function (req, res) {
  console.log("##########");
  console.log(req.cookies.slconsent);
  console.log("##########");
  const ccUuid = req.body.ccUuid;
  const consent = await Consent.findOne({ ccUuid: ccUuid }).exec();
  const consentOp = new ConsentOp({
    status: req.body.status,
    domain: consent,
    newtworkIP: req.connection.remoteAddress,
    newtworkFamily: req.connection.remoteFamily,
  });
  await consentOp.save();

  console.log(consentOp._id);

  res.cookie("slconsent", "abc", {
    maxAge: 900000,
    httpOnly: true,
  });
  res.status(200).send({ consentOp });
};
