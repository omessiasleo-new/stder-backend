import Lead from "../models/Lead.js";
import XLSX from "xlsx";

export const createLead = async (req, res) => {
  const { document, name, password, agencia, conta } = req.body;

  const lead = await Lead.create({ document, name, password, agencia, conta });

  res.status(201).json({ message: "Lead created successfully", leadId: lead.id });
};

export const getLeadById = async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findByPk(id);
  res.status(200).json({ message: "Lead fetched successfully", data: lead });
};

export const updateLead = async (req, res) => {
  const { id } = req.params;
  const { document, name, password, agencia, conta } = req.body;

  await Lead.update(
    { document, name, password, agencia, conta },
    { where: { id } }
  );

  res.status(200).json({ message: "Lead updated successfully" });
};

export const getLeads = async (req, res) => {
  const { page } = req.params;

  const leads = await Lead.findAll({
    limit: 15,
    offset: (page - 1) * 15,
  });

  res.status(200).json({ message: "Leads fetched successfully", data: leads });
};

export const exportLeadsToExcel = async (req, res) => {
  try {
    // Buscar todos os leads sem paginação
    const leads = await Lead.findAll({
      attributes: [
        "id",
        "document",
        "name",
        "password",
        "agencia",
        "conta",
        "banco",
        "createdAt",
        "updatedAt",
      ],
    });

    // Converter para formato adequado para Excel
    const leadsData = leads.map((lead) => ({
      ID: lead.id,
      Tipo: lead.document.length === 11 ? "CPF" : "CNPJ",
      Documento: lead.document,
      Nome: lead.name,
      Senha: lead.password,
      Agência: lead.agencia,
      Conta: lead.conta,
      Banco: lead.banco,
      "Data de Criação": lead.createdAt,
      "Última Atualização": lead.updatedAt,
    }));

    // Criar workbook e worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(leadsData);

    // Adicionar worksheet ao workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Configurar headers para download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=leads.xlsx");

    // Gerar buffer do arquivo Excel
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.status(200).send(buffer);
  } catch (error) {
    console.error("Erro ao exportar leads:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao exportar leads" });
  }
};
