// Ficheiro principal do servidor
// Este ficheiro configura e inicia o servidor Express, estabelece a conexão com a base de dados
// e define as configurações globais da aplicação

const express = require("express"); // Framework web para Node.js
const dotenv = require("dotenv"); // Para carregar variáveis de ambiente de ficheiros .env
const cors = require("cors"); // Middleware para permitir pedidos CORS
const multer = require("multer"); // Middleware para processamento de uploads de ficheiros
const path = require("path"); // Utilitário para manipulação de caminhos de ficheiros
const fs = require("fs"); // Módulo de sistema de ficheiros
const { sequelize } = require("./src/config/db"); // Importa a instância Sequelize configurada
const tipoPropostaController = require("./src/controllers/tipoPropostaController");

// Importa os ficheiros de rotas
const apiRoutes = require("./src/routes/index"); // Rotas principais da API
const adminRoutes = require("./src/routes/adminRoutes"); // Rotas de administração

// Carrega as variáveis de ambiente
dotenv.config();
const PORT = process.env.PORT; // Porta onde o servidor vai correr

// Inicializa a aplicação Express
const app = express();
app.use(express.json()); // Middleware para processar pedidos com corpo JSON

// Configuração CORS - permite especificamente pedidos do frontend
// Isto é importante para segurança, limitando quais domínios podem comunicar com a API
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Origens permitidas (frontend)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

// Cria o diretório de uploads se não existir
// Isto garante que os ficheiros submetidos pelos utilizadores podem ser armazenados
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve ficheiros estáticos do diretório de uploads
// Isto permite aceder aos ficheiros através de URLs como /uploads/imagem.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Função para testar a conexão com a base de dados
async function testConnection() {
  try {
    // Tenta autenticar com a base de dados
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sincroniza os modelos com a base de dados (apenas em desenvolvimento)
    // O modo 'alter' atualiza tabelas existentes para corresponder aos modelos
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
      console.log("Models synchronized with database.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Rota de teste simples para verificar se a API está a funcionar
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Configura as rotas principais da API
app.use("/api", apiRoutes);

// Configura as rotas de administração
app.use("/admin", adminRoutes);

// Rota padrão (redireciona para a secção de administração)
app.get("/", (req, res) => {
  res.redirect("/admin");
});

// Middleware de tratamento de erros
// Apanha quaisquer erros que ocorram durante o processamento dos pedidos
app.use((err, req, res, next) => {
  console.error(err.stack); // Regista o erro no console para debugging
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Inicia o servidor
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Testa a conexão com a base de dados quando o servidor inicia
  await testConnection();

  // Garante que os tipos de proposta predefinidos existem
  // Esta é uma inicialização importante para o funcionamento da aplicação
  await tipoPropostaController.ensureTypesExist();
});
