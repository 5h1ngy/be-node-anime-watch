import { JsonController, Get } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/health")
export class HealthController {
    @Get("/")
    check() {
        return { status: "OK", timestamp: new Date() };
    }
}
