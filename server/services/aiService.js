const axios = require("axios");
const { validateToken } = require("../middlewares/authMiddleware");
require("dotenv").config();

const getAIResponse = async (userMessage) => {
  const rag_url = process.env.RAG_API_URL;

  try {
    const config = {
      auth: {
        username: process.env.AI_API_USERNAME,
        password: process.env.AI_API_PASSWORD,
      },
    };
    const response = await axios.post(
      rag_url,
      {
        message: userMessage,
      },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("AI Servis Hatası (Status):", error.response.status);
      console.error("Hata Mesajı:", error.response.data);
    } else {
      console.error("AI Servis Bağlantı Hatası:", error.message);
    }
    return null;
  }
};

module.exports = { getAIResponse };
