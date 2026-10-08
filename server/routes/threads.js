
// ─────────────────────────────────────────────────────────────
// routes/threads.js
//
// Prisma-backed CRUD routes
// ─────────────────────────────────────────────────────────────
import { Router } from "express";
import prisma from "../prisma/client.js";

const router = Router();

// GET /api/threads — return the whole list.
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// POST /api/threads — create a thread from { title, body }.
router.post("/", async (req, res, next) => {
  try {
    const { title, body = "" } = req.body || {};

    const thread = await prisma.thread.create({
      data: {
        title: title,
        body: body,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

// PUT /api/threads/:id — update title/body of one thread.
router.put("/:id", async (req, res, next) => {
  try {
    const { title, body } = req.body || {};

    const thread = await prisma.thread.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...(title !== undefined && { title }),
        ...(body !== undefined && { body }),
      },
    });

    res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/threads/:id — remove one thread.
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await prisma.thread.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

export default router;
