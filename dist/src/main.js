"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const film_module_1 = require("./film.module");
const common_1 = require("@nestjs/common");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(film_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        validationError: { target: false },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map