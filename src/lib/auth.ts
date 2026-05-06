import {betterAuth} from "better-auth";

export const auth = betterAuth({
    baseURL: process.env.FRONTEND_URL,

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});
