import { Router } from "express";
import {
  createChatSession,
  sendMessage,
  getUserChatSessions,
  getChatMessages,
  deleteChatSession,
  updateChatTitle,
  getTopSearches,
  searchChats,
  getUserStats
} from "../controllers/chat.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/sessions", verifyJWT, createChatSession);
router.post("/messages", verifyJWT, sendMessage);
router.get("/sessions", verifyJWT, getUserChatSessions);
router.get("/messages/:sessionId", verifyJWT, getChatMessages);
router.delete("/sessions/:sessionId", verifyJWT, deleteChatSession);

router.patch("/sessions/:sessionId",verifyJWT, updateChatTitle);
router.get("/top-searches", verifyJWT, getTopSearches);
router.get("/search", verifyJWT, searchChats);
router.get("/stats", verifyJWT, getUserStats);


export default router;