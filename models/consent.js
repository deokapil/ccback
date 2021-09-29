var mongoose = require("mongoose");

mongoose.set("debug", true);

var consentSchema = mongoose.Schema(
  {
    domainGroup: { type: String, required: true },
    domain: { type: String },
    primaryOwner: { type: String, required: true },
    sendNotifications: { type: Boolean, default: false },
    design: { type: mongoose.Schema.ObjectId, ref: "Design" },
    ccUuid: { type: String, required: true, index: true },
    steps: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Consent = (module.exports = mongoose.model("Consent", consentSchema));
