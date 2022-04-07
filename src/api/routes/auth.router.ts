import express, { Request, Response, NextFunction, response } from "express";
import authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.get('/',(req: Request, res: Response, next: NextFunction) =>{
    console.log('get / ');
    next();
    
})
authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.login);
authRouter.post("/logout", authController.logout);

export { authRouter }   
