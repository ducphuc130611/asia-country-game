// --- DATABASE CHÂU Á v2.0 ---
const COUNTRIES_DB = [
  { name: "Afghanistan", capital: "Kabul", currency: "Afghani", region: "Nam Á" },
  { name: "Armenia", capital: "Yerevan", currency: "Dram", region: "Tây Á" },
  { name: "Azerbaijan", capital: "Baku", currency: "Manat", region: "Tây Á" },
  { name: "Bahrain", capital: "Manama", currency: "Dinar", region: "Tây Á" },
  { name: "Bangladesh", capital: "Dhaka", currency: "Taka", region: "Nam Á" },
  { name: "Bhutan", capital: "Thimphu", currency: "Ngultrum", region: "Nam Á" },
  { name: "Brunei", capital: "Bandar Seri Begawan", currency: "Brunei Dollar", region: "Đông Nam Á" },
  { name: "Campuchia", capital: "Phnom Penh", currency: "Riel", region: "Đông Nam Á" },
  { name: "Trung Quốc", capital: "Bắc Kinh", currency: "Nhân Dân Tệ", region: "Đông Á" },
  { name: "Cyprus", capital: "Nicosia", currency: "Euro", region: "Tây Á" },
  { name: "Georgia", capital: "Tbilisi", currency: "Lari", region: "Tây Á" },
  { name: "Ấn Độ", capital: "New Delhi", currency: "Rupee", region: "Nam Á" },
  { name: "Indonesia", capital: "Jakarta", currency: "Rupiah", region: "Đông Nam Á" },
  { name: "Iran", capital: "Tehran", currency: "Rial", region: "Tây Á" },
  { name: "Iraq", capital: "Baghdad", currency: "Dinar", region: "Tây Á" },
  { name: "Israel", capital: "Jerusalem", currency: "Shekel", region: "Tây Á" },
  { name: "Nhật Bản", capital: "Tokyo", currency: "Yên", region: "Đông Á" },
  { name: "Jordan", capital: "Amman", currency: "Dinar", region: "Tây Á" },
  { name: "Kazakhstan", capital: "Astana", currency: "Tenge", region: "Trung Á" },
  { name: "Kuwait", capital: "Kuwait City", currency: "Dinar", region: "Tây Á" },
  { name: "Kyrgyzstan", capital: "Bishkek", currency: "Som", region: "Trung Á" },
  { name: "Lào", capital: "Vientiane", currency: "Kip", region: "Đông Nam Á" },
  { name: "Lebanon", capital: "Beirut", currency: "Bảng Lebanon", region: "Tây Á" },
  { name: "Malaysia", capital: "Kuala Lumpur", currency: "Ringgit", region: "Đông Nam Á" },
  { name: "Maldives", capital: "Malé", currency: "Rufiyaa", region: "Nam Á" },
  { name: "Mông Cổ", capital: "Ulaanbaatar", currency: "Tögrög", region: "Đông Á" },
  { name: "Myanmar", capital: "Naypyidaw", currency: "Kyat", region: "Đông Nam Á" },
  { name: "Nepal", capital: "Kathmandu", currency: "Rupee", region: "Nam Á" },
  { name: "Triều Tiên", capital: "Pyongyang", currency: "Won Triều Tiên", region: "Đông Á" },
  { name: "Oman", capital: "Muscat", currency: "Rial", region: "Tây Á" },
  { name: "Pakistan", capital: "Islamabad", currency: "Rupee Pakistan", region: "Nam Á" },
  { name: "Palestine", capital: "Ramallah", currency: "Shekel", region: "Tây Á" },
  { name: "Philippines", capital: "Manila", currency: "Peso", region: "Đông Nam Á" },
  { name: "Qatar", capital: "Doha", currency: "Riyal", region: "Tây Á" },
  { name: "Saudi Arabia", capital: "Riyadh", currency: "Riyal", region: "Tây Á" },
  { name: "Singapore", capital: "Singapore", currency: "Đô la Singapore", region: "Đông Nam Á" },
  { name: "Hàn Quốc", capital: "Seoul", currency: "Won", region: "Đông Á" },
  { name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", currency: "Rupee", region: "Nam Á" },
  { name: "Syria", capital: "Damascus", currency: "Bảng Syria", region: "Tây Á" },
  { name: "Đài Loan", capital: "Taipei", currency: "Đài tệ mới", region: "Đông Á" },
  { name: "Tajikistan", capital: "Dushanbe", currency: "Somoni", region: "Trung Á" },
  { name: "Thái Lan", capital: "Bangkok", currency: "Baht", region: "Đông Nam Á" },
  { name: "Timor-Leste", capital: "Dili", currency: "USD", region: "Đông Nam Á" },
  { name: "Thổ Nhĩ Kỳ", capital: "Ankara", currency: "Lira", region: "Tây Á" },
  { name: "Turkmenistan", capital: "Ashgabat", currency: "Manat", region: "Trung Á" },
  { name: "UAE", capital: "Abu Dhabi", currency: "Dirham", region: "Tây Á" },
  { name: "Uzbekistan", capital: "Tashkent", currency: "Som", region: "Trung Á" },
  { name: "Việt Nam", capital: "Hà Nội", currency: "VND", region: "Đông Nam Á" },
  { name: "Yemen", capital: "Sana'a", currency: "Rial", region: "Tây Á" }
];

// --- QUẢN LÝ DỮ LIỆU & LƯU TRỮ ---
let profiles = JSON.parse(localStorage.getItem("asia_quiz_v2_profiles") || "[]");
let activeProfileIndex = parseInt(localStorage.getItem("asia_quiz_v2_active_idx") || "0", 10);

if (!profiles || profiles.length === 0) {
  profiles = [{
    name: "Player 1",
    level: 1,
    xp: 0,
    coins: 100,
    inventory: { hints: 2, extraLives: 0, doubleXP: 0, secondChance: 0 }
  }];
  activeProfileIndex = 0;
  saveData();
}

let game = {
  active: false,
  difficulty: 1,
  currentQuestion: 1,
  totalQuestions: 10,
  score: 0,
  lives: 3,
  combo: 0,
  earnedXP: 0,
  earnedCoins: 0,
  questionData: null,
  answered: false
};

// --- HÀM TIỆN ÍCH ---
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function saveData() {
  localStorage.setItem("asia_quiz_v2_profiles", JSON.stringify(profiles));
  localStorage.setItem("asia_quiz_v2_active_idx", activeProfileIndex.toString());
}

function getActiveProfile() {
  return profiles[activeProfileIndex] || profiles[0];
}

function updateHeaderAndProfile() {
  const p = getActiveProfile();
  if (!p) return;

  document.getElementById("topName").innerText = p.name;
  document.getElementById("topLevel").innerText = p.level;
  document.getElementById("topCoins").innerText = p.coins;

  const infoEl = document.getElementById("mainProfileInfo");
  if (infoEl) {
    infoEl.innerHTML = `
      <p><strong>👤 Tên:</strong> ${p.name}</p>
      <p><strong>⭐ Cấp độ:</strong> ${p.level} (${p.xp} / ${p.level * 100} XP)</p>
      <p><strong>🪙 Số Xu:</strong> ${p.coins}</p>
    `;
  }
}

// --- PROFILE ---
function renderProfileList() {
  const list = document.getElementById("profileList");
  list.innerHTML = "";
  profiles.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = `item-card ${idx === activeProfileIndex ? "selected" : ""}`;
    item.innerHTML = `
      <div><strong>${p.name}</strong> — Lv.${p.level} | 🪙 ${p.coins}</div>
      <div><button class="select-profile-btn" data-idx="${idx}">${idx === activeProfileIndex ? "Đang chọn" : "Chọn"}</button></div>
    `;
    list.appendChild(item);
  });

  document.querySelectorAll(".select-profile-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-idx"), 10);
      activeProfileIndex = idx;
      saveData();
      updateHeaderAndProfile();
      renderProfileList();
      showToast(`Đã chuyển sang: ${profiles[idx].name}`);
    });
  });
}

