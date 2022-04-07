"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NAMESPACE = "Member";
const checkToken = (req, res, next) => { };
const register = (req, res, next) => {
    let { id, password } = req.body;
};
const getAllMembers = (req, res, next) => { };
const login = (req, res, next) => {
    let { id, password } = req.body;
    //console.log('id : ', id, ' password : ', password)
    res.status(200).json({
        message: "login",
        id: id,
        password: password
    });
    // next();
};
const logout = (req, res, next) => {
    console.log("logout!!");
    next();
};
exports.default = { checkToken, register, login, logout, getAllMembers };
