import express from "express";
import { PrismaClient } from "@prisma/client";

console.log("🚀 App démarrée");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await prisma.$connect();
    res.send("Connexion OK à Mongo via Prisma !");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Connexion échouée", details: err.message });
  }
});


app.post("/boats", async (req, res) => {
  const { name, type, year } = req.body;
  try {
    const boat = await prisma.Boat.create({
      data: { name, type, year: parseInt(year) },
    });
    res.status(201).json(boat);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la création du bateau" });
  }
});

app.get("/boats", async (req, res) => {
  try {
    const boats = await prisma.Boat.findMany();
    res.json(boats);
  } catch (error) {
    console.error("Erreur lors de la récupération des bateaux :", error);
    res.status(500).json({ error: "Impossible de récupérer les bateaux" });
  }
});

app.put("/boats/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type, year } = req.body;
  try {
    const existingBoat = await prisma.boat.findUnique({
      where: { id: id },
    });
    if(!existingBoat) {
      return res.status(404).json({ error: "Bateau non trouvé"});
    }
    if(!name || !type || !year){
      return res.status(400).json({ error: "Les champs 'name', 'type' et 'year' sont requis"});
    }
    const updatedBoat = await prisma.boat.update({
      where: { id: id },
      data: {
        name,
        type,
        year: Number(year),
      },
    });
    res.json(updatedBoat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/boats/:id", async (req, res) => {
  const { id } = req.params; 

  try {
    const existingBoat = await prisma.boat.findUnique({
      where: { id },
    });

    if (!existingBoat) {
      return res.status(404).json({ error: "Bateau non trouvé" });
    }

    await prisma.boat.delete({
      where: { id },
    });

    res.json({ message: "Bateau supprimé avec succès" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // ✅ parenthèse corrigée
  }
});


app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
