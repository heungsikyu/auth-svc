"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const member_controller_1 = __importDefault(require("../../api/controllers/member.controller"));
const router = express_1.default.Router();
router.post("/login", member_controller_1.default.login);
router.post("/logout", member_controller_1.default.logout);
module.exports = router;
