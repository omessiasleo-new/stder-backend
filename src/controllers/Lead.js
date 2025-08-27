import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  const { document, name, password } = req.body;

  const lead = await Lead.create({ document, name, password });

  res.status(201).json(lead);
};

export const getLeads = async (req, res) => {
  const { page } = req.params;

  const leads = await Lead.findAll({
    limit: 10,
    offset: (page - 1) * 10,
  });

  res.status(200).json(leads);
};