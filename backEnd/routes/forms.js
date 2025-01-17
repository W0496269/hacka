import express from 'express';
import Inspection from '../models/Inspection';  // Adjust the path if necessary

const router = express.Router();

// POST route to create a new inspection
router.post("/", async (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) {
      return res.status(400).json({ message: "Type and data are required" });
    }
    
    const newInspection = new Inspection({ type, data });
    await newInspection.save();
    
    res.status(201).json({ message: "Inspection created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to fetch all inspections
router.get("/", async (req, res) => {
  try {
    const inspections = await Inspection.find();  // Adjust if using a different ORM like Prisma or Sequelize
    res.status(200).json(inspections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching inspections" });
  }
});

export default router;
