import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  const { document, name, password } = req.body;

  const lead = await Lead.create({ document, name, password });

  res.status(201).json(lead);
};

export const getLeads = async (req, res) => {
  const leads = await Lead.findAll();

  res.status(200).json(leads);
};