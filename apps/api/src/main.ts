import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  const origin = req.header('Origin');
  // TODO: CORS のために拡張機能の ID が必要だが、リリースまで決まらないので一旦すべて許可する
  if (origin?.startsWith('chrome-extension://')) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: true }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptionsDelegate,
  });
  // somewhere in your initialization file
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
