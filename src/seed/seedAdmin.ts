import bcrypt from "bcryptjs";
import { UserRole } from "../middlewares/auth";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
    const hashedPassword = await bcrypt.hash("admin1234", 10);

    const adminData = {
        name: "Admin1",
        email: "admin1@gmail.com",
        role: UserRole.ADMIN,
        password: hashedPassword,
    };

    try {
        const isExist = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });

        if (isExist) {
            console.log(
                "This admin already exists. Please create another Admin Account. Or login.",
            );
            return;
        }

        const newAdmin = await prisma.user.create({
            data: adminData,
        });

        console.log("Admin Created Successfully.");
    } catch (error) {
        console.error(error);
    }
};

seedAdmin();
