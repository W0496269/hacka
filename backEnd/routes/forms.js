import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// POST route to create a new inspection
router.post('/', async (req, res) => {
  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ error: 'Type and data are required' });
  }

  try {
    const newInspection = await prisma.inspection.create({
      data: { type, data },
    });

    res.status(201).json({ message: 'Inspection created successfully!', newInspection });
  } catch (error) {
    console.error('Error creating inspection:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while creating the inspection' });
  }
});

// GET route to fetch all inspections
router.get('/', async (req, res) => {
  try {
    const inspections = await prisma.inspection.findMany();
    res.status(200).json(inspections);
  } catch (error) {
    console.error('Error fetching inspections:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while fetching inspections' });
  }
});

// Make sure you are exporting the router as default
export default router;