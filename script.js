let qrScanner = null;

function startQRScanner() {
  const qrDiv = document.getElementById("qr-reader");
  qrDiv.style.display = "block";
  qrScanner = new Html5Qrcode("qr-reader");

  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      document.getElementById('urlInput').value = decodedText;
      qrScanner.stop().then(() => {
        qrDiv.style.display = "none";
        checkURL();
      });
    },
    () => {}
  ).catch(err => console.error("QR Start Error:", err));
}

function stopQRScanner() {
  if (qrScanner) {
    qrScanner.stop().then(() => {
      document.getElementById("qr-reader").style.display = "none";
    }).catch(console.error);
  }
}

let currentResultText = "";

function isPhishingURL(url) {
  const suspiciousWords = ["login", "verify", "update", "secure", "account", "@", "paypal", "bank", "reset"];
  let score = 0;
  suspiciousWords.forEach(word => {
    if (url.toLowerCase().includes(word)) score++;
  });
  const ipRegex = /^(http[s]?:\/\/)?(\d{1,3}\.){3}\d{1,3}/;
  if (ipRegex.test(url)) score += 2;
  return score;
}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function checkURL() {
  const url = document.getElementById('urlInput').value.trim();
  const resultDiv = document.getElementById('result');
  const confidence = document.getElementById('confidence');
  const spinner = document.getElementById('spinner');
  const copyResult = document.getElementById('copyResult');

  resultDiv.style.display = "none";
  confidence.innerText = "";
  copyResult.style.display = "none";

  if (!url) {
    resultDiv.innerText = "⚠️ Please enter a URL.";
    resultDiv.className = "result phishing";
    resultDiv.style.display = "block";
    return;
  }

  if (!isValidURL(url)) {
    resultDiv.innerText = "❌ Invalid URL format!";
    resultDiv.className = "result phishing";
    resultDiv.style.display = "block";
    return;
  }

  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    const score = isPhishingURL(url);
    if (score >= 3) {
      currentResultText = "🚨 Warning: This link appears suspicious!";
      resultDiv.innerText = currentResultText;
      resultDiv.className = "result phishing";
      confidence.innerText = `Confidence Level: HIGH (${score}/10)`;
    } else {
      currentResultText = "✅ This link looks safe.";
      resultDiv.innerText = currentResultText;
      resultDiv.className = "result safe";
      confidence.innerText = `Confidence Level: LOW (${score}/10)`;
    }
    resultDiv.style.display = "block";
    copyResult.style.display = "block";
  }, 1200);
}

function copyResult() {
  navigator.clipboard.writeText(currentResultText);
  const copyBtn = document.getElementById('copyResult');
  copyBtn.innerText = "✅ Copied!";
  setTimeout(() => {
    copyBtn.innerText = "📋 Copy Result";
  }, 1500);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}  