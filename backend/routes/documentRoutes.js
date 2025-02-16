const express = require("express");
const documentController = require('../controllers/documentController');

const router = express.Router();

router
  .route("/")
  .post(documentController.createDocument)
  .get(documentController.getDocuments);

router.delete("/:id", documentController.delete);

module.exports = router;