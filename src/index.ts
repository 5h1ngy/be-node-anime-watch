#!/usr/bin/env node

import "./config/env";
import { Container } from "typedi";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { useExpressServer, getMetadataArgsStorage, useContainer } from "routing-controllers";
import swaggerUi from "swagger-ui-express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getFromContainer, MetadataStorage } from "class-validator";

import { connect, disconnect } from "@/config/database";
import { errorHandler } from "@/middleware/errorHandler";
import { setupHttpLogging, logInfo, logError, logWarn } from "@/shared/logger";

import { AnimeDetailsController } from "@/controllers/AnimeDetailsController";
import { AssetImagesController } from "@/controllers/AssetImagesController";
import { TagDetailsController } from "@/controllers/TagDetailsController";
import { AnimeTagsController } from "@/controllers/AnimeTagsController";
import { HealthController } from "@/controllers/HealthController";

class App {
    private static instance: App;
    public app: express.Application;

    private constructor() {
        this.app = express();
        this.config();
        this.setupControllers();
        this.setupSwagger();
        this.setupErrorHandling();
        this.connectDatabase();
        this.handleProcessEvents();
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    private config(): void {
        useContainer(Container);
        this.app.use(
            helmet({
                contentSecurityPolicy: false,
                crossOriginOpenerPolicy: false,
                crossOriginEmbedderPolicy: false,
            })
        );
        this.app.use(
            cors({
                origin: "*",
                methods: ["GET"],
                optionsSuccessStatus: 200,
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        setupHttpLogging(this.app);
    }

    private setupControllers(): void {
        // Rotte sotto /api
        useExpressServer(this.app, {
            controllers: [
                AnimeDetailsController,
                AssetImagesController,
                TagDetailsController,
                AnimeTagsController,
            ],
            defaultErrorHandler: false,
            routePrefix: "/api",
        });

        // HealthController senza prefisso
        useExpressServer(this.app, {
            controllers: [HealthController],
            defaultErrorHandler: false,
        });
    }

    private setupSwagger(): void {
        const storage = getMetadataArgsStorage();
        const schemas = validationMetadatasToSchemas({
            classValidatorMetadataStorage: getFromContainer(MetadataStorage),
        });

        const spec = routingControllersToSpec(
            storage,
            {
                routePrefix: "/api",
            },
            {
                components: {
                    schemas,
                },
                info: {
                    title: "Anime API",
                    version: "1.0.0",
                },
            }
        );

        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandler);
    }

    private connectDatabase(): void {
        connect()
            .then(() => {
                const PORT = process.env.SERVER_PORT || 3000;
                this.app.listen(PORT, () => logInfo(`Server running on http://localhost:${PORT}`));
            })
            .catch((err) => logError(err));
    }

    private handleProcessEvents(): void {
        process.on("SIGINT", async () => {
            await disconnect();
            logWarn("Server shutting down...");
            process.exit(0);
        });
    }
}

// Avvio dell'applicazione
App.getInstance();
