import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const restaurantList = [
  {
    name: "Empório Café Funcional",
    location: "Rua Paralela BR 101, 2311 SL 1, Joinville",
  },
  {
    name: "Felizze Cozinha Inclusiva",
    location: "Rua Roberto Ziemann, 2651, Jaraguá do Sul",
  },
  { name: "Café Marques", location: "Rua Marques de Olinda, 1097, Joinville" },
  {
    name: "Cheiro de Café by Don Edu",
    location: "Rua Rolf Colin, 109 – Sala 13, Joinville",
  },
  { name: "Coxa Nostra Coxinhas", location: "Apenas Encomendas: @coxanostra" },
  { name: "Delícias da Fê", location: "Apenas Encomendas: @deliciasda.fe" },
  {
    name: "Dulcinéia Cabral",
    location: "Apenas Encomendas: @dulcineia_cabral",
  },
  {
    name: "Essência de Baunilha",
    location: "Rua Visconde de Mauá, 1837, Joinville",
  },
  {
    name: "Essência Saudável",
    location: "Apenas Encomendas: @essenciasaudavel",
  },
  {
    name: "Franguini.com",
    location: "Rua Pedro Mariano de Borba, 95, Joinville",
  },
  {
    name: "Good Diet Joinville",
    location: "Rua Mal. Hermes, 1270 Glória, Joinville",
  },
  {
    name: "Kaze Japanese",
    location: "Rua Campos Sales, 1105 sala 3, Joinville",
  },
  { name: "King Mix", location: "Loja Online: kingmix.com.br" },
  { name: "M&K Salgados", location: "Apenas Encomendas: @mek_salgados" },
  {
    name: "No Espaço Fit",
    location: "Rua Otto Pfuetzenreuter, 231, Joinville",
  },
  {
    name: "Verita Joinville",
    location: "Rua Orestes Guimarães, 480, Joinville",
  },
  { name: "Saporito", location: "Shopping Mueller, Joinville" },
  { name: "Dolce Di Carlini", location: "Apenas Encomendas: @dolcedicarlini" },
  {
    name: "Ecatarina Gluten Free",
    location: "Rua Otto Boehm, 856 – América, Joinville",
  },
  { name: "Chef Maria Lutke", location: "Apenas Encomendas: @chefmarialutke" },
  {
    name: "Nou Gluten Free",
    location: "Rua Barão do Rio Branco, 611, Jaraguá do Sul",
  },
];

async function main() {
  console.log(`🌱 A iniciar a população do banco de dados...`);

  // Opcional: Limpar a tabela antes de inserir para evitar duplicatas em desenvolvimento
  // await prisma.restaurants.deleteMany();

  for (const restaurant of restaurantList) {
    const created = await prisma.restaurants.create({
      data: restaurant,
    });
    console.log(`✅ Restaurante criado com id: ${created.id}`);
  }

  console.log(`🚀 Banco de dados populado com sucesso!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
