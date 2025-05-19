// Controlador de Notícias
// Este ficheiro gere todas as operações CRUD relacionadas com as notícias,
// incluindo o upload e gestão de imagens associadas às notícias

const { models } = require("../config/db"); // Importa os modelos Sequelize para acesso à BD
const path = require("path"); // Módulo para gestão de caminhos de ficheiros
const fs = require("fs"); // Módulo para operações no sistema de ficheiros
const multer = require("multer"); // Middleware para processamento de ficheiros em formulários

// Configuração do armazenamento para o multer
// Isto define onde e como os ficheiros de imagem serão armazenados no servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório de destino para os uploads de imagens de notícias
    const uploadPath = path.join(__dirname, "../../uploads/noticias");
    // Cria o diretório caso não exista, garantindo que podemos guardar os ficheiros
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Fornece o caminho ao multer
  },
  filename: (req, file, cb) => {
    // Gera um nome de ficheiro único baseado no timestamp atual e um número aleatório
    // Isto evita colisões de nomes de ficheiros mesmo que múltiplos uploads ocorram simultaneamente
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Mantém a extensão original do ficheiro (jpg, png, etc.)
    const extension = path.extname(file.originalname);
    // Formato final: noticia-[timestamp]-[número aleatório].[extensão]
    cb(null, `noticia-${uniqueSuffix}${extension}`);
  },
});

// Filtro para garantir que apenas imagens são aceites
// Isto impede que utilizadores façam upload de outros tipos de ficheiros que poderiam representar riscos de segurança
const fileFilter = (req, file, cb) => {
  // Verifica se o MIME type do ficheiro começa com "image/"
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Aceita o ficheiro
  } else {
    // Rejeita o ficheiro e fornece uma mensagem de erro
    cb(new Error("Apenas ficheiros de imagem são permitidos!"), false);
  }
};

// Inicializa o middleware de upload
const upload = multer({
  storage: storage, // Usa a configuração de armazenamento definida acima
  fileFilter: fileFilter, // Usa o filtro de tipos de ficheiro definido acima
  limits: {
    fileSize: 5 * 1024 * 1024, // Limita o tamanho dos ficheiros a 5MB
  },
});

// Função auxiliar para eliminar imagens antigas
// Isto é importante para evitar acumulação de ficheiros não utilizados no servidor
const deleteOldImage = (imagePath) => {
  if (!imagePath) return; // Se não existir um caminho de imagem, não faz nada

  // Constrói o caminho completo para o ficheiro
  // O replace remove a barra inicial se existir para evitar problemas de caminho
  const fullPath = path.join(__dirname, "../..", imagePath.replace(/^\//, ""));

  // Verifica se o ficheiro existe antes de tentar eliminá-lo
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath); // Elimina o ficheiro
      console.log(`Imagem antiga eliminada: ${fullPath}`);
    } catch (err) {
      console.error(`Erro ao eliminar ficheiro ${fullPath}:`, err);
    }
  }
};

const noticiaController = {
  // Middleware para upload de uma única imagem
  // Este será usado nas rotas que necessitam de processamento de imagens
  uploadImage: upload.single("imagem"),

  // Método para obter todas as notícias
  // Devolve uma lista ordenada por data (mais recentes primeiro)
  getAllNoticias: async (req, res) => {
    try {
      const noticias = await models.noticias.findAll({
        order: [["data_noticia", "DESC"]], // Ordenação por data em ordem decrescente
      });
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter uma notícia específica pelo ID
  getNoticiaById: async (req, res) => {
    try {
      const noticia = await models.noticias.findByPk(req.params.id);
      if (noticia) {
        res.json(noticia);
      } else {
        res.status(404).json({ message: "Notícia não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para criar uma nova notícia
  createNoticia: async (req, res) => {
    try {
      const { TITULO_NOTICIA, CORPO_NOTICIA } = req.body;

      // Valida os campos obrigatórios
      if (!TITULO_NOTICIA || !CORPO_NOTICIA) {
        return res.status(400).json({
          message: "Título e corpo da notícia são obrigatórios",
        });
      }

      // Cria a notícia com a data atual
      const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

      // Determina o URL da imagem (se uma imagem foi enviada)
      let imagemUrl = null;
      if (req.file) {
        // Gera o URL para a imagem carregada
        imagemUrl = `/uploads/noticias/${req.file.filename}`;
      }

      // Cria o registo da notícia na base de dados
      const newNoticia = await models.noticias.create({
        titulo_noticia: TITULO_NOTICIA,
        corpo_noticia: CORPO_NOTICIA,
        data_noticia: today,
        imagem_url: imagemUrl,
      });

      // Devolve a notícia criada com código 201 (Created)
      res.status(201).json(newNoticia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Método para atualizar uma notícia existente
  updateNoticia: async (req, res) => {
    try {
      const { TITULO_NOTICIA, CORPO_NOTICIA, DATA_NOTICIA } = req.body;
      const noticiaId = req.params.id;

      // Verifica se a notícia existe
      const noticia = await models.noticias.findByPk(noticiaId);
      if (!noticia) {
        return res.status(404).json({ message: "Notícia não encontrada" });
      }

      // Guarda o URL da imagem antiga para caso seja necessário eliminá-la
      const oldImageUrl = noticia.imagem_url;

      // Cria um objeto com os campos a atualizar
      const updateFields = {};
      if (TITULO_NOTICIA) updateFields.titulo_noticia = TITULO_NOTICIA;
      if (CORPO_NOTICIA) updateFields.corpo_noticia = CORPO_NOTICIA;
      if (DATA_NOTICIA) updateFields.data_noticia = DATA_NOTICIA;

      // Se uma nova imagem foi enviada, atualiza o URL da imagem
      if (req.file) {
        updateFields.imagem_url = `/uploads/noticias/${req.file.filename}`;

        // Elimina a imagem antiga se existir
        if (oldImageUrl) {
          deleteOldImage(oldImageUrl);
        }
      }

      // Atualiza a notícia na base de dados
      await noticia.update(updateFields);

      // Obtém a notícia atualizada
      const updatedNoticia = await models.noticias.findByPk(noticiaId);

      // Devolve a notícia atualizada
      res.json(updatedNoticia);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Método para eliminar uma notícia
  deleteNoticia: async (req, res) => {
    try {
      const noticiaId = req.params.id;

      // Verifica se a notícia existe
      const noticia = await models.noticias.findByPk(noticiaId);
      if (!noticia) {
        return res.status(404).json({ message: "Notícia não encontrada" });
      }

      // Elimina a imagem associada, se existir
      if (noticia.imagem_url) {
        deleteOldImage(noticia.imagem_url);
      }

      // Elimina a notícia
      await noticia.destroy();

      // Devolve mensagem de sucesso
      res.json({ message: "Notícia eliminada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Método para obter as notícias mais recentes
  // Útil para mostrar na página inicial ou em secções de destaques
  getRecentNoticias: async (req, res) => {
    try {
      // Obtém o limite dos parâmetros de consulta ou usa 5 como padrão
      const limit = parseInt(req.query.limit) || 5;

      // Obtém as notícias mais recentes
      const noticias = await models.noticias.findAll({
        order: [["data_noticia", "DESC"]], // Ordenação por data
        limit: limit, // Limita ao número especificado
      });

      // Devolve as notícias encontradas
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

// Exporta o controlador para ser utilizado noutras partes da aplicação
module.exports = noticiaController;
