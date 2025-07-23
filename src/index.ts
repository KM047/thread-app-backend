import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import { createGraphQLServer } from "./graphql/index.js";

async function init() {
    const app = express();
    const PORT = process.env.PORT || 8000;

    app.use(express.json());

    app.use(
        "/graphql",
        expressMiddleware(await createGraphQLServer(), {
            context: async ({ req, res }) => ({
                token: req.headers.authorization,
            }),
        })
    );

    app.get("/", (req, res) => {
        res.json({
            message: "Server is up and running!!",
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

init();
