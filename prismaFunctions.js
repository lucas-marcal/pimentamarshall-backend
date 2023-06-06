const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function pixUpdateOrderStatus(txid) {
  try {
    await prisma.shopOrder
      .updateMany({
        where: { txid: txid },
        data: { status: "PROCESSING" },
      })
      .then(async () => {
        await prisma.$disconnect();
      });
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

async function getOrderByTxid(txid) {
  try {
    const order = await prisma.shopOrder.findFirst({
      where: { txid: txid },
    });

    await prisma.$disconnect();

    return order;
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

module.exports = {
  pixUpdateOrderStatus,
  getOrderByTxid,
};
