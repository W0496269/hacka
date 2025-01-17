import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

/**
 * POST /form/upload
 * Handles the uploading of a form with type, room, and data fields.
 */
router.post('/upload', async (req, res) => {
  const { type, room, data } = req.body;

  if (!type || !room || !data) {
    return res.status(400).json({ error: 'Type, room, and data are required' });
  }

  try {
    const newForm = await prisma.form.create({
      data: { type, room, data },
    });

    res.status(201).json({ message: 'Form uploaded successfully!', newForm });
  } catch (error) {
    console.error('Error uploading form:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while uploading the form' });
  }
});

/**
 * GET /form/rooms
 * Fetches a list of all rooms and their statuses.
 */
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await prisma.room.findMany(); // Fetch all rooms
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while fetching rooms' });
  }
});

/**
 * GET /form/room-stats
 * Fetches statistical data on room completion statuses.
 */
router.get('/room-stats', async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();

    const numOfRoomsDone = rooms.filter((room) => room.status === 'completed').length;
    const numOfRoomsNotDone = rooms.filter((room) => room.status !== 'completed').length;

    res.status(200).json({ numOfRoomsDone, numOfRoomsNotDone });
  } catch (error) {
    console.error('Error fetching room stats:', error.message, error.stack);
    res.status(500).json({ error: 'An error occurred while fetching room stats' });
  }
});


// Make sure you are exporting the router as default
export default router;