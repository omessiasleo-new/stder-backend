import express from 'express';

import { createLead, getLeads, exportLeadsToExcel, updateLead } from '../controllers/Lead.js';

const router = express.Router();

router.post("/lead", createLead);
router.put("/lead/:id", updateLead);
router.get("/leads/export/excel", exportLeadsToExcel);
router.get("/leads/:page", getLeads);

export default router;