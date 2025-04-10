import express from "express";
const router = express.Router();
import {login} from './controllers/authController'
router.post('/login',login)

module.exports = router
