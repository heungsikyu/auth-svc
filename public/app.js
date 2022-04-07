"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tracer_1 = __importDefault(require("./lib/tracer"));
const { sdk } = (0, tracer_1.default)('jwt-auth-svc-back');
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt_utils_1 = require("./api/utils/jwt.utils");
const logger_middleware_1 = __importDefault(require("./api/middlewares/logger.middleware"));
const member_router_1 = __importDefault(require("./api/routers/member.router"));
const APPNAME = process.env.APP_NAME || 'jwt-auth-svc-back';
const port = process.argv.slice(2)[0]; //서비스앱 port 번호 입력 받기 
const PORT = parseInt(process.env.APP_PORT || port);
const eurekaHelper = require('./lib/eureka-helper');
console.log(APPNAME, PORT);
const app = (0, express_1.default)();
//logger 사용 
app.use(logger_middleware_1.default);
app.use(body_parser_1.default.json());
//라우터
app.use('/xmd-auth/member', member_router_1.default);
app.get('/xmd-auth/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({});
}));
app.get('/xmd-auth/data', (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params) {
            (0, jwt_utils_1.generateToken)();
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
const randomNumber = (min, max) => Math.floor(Math.random() * max + min);
if (process.env.NODE_ENV !== 'production') {
    // const activeSpan: Span | undefined = api.trace.getSpan(api.context.active());
    //   let payload = {
    //     message: 'this-is-my-message'
    // };
    // api.propagation.inject(api.trace.setSpan(api.context.active(), activeSpan), payload);
    //const apiResponse = await axios('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8');
    //console.log('DECODED :', validateToken());
}
app.listen(PORT, () => {
    console.log(`
  ####################################################
  🛡️ XMD JWT AUTH Server listening on port: ${PORT}🛡️
  ####################################################
`);
});
//eureka 서버 등록 
eurekaHelper.registerWithEureka(APPNAME, PORT);
