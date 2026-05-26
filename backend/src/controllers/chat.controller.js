import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ChatSession } from "../models/chatSession.model.js";
import { Message } from "../models/message.model.js";
import { Search } from "../models/topSearch.model.js";
import { normalizeQuery } from "../utils/normalizeQuery.js";
import axios from "axios";


// fetch doctor
export const getDoctors = async (specialist, lat, lng) => {
  try {
    const radiuses = [5000, 10000, 20000, 50000];

    for (const radius of radiuses) {
      console.log(`Searching ${specialist} in radius ${radius}`);

      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${lat},${lng}`,
            radius,
            keyword: `${specialist} doctor`,
            type: "doctor",
            key: process.env.GOOGLE_API_KEY
          }
        }
      );

      if (response.data.results.length) {
        console.log(`Found doctors in radius ${radius}`);
        return response.data.results.slice(0, 5).map(place => ({
          name: place.name,
          rating: place.rating,
          address: place.vicinity
        }));
      }
    }

    // ✅ FINAL fallback
    console.log("Fallback to general doctors");

    const fallback = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 50000,
          keyword: "doctor",
          type: "doctor",
          key: process.env.GOOGLE_API_KEY
        }
      }
    );

    return fallback.data.results.slice(0, 5).map(place => ({
      name: place.name,
      rating: place.rating,
      address: place.vicinity
    }));

  } catch (err) {
    console.error("Doctor fetch error:", err.message);
    return [];
  }
};

// send message in chat
export const sendMessage = asyncHandler(async (req, res) => {

    const { sessionId, content, location } = req.body;

    if (!sessionId || !content) {
        throw new ApiError(400, "Session ID and message required");
    }

    console.log("Received message:", content, "Location:", location);

    // ✅ STEP 1: Normalize & store search
    const normalizedQuery = normalizeQuery(content);

    await Search.findOneAndUpdate(
        { query: normalizedQuery },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
    );

    // ----------------------------------------

    const session = await ChatSession.findOne({
        _id: sessionId,
        user: req.user._id
    });

    if (!session) {
        throw new ApiError(404, "Chat session not found");
    }

    // save user message
    const userMessage = await Message.create({
        session: sessionId,
        role: "user",
        content
    });

    let aiReply;
    let doctors = [];
    let specialist;

    try {

        const aiResponse = await axios.post(
            `${process.env.AI_SERVICE_URL}/chat`,
            { message: content }
        );

        aiReply = aiResponse.data?.response;
        specialist = aiResponse.data?.specialist;

        console.log("AI response:", aiReply, "Specialist:", specialist);

        if (!aiReply) {
            throw new Error("Invalid AI response");
        }

        // fetch doctors
        if (specialist && location) {
            const { lat, lng } = location;
            doctors = await getDoctors(specialist, lat, lng);
            console.log("Fetched doctors:", doctors);
        }

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new ApiError(500, "AI service failed");
    }

    // save AI message (with doctors)
    const aiMessage = await Message.create({
        session: sessionId,
        role: "assistant",
        content: aiReply,
        specialist,
        doctors
    });

    // update session timestamp
    await ChatSession.findByIdAndUpdate(sessionId, {
        updatedAt: new Date()
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                userMessage,
                aiMessage   // ✅ no need for manual override now
            },
            "AI response generated"
        )
    );
});

// create new chat
export const createChatSession = asyncHandler(async (req, res) => {
    const { title } = req.body || {};

    const session = await ChatSession.create({
        user: req.user._id,
        title: title || "New Chat"
    });

    if (!session) {
        throw new ApiError(500, "Failed to create chat session");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            session,
            "Chat session created"
        )
    );

});

// update the title
export const updateChatTitle = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { title } = req.body;

  const session = await ChatSession.findByIdAndUpdate(
    sessionId,
    { title },
    { new: true }
  );

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  return res.status(200).json(
    new ApiResponse(200, session, "Title updated")
  );
});

// get chat history
export const getChatMessages = asyncHandler(async (req, res) => {

    const { sessionId } = req.params;

    const messages = await Message
        .find({ session: sessionId })
        .sort({ createdAt: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    );

});

// all chat sessions for user
export const getUserChatSessions = asyncHandler(async (req, res) => {

    const sessions = await ChatSession
        .find({ user: req.user._id })
        .sort({ updatedAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            sessions,
            "Chat sessions fetched"
        )
    );

});

// delete chat session
export const deleteChatSession = asyncHandler(async (req, res) => {

    const { sessionId } = req.params;

    const session = await ChatSession.findOneAndDelete({
        _id: sessionId,
        user: req.user._id
    });

    if (!session) {
        throw new ApiError(404, "Chat session not found");
    }

    await Message.deleteMany({ session: sessionId });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Chat session deleted"
        )
    );

});

//get top serches with normalization
export const getTopSearches = asyncHandler(async (req, res) => {

    const topSearches = await Search.find()
        .sort({ count: -1 })   // highest first
        .limit(10);

    return res.status(200).json(
        new ApiResponse(200, topSearches, "Top searches fetched")
    );
});

export const searchChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { keyword } = req.query;

  if (!keyword) {
    throw new ApiError(400, "Keyword required");
  }

  // find sessions of user
  const sessions = await ChatSession.find({ user: userId });

  const sessionIds = sessions.map(s => s._id);

  // search messages
  const messages = await Message.find({
    session: { $in: sessionIds },
    content: { $regex: keyword, $options: "i" }
  }).populate("session");

  return res.status(200).json(
    new ApiResponse(200, messages, "Search results")
  );
});

export const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const totalChats = await ChatSession.countDocuments({ user: userId });

  const sessions = await ChatSession.find({ user: userId });
  const sessionIds = sessions.map(s => s._id);

  const totalMessages = await Message.countDocuments({
    session: { $in: sessionIds }
  });

  return res.status(200).json(
    new ApiResponse(200, {
      totalChats,
      totalMessages
    }, "User stats fetched")
  );
});