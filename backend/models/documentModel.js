const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    docName: {
      type: String,
      required: [true, "Document name is required"],
    },

    docLink: {
      type: String,
      required: [true, "Document link is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", documentSchema);