function createProfile() {
  const input = document.getElementById("profileNameInput");
  const name = input.value.trim();
  if (!name) return showToast("Vui lòng nhập tên!");

  profiles.push({
    name,
    level: 1,
    xp: 0,
    coins: 50,
    inventory: { hints: 1, extraLives: 0, doubleXP: 0, secondChance: 0 }
  });

  activeProfileIndex = profiles.length - 1;
  saveData();
  input.value = "";
  updateHeaderAndProfile();
  renderProfileList();
  showToast(`Đã tạo hồ sơ "${name}"!`);
}

function deleteProfile() {
  if (profiles.length <= 1) return showToast("Không thể xoá hồ sơ duy nhất!");
  const p = getActiveProfile();
  if (confirm(`Bạn có chắc muốn xoá hồ sơ "${p.name}"?`)) {
    profiles.splice(activeProfileIndex, 1);
    activeProfileIndex = 0;
    saveData();
    updateHeaderAndProfile();
    renderProfileList();
    showToast("Đã xoá hồ sơ.");
  }
}

// --- SHOP & INVENTORY ---
function renderShop() {
  document.getElementById("shopCoins").innerText = getActiveProfile().coins;
}

function buyItem(itemKey, cost) {
  const p = getActiveProfile();
  if (p.coins < cost) return showToast("Không đủ Xu!");
  p.coins -= cost;
  p.inventory[itemKey] = (p.inventory[itemKey] || 0) + 1;
  saveData();
  renderShop();
  updateHeaderAndProfile();
  showToast("Mua thành công!");
}

