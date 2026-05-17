import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";
import config from "../config";

const isProduction= config.nodeEnv === "production"

export const auth = betterAuth({
    baseURL: process.env.BACKEND_URL,
    trustedOrigins: [process.env.FRONTEND_URL!],

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    advanced: {
        cookies: {
            session_token: {
                name: "session_token",
                attributes: {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction? "none": "lax",
                    partitioned: false, // it should be kept true
                },
            },
            state: {
                name: "session_token",
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    partitioned: false, // it should be kept true
                },
            },
        },
    },

    // TODO: uncomment this before production
    // plugins: [oAuthProxy()],
});
