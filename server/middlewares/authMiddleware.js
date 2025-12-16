const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  // 1. Frontend "Authorization" header'ı gönderiyor, onu yakalıyoruz.
  const authHeader = req.header("Authorization");

  // Header hiç yoksa hata dön
  if (!authHeader) {
    return res.status(401).json({ error: "Giriş yapmadınız! (Header eksik)" });
  }

  // 2. Frontend "Bearer <token>" formatında gönderdiği için "Bearer " kısmını ayırıyoruz.
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token bulunamadı!" });
  }

  try {
    // 3. Token'ı doğrula
    // .env dosyasındaki ismin tam olarak "JWT_SECRET" olduğundan emin ol
    const validToken = verify(token, process.env.JWT_SECRET);

    // 4. Doğrulanan veriyi req.user içine at (Controller'da req.user.id buradan gelir)
    req.user = validToken;

    if (validToken) {
      return next(); // Controller'a geç
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Geçersiz Token veya Süresi Dolmuş." });
  }
};

module.exports = { validateToken };
