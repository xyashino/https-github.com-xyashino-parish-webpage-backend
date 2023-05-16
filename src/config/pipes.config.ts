import {ValidationPipeOptions} from "@nestjs/common";


export const PipesConfig:ValidationPipeOptions = {
  disableErrorMessages: false,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
}