# DST Boss API 🌟

Uma API para listar e filtrar todos os bosses do jogo **Don't Starve Together**. Feita com **Node.js**, documentada com **Swagger** e pronta para uso em produção!

---

## 🚀 Funcionalidades

- **Listar todos os bosses** do jogo.
- **Filtrar bosses pelo nome** (ou parte dele).
- **Documentação automática** com Swagger.

---

## 📚 Lista de Bosses Disponíveis

- Ancient Guardian
- Nightmare Werepig
- Great Depth Worm
- Eye of Terror
- Deerclops
- Moose/Goose
- Antlion
- Bearger
- Spider Queen
- Tree Guard
- Lord of the Fruit Flies
- Malbatross
- Frostjaw
- Crab King
- Bee Queen
- Dragonfly
- Scrappy Werepig
- Klaus
- Shadow Pieces
- Fuelweaver
- Ink Blight
- Toadstool
- Twins of Terror
- Celestial Champion
- Brightshade
- Possessed Varg
- Crystal Deerclops
- Armored Bearger

---

## 🛠️ Tecnologias Usadas

- **Node.js**: Framework principal.
- **Express**: Para criar as rotas da API.
- **Swagger**: Para a documentação interativa.

---

## 🚧 Endpoints Disponíveis

### **1. Listar todos os bosses**
**Rota:** `GET /bosses`  
**Descrição:** Retorna a lista completa de bosses.  
**Exemplo de Resposta:**
```json
{
  "bosses": [
    "Ancient Guardian",
    "Nightmare Werepig",
    "Great Depth Worm",
    "Eye of Terror",
    "Deerclops",
    "Moose/Goose",
    ...
  ]
}
