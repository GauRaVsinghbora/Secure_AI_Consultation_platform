import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ChatSession } from "../models/chatSession.model.js";
import { Message } from "../models/message.model.js";
import axios from "axios";


// fetch doctor
export const getDoctors = async (specialist, lat, lng) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          keyword: specialist,
          key: process.env.GOOGLE_API_KEY
        }
      }
    );

    return response.data.results.slice(0, 5).map(place => ({
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
    let doctors = [];   // ✅ moved outside
    const specialist = "doctor"; // temp hardcode

    try {

        const aiResponse = await axios.post(
            `${process.env.AI_SERVICE_URL}/chat`,
            { message: content }
        );

        aiReply = aiResponse.data?.response;

        if (!aiReply) {
            throw new Error("Invalid AI response");
        }

        // ✅ fetch doctors
        if (specialist && location) {
            const { lat, lng } = location;
            doctors = await getDoctors(specialist, lat, lng);
        }

    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new ApiError(500, "AI service failed");
    }

    // save AI message
    const aiMessage = await Message.create({
        session: sessionId,
        role: "assistant",
        content: aiReply
    });

    // update session timestamp
    await ChatSession.findByIdAndUpdate(sessionId, {
        updatedAt: new Date()
    });

    // ✅ attach doctors INSIDE aiMessage
    const responseMessage = {
        ...aiMessage.toObject(),
        doctors,
        specialist
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                userMessage,
                aiMessage: responseMessage   // ✅ IMPORTANT FIX
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