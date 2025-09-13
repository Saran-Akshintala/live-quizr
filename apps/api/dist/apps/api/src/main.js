"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.WEB_URL || 'http://localhost:4200',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Live Quizr API')
        .setDescription('Real-time quizzing/events SaaS platform API')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.API_PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Live Quizr API is running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map