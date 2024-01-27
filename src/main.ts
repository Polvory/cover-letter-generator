import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3010
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, ()=> console.log(`start on port:${PORT}`));
}
bootstrap();
