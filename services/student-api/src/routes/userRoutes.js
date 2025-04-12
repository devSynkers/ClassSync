import express from "express";

import {userProfile} from "../controllers/userController.js"

const router = express.Router();

router.get("/user",userProfile);

export default router;