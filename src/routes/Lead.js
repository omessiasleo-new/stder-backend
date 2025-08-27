import express from 'express';

import { createLead, getLeads } from '../controllers/Lead.js';

const router = express.Router();

router.post("/lead", createLead);
router.get("/leads/:page", getLeads);

export default router;