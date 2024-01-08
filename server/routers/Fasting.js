import { Router } from "express";
import Fasting from "../models/Fasting.js";

const router = Router();

// Create fasting record route handles "/fasting/"
router.post("/", async (request, response) => {
  try {
    const newFastingRecord = new Fasting(request.body);

    const data = await newFastingRecord.save();

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all fasting records route
router.get("/", async (request, response) => {
  try {
    const query = request.query;

    const data = await Fasting.find(query);

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get a single fasting record by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Fasting.findById(request.params.id);

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete a fasting record by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Fasting.findByIdAndRemove(request.params.id, {});

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Update a single fasting record by ID
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Fasting.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          startTime: body.startTime,
          endTime: body.endTime,
          duration: body.duration,
          notes: body.notes,
        },
      },
      {
        new: true,
      },
    );

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