function renderInventory() {
  const p = getActiveProfile();
  const list = document.getElementById("inventoryList");
  const names = {
    hints: "💡 Thẻ Gợi Ý",
    extraLives: "❤️ Thêm 1 Mạng",
    doubleXP: "✨ Thẻ Nhân Đôi XP",
    secondChance: "🔄 Thẻ Bảo Hiểm"
  };

  list.innerHTML = "";
  Object.keys(p.inventory).forEach(k => {
    const count = p.inventory[k] || 0;
    const row = document.createElement("div");
    row.className = "item-card";
    row.innerHTML = `<span><strong>${names[k] || k}</strong></span> <span>x${count}</span>`;
    list.appendChild(row);
  });
}

// --- TRA CỨU QUỐC GIA ---
function renderCountryDatabase(list) {
  document.getElementById("countryCount").innerText = list.length;
  const container = document.getElementById("countryList");
  container.innerHTML = "";

  list.forEach(c => {
    const card = document.createElement("div");
    card.className = "country-card";
    card.innerHTML = `
      <h3>${c.name}</h3>
      <p>🏛️ <strong>Thủ đô:</strong> ${c.capital}</p>
      <p>💵 <strong>Tiền tệ:</strong> ${c.currency}</p>
      <p>📍 <strong>Khu vực:</strong> ${c.region}</p>
    `;
    container.appendChild(card);
  });
}

function filterCountries() {
  const q = document.getElementById("countrySearch").value.toLowerCase();
  const filtered = COUNTRIES_DB.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.capital.toLowerCase().includes(q) ||
    c.currency.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q)
  );
  renderCountryDatabase(filtered);
}

// --- GAMEPLAY LOGIC ---
function startGame(diff) {
  const p = getActiveProfile();
  let baseLives = 3;

  if (p.inventory.extraLives > 0) {
    p.inventory.extraLives--;
    baseLives += 1;
    saveData();
    showToast("Đã dùng 1 Mạng Thêm! Khởi đầu với 4 ❤️.");
  }

  game = {
    active: true,
    difficulty: diff,
    currentQuestion: 1,
    totalQuestions: 10,
    score: 0,
    lives: baseLives,
    combo: 0,
    earnedXP: 0,
    earnedCoins: 0,
    questionData: null,
    answered: false
  };

  showScreen("gameScreen");
  loadQuestion();
}

