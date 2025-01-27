const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Lista de bosses
const bosses = [
  "Ancient Guardian",
  "Nightmare Werepig",
  "Great Depth Worm",
  "Eye of Terror",
  "Deerclops",
  "Moose/Goose",
  "Antlion",
  "Bearger",
  "Spider Queen",
  "Tree Guard",
  "Lord of the Fruit Flies",
  "Malbatross",
  "Frostjaw",
  "Crab King",
  "Bee Queen",
  "Dragonfly",
  "Scrappy Werepig",
  "Klaus",
  "Shadow Pieces",
  "Fuelweaver",
  "Ink Blight",
  "Toadstool",
  "Twins of Terror",
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

// Middleware do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
 *                 bosses:
 *                   type: array
 *                   items:
 *                     type: string
 */

app.get('/bosses', (req, res) => {
  res.json({ bosses });
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
 *                 filteredBosses:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Parâmetro de nome ausente.
 */

app.get('/bosses/filter', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "O parâmetro 'name' é obrigatório." });
  }

  const filteredBosses = bosses.filter(boss =>
    boss.toLowerCase().includes(name.toLowerCase())
  );

  res.json({ filteredBosses });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
