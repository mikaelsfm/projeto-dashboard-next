import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "João Silva",
        email: "joao.silva@example.com",
        phone: "(21) 99999-1111",
        document: "123.456.789-00",
        address: "Rua das Flores, 123, RJ - 20000-001",
        type: "CONSULTANT",
      },
      {
        name: "Maria Souza",
        email: "maria.souza@example.com",
        phone: "(11) 98888-2222",
        document: "987.654.321-00",
        address: "Av. Paulista, 1000, SP - 01310-100",
        type: "CLIENT",
      },
      {
        name: "Pedro Gomes",
        email: "pedro.gomes@example.com",
        phone: "(31) 97777-3333",
        document: "456.123.789-00",
        address: "Rua A, 45, MG - 30110-000",
        type: "CLIENT",
      },
      {
        name: "Ana Costa",
        email: "ana.costa@example.com",
        phone: "(41) 96666-4444",
        document: "321.654.987-00",
        address: "Rua B, 200, PR - 80010-010",
        type: "CONSULTANT",
      },
      {
        name: "Carlos Lima",
        email: "carlos.lima@example.com",
        phone: "(51) 95555-5555",
        document: "741.852.963-00",
        address: "Rua C, 10, RS - 90010-001",
        type: "CLIENT",
      },
      {
        name: "Fernanda Ribeiro",
        email: "fernanda.ribeiro@example.com",
        phone: "(71) 94444-6666",
        document: "852.963.741-00",
        address: "Av. Atlântica, 300, BA - 40110-150",
        type: "CONSULTANT",
      },
      {
        name: "Lucas Pereira",
        email: "lucas.pereira@example.com",
        phone: "(81) 93333-7777",
        document: "963.258.741-00",
        address: "Rua D, 90, PE - 50010-060",
        type: "CLIENT",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("Seed concluído com sucesso"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());