import path from "path";
import { Sequelize } from "sequelize-typescript";
import AnimeDetails from "@/models/AnimeDetails";
import AnimeReferences from "@/models/AnimeReferences";
import TagDetails from "@/models/TagDetails";
import TagReferences from "@/models/TagReferences";
import AssetImages from "@/models/AssetImages";
import AnimeTags from "@/models/AnimeTags";
import { logVerbose, logWarn, logError } from "@/shared/logger";

// Configura Sequelize per SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.NODE_ENV === "development"
        ? path.resolve(__dirname, "..", "..", "data", process.env.STORAGE_FILE || "db_dump.db")
        : path.resolve(process.cwd(), "data", process.env.STORAGE_FILE || "db_dump.db"),
    logging: process.env.LOGGING_DB === "true" ? logVerbose : false,
    models: [AnimeDetails, AnimeReferences, TagDetails, TagReferences, AssetImages, AnimeTags],
});

// Connetti al database
export async function connect() {
    try {
        await sequelize.authenticate();
        logWarn("Database connection established successfully.");
        await sequelize.sync();
        logWarn("Database synchronized.");
    } catch (error) {
        if (error instanceof Error) {
            logError(`Database connection error: ${error.message}`);
        } else {
            logError("Unknown database connection error.");
        }
        throw error; // Rilancia l'errore per la gestione a monte
    }
}

// Disconnetti dal database
export async function disconnect() {
    try {
        await sequelize.close();
        logWarn("Database connection closed.");
    } catch (error) {
        if (error instanceof Error) {
            logError(`Database disconnection error: ${error.message}`);
        } else {
            logError("Unknown database disconnection error.");
        }
        throw error; // Rilancia l'errore per la gestione a monte
    }
}

export default sequelize;
