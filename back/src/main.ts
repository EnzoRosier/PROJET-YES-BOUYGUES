import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as os from 'os'
import 'dotenv/config';


function getLocalIp(): string | null {
  const interfaces = os.networkInterfaces();

    for (let i = 0; i < interfaces["Wi-Fi"].length; i++) {
      const element = interfaces["Wi-Fi"][i];
      if (element.family == 'IPv4' && !element.internal) {
        return element.address
      }
    }
  return null;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const localIp = getLocalIp()
  console.log("Ip local du serveur : ", localIp)
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (origin.startsWith(`http://${localIp}`) ||
        origin.startsWith(`http://localhost`)) {
          return callback(null, true)
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3001);
}
bootstrap();
