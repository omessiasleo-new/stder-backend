import Lead from '../models/Lead.js';

async function syncLead(force = false) {
    try {
        await Lead.sync({ force: force });
        console.log('Tabela Lead sincronizada com sucesso');
    } catch (error) {
        console.error('Erro ao sincronizar tabela Lead:', error);
    }
}

syncLead(true);
