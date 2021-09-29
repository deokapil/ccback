var mongoose = require("mongoose");

mongoose.set("debug", true);

var pallete = mongoose.Schema({
  image: { type: String },
  bannerColor: { type: String },
  bannerText: { type: String },
  buttonColor: { type: String },
  buttonText: { type: String },
});

var designSchema = mongoose.Schema(
  {
    consent: { type: mongoose.Schema.ObjectId, ref: "Consent" },
    cookiePolicy: {
      type: String,
    },
    bannerPosition: {
      type: String,
      enum: [
        "Bottom",
        "Bottom-Left",
        "Bottom-Right",
        "Top",
        "Top-Pushdown",
        "Popup",
      ],
      default: "Bottom",
    },
    policyLink: { type: String },
    policyLinkText: { type: String, required: true },
    layout: {
      type: String,
      enum: ["Block", "Edgeless", "Wire", "Classic"],
      default: "Block",
    },
    bannerColor: { type: String },
    bannerText: { type: String },
    buttonColor: { type: String },
    buttonText: { type: String },
    refuseButtonColor: { type: String },
    refuseButtonText: { type: String },
    disclaimer: { type: String },
    dismissButtonText: { type: String, default: "Got it!" },
    acceptCookieButtonText: { type: String, default: "Accept Cookies" },
    refuseCookieButtonText: { type: String, default: "Refuse Cookies" },
  },
  { timestamps: true }
);

const Design = (module.exports = mongoose.model("Design", designSchema));
