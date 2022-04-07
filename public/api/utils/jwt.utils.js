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
exports.validateToken = exports.generateToken = void 0;
//import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * generates JWT used for local testing
 */
const generateToken = () => {
    // information to be encoded in the JWT
    const payload = {
        name: '유흥식',
        userId: 123,
        accessTypes: [
            'getTeams',
            'addTeams',
            'updateTeams',
            'deleteTeams'
        ]
    };
    // read private key value
    const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'), 'utf8');
    const signInOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: "RS256",
        expiresIn: '5m'
    };
    // generate JWT
    const genToken = jsonwebtoken_1.default.sign(payload, privateKey, signInOptions, function (err, token) {
        console.log("SIGNTOKEN 발급 : ", token);
        if (err)
            console.log(err);
        return token;
    });
    return genToken;
};
exports.generateToken = generateToken;
/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
function validateToken(token) {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'), 'utf8');
    const verifyOptions = {
        algorithms: ['RS256'],
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, publicKey, verifyOptions, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
exports.validateToken = validateToken;
