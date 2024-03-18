const express = require("express");
const router = express.Router();

const JsonData = require("../model/Datamodel"); // Corrected import path

// Define endpoint to fetch all data from the "jsondata" collection
router.get("/jsondata", async (req, res) => {
  try {
    const jsondata = await JsonData.find();
    if (!jsondata || jsondata.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    res.json(jsondata);
  } catch (error) {
    console.error("Error fetching documents:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
