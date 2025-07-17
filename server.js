const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBVtP3SoJojXTCx2s5Te2LILA1kBvVm8Fg";

app.post("/check-url", async (req, res) => {
  const url = req.body.url;
  try {
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${AIzaSyBVtP3SoJojXTCx2s5Te2LILA1kBvVm8Fg}`,
      {
        client: {
          clientId: "your-client-name",
          clientVersion: "1.0"
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }]
        }
      }
    );

    if (response.data && response.data.matches) {
      res.json({ safe: false, details: response.data.matches });
    } else {
      res.json({ safe: true });
    }
  } catch (error) {
    res.status(500).json({ error: "API error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
function stopQRScanner() {
  Html5Qrcode.getCameras().then(cameras => {
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.stop().then(() => {
      document.getElementById("qr-reader").style.display = "none";
    });
  });
}
function stopQRScanner() {
  Html5Qrcode.getCameras().then(cameras => {
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.stop().then(() => {
      document.getElementById("qr-reader").style.display = "none";
    });
  });
}
