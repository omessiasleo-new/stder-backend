import cors from "cors";
import express from "express";

import LeadRoutes from "./routes/Lead.js";

const app = express();

// Body parser para analisar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/", LeadRoutes);

export default app; // Exporte a aplicação Express
