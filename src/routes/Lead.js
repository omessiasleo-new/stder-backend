import express from 'express';

import { createLead, getLeads, exportLeadsToExcel } from '../controllers/Lead.js';

const router = express.Router();

router.post("/lead", createLead);
router.get("/leads/export/excel", exportLeadsToExcel);
router.get("/leads/:page", getLeads);

export default router;