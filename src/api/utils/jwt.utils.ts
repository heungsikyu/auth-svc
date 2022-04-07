//import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */
export const generateToken = () => {
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


     const signInOptions: jwt.SignOptions = {
          // RS256 uses a public/private key pair. The API provides the private key
          // to generate the JWT. The client gets a public key to validate the
          // signature
          algorithm: "RS256",
          expiresIn: '5m'
     };

     // generate JWT
     jwt.sign(payload, privateKey, signInOptions, (err, token) => {
          console.log("SIGNTOKEN 발급 : ", token)
          if(err)  console.log(err)
          //return token;
     });  
    // return genToken;   
};

interface TokenPayload {
     exp?: number;
     accessTypes?: string[];
     name?: string;
     userId?: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
 export function validateToken(token: string): Promise<TokenPayload> {
     const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'), 'utf8');
     const verifyOptions: jwt.VerifyOptions = {
       algorithms: ['RS256'],
     };
   
     return new Promise((resolve, reject) => {
          jwt.verify(token, publicKey, verifyOptions, (error:any, decoded: any) => {
               if (error){ 
                    return reject(error);
               }else{
                    resolve(decoded);
               }
          });
     });
}
