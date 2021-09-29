var mongoose = require("mongoose");

mongoose.set("debug", true);

var consentOpSchema = mongoose.Schema(
  {
    status: { type: String, required: true },
    domain: { type: mongoose.Schema.ObjectId, ref: "Consent" },
    newtworkIP: { type: String, required: true },
    newtworkFamily: { type: String, required: true },
  },
  { timestamps: true }
);

const consentOp = (module.exports = mongoose.model(
  "ConsentOp",
  consentOpSchema
));
