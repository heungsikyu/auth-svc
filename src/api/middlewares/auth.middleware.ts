import { Request, Response, NextFunction} from 'express';
import { validateToken } from './../utils/jwt.utils';


export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
     try {
          let jwt = req.headers.authorization;
          console.log("[JWT] : ", jwt);

          if(!jwt){
               return res.status(401).json({ message: 'Invalid Token'});
          }

          if(jwt.toLowerCase().startsWith('bearer')){
               jwt = jwt.slice('bearer'.length).trim();
          }

          const decodedToken = await validateToken(jwt);
          console.log('[auth.middleware decodedToken] : ', decodedToken);
          
          // const hasAccessToEndpoint = allowedAccessTypes.some(
          //      (at) => decodedToken.accessTypes.some((uat) => uat === at)
          // );

          // if(!hasAccessToEndpoint){
          //      return res.status(401).json({ message: 'No enough privileges to access endpoint' });
          // }

          next();
     } catch (e:any) {
          console.log('[auth.middleware] : ', e);
          //console.log(error.name)
          if (e.message === 'jwt expired') {
               res.status(401).json({ message: 'Expired token' });
               return;
          }

          res.status(500).json({ message: 'Failed to authenticate user' });
     }
};

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
     let token = req.headers.authorization?.split;
};


