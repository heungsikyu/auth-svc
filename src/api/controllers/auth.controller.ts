import { Request, Response, NextFunction } from "express";
import { generateToken, validateToken } from '../utils/jwt.utils';


const NAMESPACE = "Member";

const checkToken = (req: Request, res: Response, next: NextFunction) => {};
const signup = (req: Request, res: Response, next: NextFunction) => {
     let { id, password } = req.body;
};
const getAllMembers = (req: Request, res: Response, next: NextFunction) => {};

const login = (req: Request, res:Response, next: NextFunction) => {
     //console.log(req.headers);
     console.log(req.body);
     let { id, password } = req.body;
     console.log('id : ', id, ',  password : ', password)
     console.log('jwtToken :', generateToken());
     res.status(200).json({
          message: "login", 
          id,
          password
     });

    // next();
};
     
const logout = (req: Request, res:Response, next: NextFunction) => {
     console.log("logout!!");
     next();
};

export default { checkToken, signup, login, logout , getAllMembers };







