import "module-alias/register";
import "./config/alias";
import "./config/env";
import { createExpressServer } from "routing-controllers";
import { connect, disconnect } from "@/config/database";
import { errorHandler } from "@/middleware/errorHandler";
import { AnimeDetailsController } from "@/controllers/AnimeDetailsController";
import { setupHttpLogging, logInfo, logError, logWarn } from "@/utils/logger";


// Registra i controller
const app = createExpressServer({
    controllers: [AnimeDetailsController],
});

setupHttpLogging(app);
app.use(errorHandler);

connect()
    .then(() => {
        const PORT = process.env.SERVER_PORT || 3000;

        app.listen(PORT, () => logInfo(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => logError(err));


process.on("SIGINT", async () => {
    await disconnect();
    logWarn("Server shutting down...");
    process.exit(0);
});