function loadQuestion() {
  game.answered = false;
  updateGameUI();

  const targetCountry = COUNTRIES_DB[Math.floor(Math.random() * COUNTRIES_DB.length)];
  let types = ["country_to_capital"];

  if (game.difficulty === 2) {
    types = ["country_to_capital", "capital_to_country"];
  } else if (game.difficulty === 3) {
    types = ["country_to_capital", "capital_to_country", "country_to_currency", "country_to_region"];
  }

  const selectedType = types[Math.floor(Math.random() * types.length)];
  let questionText = "";
  let questionValue = "";
  let correctAnswer = "";
  let poolKey = "";

  switch (selectedType) {
    case "country_to_capital":
      questionText = "Thủ đô của quốc gia này là gì?";
      questionValue = targetCountry.name;
      correctAnswer = targetCountry.capital;
      poolKey = "capital";
      break;
    case "capital_to_country":
      questionText = "Đây là thủ đô của quốc gia nào?";
      questionValue = targetCountry.capital;
      correctAnswer = targetCountry.name;
      poolKey = "name";
      break;
    case "country_to_currency":
      questionText = "Đơn vị tiền tệ của quốc gia này là gì?";
      questionValue = targetCountry.name;
      correctAnswer = targetCountry.currency;
      poolKey = "currency";
      break;
    case "country_to_region":
      questionText = "Quốc gia này thuộc khu vực nào?";
      questionValue = targetCountry.name;
      correctAnswer = targetCountry.region;
      poolKey = "region";
      break;
  }

  // Tạo 4 phương án ngẫu nhiên
  const options = [correctAnswer];
  const pool = [...new Set(COUNTRIES_DB.map(c => c[poolKey]))].filter(val => val !== correctAnswer);

  while (options.length < 4 && pool.length > 0) {
    const randIdx = Math.floor(Math.random() * pool.length);
    options.push(pool.splice(randIdx, 1)[0]);
  }

  options.sort(() => Math.random() - 0.5);

  game.questionData = {
    typeLabel: selectedType.replace(/_/g, " ").toUpperCase(),
    questionText,
    questionValue,
    correctAnswer,
    options
  };

  document.getElementById("questionType").innerText = game.questionData.typeLabel;
  document.getElementById("questionText").innerText = game.questionData.questionText;
  document.getElementById("questionValue").innerText = game.questionData.questionValue;

  const container = document.getElementById("answers");
  container.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer-button";
    btn.innerText = opt;
    btn.addEventListener("click", () => handleAnswer(opt, btn));
    container.appendChild(btn);
  });
}

function updateGameUI() {
  document.getElementById("questionNumber").innerText = `${game.currentQuestion}/${game.totalQuestions}`;
  document.getElementById("lives").innerText = game.lives;
  document.getElementById("combo").innerText = game.combo;
  document.getElementById("score").innerText = game.score;

  const percent = ((game.currentQuestion - 1) / game.totalQuestions) * 100;
  document.getElementById("questionProgress").style.width = `${percent}%`;
}

function handleAnswer(selected, btnEl) {
  if (game.answered) return;
  game.answered = true;

  const p = getActiveProfile();
  const isCorrect = selected === game.questionData.correctAnswer;
  const allBtns = document.querySelectorAll(".answer-button");

  if (isCorrect) {
    btnEl.classList.add("correct");
    game.combo++;

    let gainedScore = 100 + (game.combo * 20);
    let gainedXP = 20 + (game.combo * 5);
    let gainedCoins = 10 + game.combo;

    if (p.inventory.doubleXP > 0) {
      p.inventory.doubleXP--;
      gainedXP *= 2;
    }

    game.score += gainedScore;
    game.earnedXP += gainedXP;
    game.earnedCoins += gainedCoins;

    saveGameGains(gainedXP, gainedCoins);
  } else {
    btnEl.classList.add("wrong");
    allBtns.forEach(b => {
      if (b.innerText === game.questionData.correctAnswer) b.classList.add("correct");
    });

    if (p.inventory.secondChance > 0) {
      p.inventory.secondChance--;
      saveData();
      showToast("🔄 Đã kích hoạt Thẻ Bảo Hiểm! Không bị mất mạng.");
    } else {
      game.lives--;
    }
    game.combo = 0;
  }

  updateGameUI();

  setTimeout(() => {
    if (game.lives <= 0) {
      endGame(false);
    } else if (game.currentQuestion >= game.totalQuestions) {
      endGame(true);
    } else {
      game.currentQuestion++;
      loadQuestion();
    }
  }, 1100);
}

function saveGameGains(xpGain, coinGain) {
  const p = getActiveProfile();
  p.xp += xpGain;
  p.coins += coinGain;

  const reqXP = p.level * 100;
  if (p.xp >= reqXP) {
    p.xp -= reqXP;
    p.level++;
    showToast(`🎉 CHÚC MỪNG! Thăng cấp lên Level ${p.level}!`);
  }
  saveData();
  updateHeaderAndProfile();
}

