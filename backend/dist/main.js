"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const auth_service_1 = require("./modules/auth/auth.service");
const test_templates_service_1 = require("./modules/test-templates/test-templates.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const authService = app.get(auth_service_1.AuthService);
    const testTemplatesService = app.get(test_templates_service_1.TestTemplatesService);
    try {
        await authService.createDefaultAdmin();
        await testTemplatesService.createDefaultTemplates();
        console.log('Default data initialized successfully');
    }
    catch (error) {
        console.error('Error initializing default data:', error);
    }
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map