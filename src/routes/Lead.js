import express from 'express';

import { createLead, getLeads, exportLeadsToExcel, updateLead, getLeadById } from '../controllers/Lead.js';

const router = express.Router();

router.post("/lead", createLead);
router.get("/lead/:id", getLeadById);
router.put("/lead/:id", updateLead);
router.get("/leads/export/excel", exportLeadsToExcel);
router.get("/leads/:page", getLeads);

export default router;