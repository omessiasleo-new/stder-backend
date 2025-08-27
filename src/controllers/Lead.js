import Lead from "../models/Lead.js";
import XLSX from "xlsx";

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

export const exportLeadsToExcel = async (req, res) => {
  try {
    // Buscar todos os leads sem paginação
    const leads = await Lead.findAll({
      attributes: ['id', 'document', 'name', 'password', 'createdAt', 'updatedAt']
    });

    // Converter para formato adequado para Excel
    const leadsData = leads.map(lead => ({
      ID: lead.id,
      Documento: lead.document,
      Nome: lead.name,
      Senha: lead.password,
      'Data de Criação': lead.createdAt,
      'Última Atualização': lead.updatedAt
    }));

    // Criar workbook e worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(leadsData);

    // Adicionar worksheet ao workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    // Configurar headers para download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.xlsx');

    // Gerar buffer do arquivo Excel
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.status(200).send(buffer);
  } catch (error) {
    console.error('Erro ao exportar leads:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao exportar leads' });
  }
};