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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWT = exports.authorize = void 0;
const jwt_utils_1 = require("./../utils/jwt.utils");
const authorize = (allowedAccessTypes) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwt = req.headers.authorization;
        console.log("[JWT] : ", jwt);
        if (!jwt) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        const decodedToken = yield (0, jwt_utils_1.validateToken)(jwt);
        console.log('[auth.middleware decodedToken] : ', decodedToken);
        // const hasAccessToEndpoint = allowedAccessTypes.some(
        //      (at) => decodedToken.accessTypes.some((uat) => uat === at)
        // );
        // if(!hasAccessToEndpoint){
        //      return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        // }
        next();
    }
    catch (e) {
        console.log('[auth.middleware] : ', e);
        //console.log(error.name)
        if (e.message === 'jwt expired') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }
        res.status(500).json({ message: 'Failed to authenticate user' });
    }
});
exports.authorize = authorize;
const extractJWT = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split;
};
exports.extractJWT = extractJWT;
