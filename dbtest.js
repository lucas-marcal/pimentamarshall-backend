const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllProducts() {
  try {
    const products = await prisma.product.findMany().then(async () => {
      await prisma.$disconnect();
    });
    return products;
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

getAllProducts().then((products) => {
  console.log(products);
});