function useHint() {
  if (game.answered) return;
  const p = getActiveProfile();

  if (p.inventory.hints > 0) {
    p.inventory.hints--;
    saveData();
    executeHint();
    showToast("Đã dùng 1 Gợi Ý từ Túi.");
  } else if (game.score >= 30) {
    game.score -= 30;
    updateGameUI();
    executeHint();
    showToast("Đã dùng Gợi Ý (-30 Điểm).");
  } else {
    showToast("Cần tối thiểu 30 Điểm hoặc Thẻ Gợi Ý!");
  }
}

function executeHint() {
  const btns = Array.from(document.querySelectorAll(".answer-button"));
  const wrongBtns = btns.filter(b => b.innerText !== game.questionData.correctAnswer && !b.classList.contains("removed"));

  wrongBtns.sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(2, wrongBtns.length); i++) {
    wrongBtns[i].classList.add("removed");
  }
}

function endGame(completed) {
  game.active = false;
  document.getElementById("questionProgress").style.width = "100%";
  showScreen("resultScreen");

  const resContainer = document.getElementById("resultInfo");
  resContainer.innerHTML = `
    <div style="font-size: 1.2rem; font-weight: bold; text-align: center; margin-bottom: 1rem; color: ${completed ? 'var(--success)' : 'var(--error)'};">
      ${completed ? "🎉 Hoàn Thành Vòng Chơi!" : "💔 Hết Mạng! Trò Chơi Kết Thúc."}
    </div>
    <div class="result-stat"><span>Tổng điểm:</span><strong>${game.score}</strong></div>
    <div class="result-stat"><span>XP nhận được:</span><strong>+${game.earnedXP}</strong></div>
    <div class="result-stat"><span>Xu nhận được:</span><strong>+${game.earnedCoins} 🪙</strong></div>
    <div class="result-stat"><span>Số câu hoàn thành:</span><strong>${completed ? game.totalQuestions : game.currentQuestion} / ${game.totalQuestions}</strong></div>
  `;
}

// --- GẮN SỰ KIỆN KHỞI TẠO ---
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderAndProfile();
  renderCountryDatabase(COUNTRIES_DB);

  // Điều hướng chính
  document.getElementById("btnPlay").addEventListener("click", () => showScreen("difficultyScreen"));
  document.getElementById("btnShop").addEventListener("click", () => { renderShop(); showScreen("shopScreen"); });
  document.getElementById("btnInventory").addEventListener("click", () => { renderInventory(); showScreen("inventoryScreen"); });
  document.getElementById("btnCountries").addEventListener("click", () => showScreen("countriesScreen"));
  document.getElementById("btnProfile").addEventListener("click", () => { renderProfileList(); showScreen("profileScreen"); });
  document.getElementById("btnRules").addEventListener("click", () => showScreen("rulesScreen"));

  // Nút về trang chủ chung
  document.querySelectorAll(".nav-home").forEach(btn => {
    btn.addEventListener("click", () => {
      showScreen("homeScreen");
      updateHeaderAndProfile();
    });
  });

  // Chọn độ khó
  document.querySelectorAll(".diff-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const diff = parseInt(btn.getAttribute("data-diff"), 10);
      startGame(diff);
    });
  });

  // Mua hàng trong Shop
  document.querySelectorAll(".shop-buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      const cost = parseInt(btn.getAttribute("data-cost"), 10);
      buyItem(item, cost);
    });
  });

  // Nút hành động trong game
  document.getElementById("btnUseHint").addEventListener("click", useHint);
  document.getElementById("btnQuitGame").addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn thoát lượt chơi hiện tại?")) {
      game.active = false;
      showScreen("homeScreen");
      updateHeaderAndProfile();
    }
  });

  document.getElementById("btnPlayAgain").addEventListener("click", () => showScreen("difficultyScreen"));

  // Profile
  document.getElementById("btnCreateProfile").addEventListener("click", createProfile);
  document.getElementById("btnDeleteProfile").addEventListener("click", deleteProfile);

  // Tìm kiếm
  document.getElementById("countrySearch").addEventListener("input", filterCountries);
});
