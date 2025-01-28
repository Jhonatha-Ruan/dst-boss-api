const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Lista de bosses
const bosses = [
  "Tree Guard",
  "Spider Queen",
  "Lord of the Fruit Flies",
  "Deerclops",
  "Moose/Goose",
  "Antlion",
  "Bearger",
  "Klaus",
  "Dragonfly",
  "Bee Queen",
  "Eye of Terror",
  "Twins of Terror",
  "Scrappy Werepig",
  "Malbatross",
  "Frostjaw",
  "Crab King",
  "Shadow Pieces",
  "Ancient Guardian",
  "Nightmare Werepig",
  "Great Depth Worm",
  "Fuelweaver",
  "Ink Blight",
  "Toadstool",
  "Celestial Champion",
  "Brightshade",
  "Possessed Varg",
  "Crystal Deerclops",
  "Armored Bearger"
];

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Don't Starve Together Boss API",
      version: "1.0.0",
      description: "API para listar e filtrar bosses do jogo Don't Starve Together."
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor local"
      }
    ]
  },
  apis: ["./index.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Helpers
const jsonResponse = (res, bosses, status = 200) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    bosses,
    timestamp: new Date().toISOString()
  });
};

// Rotas
/**
 * @swagger
 * /bosses:
 *   get:
 *     summary: Retorna a lista de todos os bosses.
 *     responses:
 *       200:
 *         description: Lista de bosses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 bosses:
 *                   type: array
 *                   items:
 *                     type: string
 *                 timestamp:
 *                   type: string
 */
app.get('/bosses', (req, res) => {
  jsonResponse(res, bosses);
});

/**
 * @swagger
 * /bosses/filter:
 *   get:
 *     summary: Filtra bosses pelo nome.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome ou parte do nome do boss.
 *     responses:
 *       200:
 *         description: Lista de bosses filtrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 bosses:
 *                   type: array
 *                   items:
 *                     type: string
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Parâmetro de nome ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
app.get('/bosses/filter', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return jsonResponse(res, { error: "O parâmetro 'name' é obrigatório." }, 400);
  }

  const filteredBosses = bosses.filter(boss =>
    boss.toLowerCase().includes(name.toLowerCase())
  );

  jsonResponse(res, filteredBosses);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
