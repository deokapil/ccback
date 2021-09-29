const e = require("express");
const Consent = require("../models/consent");

module.exports.getUserConsentConfig = async function (req, res) {
  const ccUuid = req.body.ccUuid;
  const consent = await Consent.findOne({ ccUuid: ccUuid })
    .populate("design")
    .exec();
  res.status(200).send(consent);
};
