const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Giriş yapmadınız! (Header eksik)" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token bulunamadı!" });
  }
  try {
    const validToken = verify(token, process.env.JWT_SECRET);

    req.user = validToken;
    req.token = token;

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Geçersiz Token veya Süresi Dolmuş." });
  }
};

module.exports = { validateToken };
