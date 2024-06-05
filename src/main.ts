import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const appOptions = { cors: true };
    const app = await NestFactory.create<NestExpressApplication>(
        ApplicationModule,
        appOptions,
    );
    app.useStaticAssets(join(__dirname, "./", "public"));
    app.setGlobalPrefix("api");

    const options = new DocumentBuilder()
        .setTitle("Test Lab API")
        .setDescription("Test Lab API description")
        .setVersion("1.0")
        .setBasePath("api")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/docs", app, document);

    await app.listen(3000);
}
bootstrap();
