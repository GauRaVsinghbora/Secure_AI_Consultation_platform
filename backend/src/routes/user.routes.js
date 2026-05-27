import { Router } from "express";
import { registerUser, logoutUser, refreshAccessToken, getUser,contactus } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/google-login", registerUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/refresh-token", refreshAccessToken);
router.get("/get-user",verifyJWT, getUser);
router.post("/contactus", contactus);

export default router;