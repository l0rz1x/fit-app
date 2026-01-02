const axios = require("axios");
require("dotenv").config();

const getNutritionResponse = async (nutritionPayload) => {
  const nutrition_url = process.env.NUTRITION_API_URL;

  try {
    const config = {
      auth: {
        username: process.env.AI_API_USERNAME,
        password: process.env.AI_API_PASSWORD,
      },
    };
    const response = await axios.post(nutrition_url, nutritionPayload, config);
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

module.exports = { getNutritionResponse };
