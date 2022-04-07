import init from './lib/tracer';
const { sdk } = init('jwt-auth-svc-back')

import * as dotenv from 'dotenv';
import express, {Request, Response, NextFunction } from 'express';
import logger from './api/middlewares/logger.middleware';
import indexRouter from './api/routes/index';
const eurekaHelper = require('./lib/eureka-helper');

dotenv.config();
/** APP 환경 변수 */
const APPNAME: string = process.env.APP_NAME || 'xmd-auth-svc-back'; 
const port: number  = parseInt(process.argv.slice(2)[0]) || 3333 ; //서비스앱 port 번호 입력 받기 
const app: express.Application = express();

/** APP 환경셋팅 : middleware 설정 */
//app.use(cors);
app.use(logger); //logger 사용
app.use(express.json()) 

// * ROUTER SETTING
app.use(indexRouter);  

app.listen(port, () => {     
    console.log(`
  ####################################################
  🛡️ XMD AUTH Server listening on port: ${port}🛡️
  ####################################################
`);
});

//eureka 서버 등록 
eurekaHelper.registerWithEureka(APPNAME, port);