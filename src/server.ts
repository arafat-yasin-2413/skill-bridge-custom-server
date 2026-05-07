import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

async function main() {
    try {
        await prisma.$connect();
        app.listen(config.port, () => {
            console.log(
                `Skill Bridge Custom Server is listening on port ${config.port}`,
            );
        });
    } catch (err) {
        console.error("Failed to start server: ", err);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
