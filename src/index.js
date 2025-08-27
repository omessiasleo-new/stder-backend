import dotenv from "dotenv";
import path from "path";

console.log(`Iniciando o servidor com NODE_ENV: ${process.env.NODE_ENV}`);
const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

console.log(`Carregando variáveis de ambiente do arquivo: ${path.resolve(process.cwd(), envFile)}`);
console.log(`Carregando variáveis de ambiente do arquivo: ${envFile}`);
console.log(`Versão: ${process.env.VERSION}`);

import app from "./app.js";

// Defina a porta e inicie o servidor
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});