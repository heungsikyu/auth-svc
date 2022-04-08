"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = __importDefault(require("./lib/tracer"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const logger_middleware_1 = __importDefault(require("./api/middlewares/logger.middleware"));
const index_1 = __importDefault(require("./api/routes/index"));
const eurekaHelper = require('./lib/eureka-helper');
dotenv.config();
/** APP 환경 변수 */
const APPNAME = process.env.APP_NAME || 'xmd-auth-svc-back';
const port = parseInt(process.argv.slice(2)[0]) || 3333; //서비스앱 port 번호 입력 받기 
const app = (0, express_1.default)();
/** APP 환경셋팅 : middleware 설정 */
//app.use(cors);
app.use(logger_middleware_1.default); //logger 사용
app.use(express_1.default.json());
/* ROUTER SETTING */
app.use(index_1.default);
app.listen(port, () => {
    console.log(`
  ####################################################
  🛡️ XMD AUTH Server listening on port: ${port}🛡️
  ####################################################
`);
});
/* Eureka 서버 등록 */
eurekaHelper.registerWithEureka(APPNAME, port);
const { sdk } = (0, tracer_1.default)('xmd-auth-svc-back');
