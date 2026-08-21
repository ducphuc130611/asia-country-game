// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 2.5
// ============================================================


// ============================================================
// COUNTRY DATABASE
// ============================================================

const countries = [

    ["Vietnam","Hanoi","Dong","Southeast Asia"],
    ["Thailand","Bangkok","Baht","Southeast Asia"],
    ["Laos","Vientiane","Kip","Southeast Asia"],
    ["Cambodia","Phnom Penh","Riel","Southeast Asia"],
    ["Myanmar","Naypyidaw","Kyat","Southeast Asia"],
    ["Malaysia","Kuala Lumpur","Ringgit","Southeast Asia"],
    ["Singapore","Singapore","Dollar","Southeast Asia"],
    ["Indonesia","Jakarta","Rupiah","Southeast Asia"],
    ["Philippines","Manila","Peso","Southeast Asia"],
    ["Brunei","Bandar Seri Begawan","Dollar","Southeast Asia"],
    ["Timor-Leste","Dili","Dollar","Southeast Asia"],

    ["China","Beijing","Yuan","East Asia"],
    ["Japan","Tokyo","Yen","East Asia"],
    ["South Korea","Seoul","Won","East Asia"],
    ["North Korea","Pyongyang","Won","East Asia"],
    ["Mongolia","Ulaanbaatar","Tugrik","East Asia"],
    ["Taiwan","Taipei","Dollar","East Asia"],

    ["India","New Delhi","Rupee","South Asia"],
    ["Pakistan","Islamabad","Rupee","South Asia"],
    ["Bangladesh","Dhaka","Taka","South Asia"],
    ["Nepal","Kathmandu","Rupee","South Asia"],
    ["Bhutan","Thimphu","Ngultrum","South Asia"],
    ["Sri Lanka","Sri Jayawardenepura Kotte","Rupee","South Asia"],
    ["Maldives","Male","Rufiyaa","South Asia"],
    ["Afghanistan","Kabul","Afghani","South Asia"],

    ["Iran","Tehran","Rial","West Asia"],
    ["Iraq","Baghdad","Dinar","West Asia"],
    ["Saudi Arabia","Riyadh","Riyal","West Asia"],
    ["United Arab Emirates","Abu Dhabi","Dirham","West Asia"],
    ["Qatar","Doha","Riyal","West Asia"],
    ["Kuwait","Kuwait City","Dinar","West Asia"],
    ["Bahrain","Manama","Dinar","West Asia"],
    ["Oman","Muscat","Rial","West Asia"],
    ["Yemen","Sanaa","Rial","West Asia"],
    ["Jordan","Amman","Dinar","West Asia"],
    ["Lebanon","Beirut","Pound","West Asia"],
    ["Syria","Damascus","Pound","West Asia"],
    ["Israel","Jerusalem","Shekel","West Asia"],
    ["Turkey","Ankara","Lira","West Asia"],
    ["Palestine","Ramallah","Shekel","West Asia"],
    ["Cyprus","Nicosia","Euro","West Asia"],

    ["Kazakhstan","Astana","Tenge","Central Asia"],
    ["Uzbekistan","Tashkent","Som","Central Asia"],
    ["Turkmenistan","Ashgabat","Manat","Central Asia"],
    ["Kyrgyzstan","Bishkek","Som","Central Asia"],
    ["Tajikistan","Dushanbe","Somoni","Central Asia"],

    ["Azerbaijan","Baku","Manat","Caucasus"],
    ["Armenia","Yerevan","Dram","Caucasus"],
    ["Georgia","Tbilisi","Lari","Caucasus"],

    ["Russia","Moscow","Ruble","North Asia"]

];


// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY = "asia_country_game_profiles_v25";
const CURRENT_PROFILE_KEY = "asia_current_profile_v25";
const DAILY_KEY = "asia_daily_v25";


// ============================================================
// PROFILE
// ============================================================

function newProfile(name) {

    return {

        name: name,

        level: 1,
        xp: 0,

        highScore: 0,

        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalQuestions: 0,

        bestCombo: 0,

        coins: 500,
        totalCoinsEarned: 500,

        hints: 2,
        extraLives: 0,
        doubleXP: 0,
        scoreBoost: 0,
        secondChance: 0,
        luckyAnswer: 0,

        skins: ["Default"],
        equippedSkin: "Default",

        achievements: [],
        chests: {
            Common: 0,
            Rare: 0,
            Epic: 0,
            Legend: 0,
            Mythic: 0,
            Divine: 0
        },

        bossItems: [],

        bossWins: 0,
        dailyWins: 0

    };

}


// ============================================================
// LOAD
// ============================================================

let profiles = [];
let currentProfile = -1;

try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

        profiles = JSON.parse(saved);

        if (!Array.isArray(profiles))
            profiles = [];

    }

}
catch (e) {

    profiles = [];

}


try {

    const savedCurrent =
        localStorage.getItem(CURRENT_PROFILE_KEY);

    if (savedCurrent !== null)
        currentProfile = Number(savedCurrent);

}
catch (e) {

    currentProfile = -1;

}


// ============================================================
// MIGRATION
// ============================================================

function migrateProfile(p) {

    if (!p) return;

    if (!Array.isArray(p.skins))
        p.skins = ["Default"];

    if (!p.equippedSkin)
        p.equippedSkin = "Default";

    if (!Array.isArray(p.achievements))
        p.achievements = [];

    if (!p.chests) {

        p.chests = {
            Common: 0,
            Rare: 0,
            Epic: 0,
            Legend: 0,
            Mythic: 0,
            Divine: 0
        };

    }

    if (!Array.isArray(p.bossItems))
        p.bossItems = [];

    if (typeof p.bossWins !== "number")
        p.bossWins = 0;

    if (typeof p.dailyWins !== "number")
        p.dailyWins = 0;

    if (typeof p.totalCoinsEarned !== "number")
        p.totalCoinsEarned = p.coins || 0;

    if (typeof p.totalGames !== "number")
        p.totalGames = 0;

}

profiles.forEach(migrateProfile);


// ============================================================
// SAVE
// ============================================================

function save() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(profiles)
        );

        localStorage.setItem(
            CURRENT_PROFILE_KEY,
            String(currentProfile)
        );

    }
    catch (e) {

        console.error("Save error:", e);

    }

    updateHeader();
    updateMainProfile();

}


// ============================================================
// CURRENT PROFILE
// ============================================================

function getProfile() {

    if (
        currentProfile < 0 ||
        !profiles[currentProfile]
    )
        return null;

    return profiles[currentProfile];

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(text) {

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


// ============================================================
// SCREEN
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen =>
            screen.classList.remove("active")
        );

    const target =
        document.getElementById(id);

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateHeader();

}


// ============================================================
// TOAST
// ============================================================

let toastTimer = null;

function toast(message) {

    const element =
        document.getElementById("toast");

    if (!element) return;

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        element.classList.remove("show");

    }, 2400);

}


// ============================================================
// HEADER
// ============================================================

function updateHeader() {

    const p = getProfile();

    const name =
        document.getElementById("topName");

    const level =
        document.getElementById("topLevel");

    const coins =
        document.getElementById("topCoins");

    if (!name || !level || !coins)
        return;

    if (!p) {

        name.textContent = "Guest";
        level.textContent = "1";
        coins.textContent = "0";

        return;

    }

    name.textContent = p.name;
    level.textContent = p.level;
    coins.textContent = p.coins;

}


// ============================================================
// PROFILE DISPLAY
// ============================================================

function updateMainProfile() {

    const container =
        document.getElementById("mainProfileInfo");

    if (!container) return;

    const p = getProfile();

    if (!p) {

        container.innerHTML = `
            <p>No profile selected.</p>
            <button onclick="openProfileMenu()">
                👤 Create / Select Profile
            </button>
        `;

        return;

    }

    const accuracy =
        p.totalQuestions > 0
        ? Math.round(
            p.totalCorrect /
            p.totalQuestions * 100
        )
        : 0;

    container.innerHTML = `

        <div class="profile-summary">

            <div>
                <span>👤 Name</span>
                <strong>${escapeHTML(p.name)}</strong>
            </div>

            <div>
                <span>⭐ Level</span>
                <strong>${p.level}</strong>
            </div>

            <div>
                <span>🏆 Rank</span>
                <strong>${getRank(p.level)}</strong>
            </div>

            <div>
                <span>✨ XP</span>
                <strong>${p.xp}</strong>
            </div>

            <div>
                <span>🎯 Accuracy</span>
                <strong>${accuracy}%</strong>
            </div>

            <div>
                <span>🔥 Best Combo</span>
                <strong>${p.bestCombo}</strong>
            </div>

            <div>
                <span>👹 Boss Wins</span>
                <strong>${p.bossWins}</strong>
            </div>

            <div>
                <span>🏅 Achievements</span>
                <strong>${p.achievements.length}</strong>
            </div>

        </div>

    `;

}


// ============================================================
// LEVEL / RANK
// ============================================================

function calculateLevel(xp) {

    return Math.min(
        100,
        Math.floor(xp / 500) + 1
    );

}


const ranks = [

    [1,"Beginner"],
    [3,"Explorer"],
    [5,"Traveler"],
    [8,"Expert"],
    [12,"Master"],
    [20,"Champion"],
    [30,"Elite"],
    [40,"Veteran"],
    [50,"Grandmaster"],
    [60,"Legend"],
    [70,"Mythic"],
    [80,"Immortal"],
    [90,"Celestial"],
    [100,"Divine"]

];


function getRank(level) {

    let result = "Beginner";

    for (const rank of ranks) {

        if (level >= rank[0])
            result = rank[1];

    }

    return result;

}


// ============================================================
// XP / COINS
// ============================================================

function addXP(amount) {

    const p = getProfile();

    if (!p) return;

    const oldLevel = p.level;

    p.xp += Math.max(0, amount);

    p.level = calculateLevel(p.xp);

    if (p.level > oldLevel) {

        const levels = p.level - oldLevel;
        const reward = levels * 500;

        addCoins(reward);

        toast(
            `🎉 LEVEL UP! Lv.${p.level} ${getRank(p.level)} +${reward} Coins`
        );

    }

    checkAchievements();

}


function addCoins(amount) {

    const p = getProfile();

    if (!p) return;

    amount = Math.max(0, Math.floor(amount));

    p.coins += amount;
    p.totalCoinsEarned += amount;

}


// ============================================================
// PROFILES
// ============================================================

function openProfileMenu() {

    renderProfiles();

    showScreen("profileScreen");

}


function createProfileFromInput() {

    const input =
        document.getElementById("profileNameInput");

    if (!input) return;

    const name = input.value.trim();

    if (!name) {

        toast("Enter a profile name.");
        return;

    }

    createProfile(name);

    input.value = "";

}


function createProfile(name) {

    if (profiles.length >= 20) {

        toast("Maximum 20 profiles.");
        return;

    }

    if (
        profiles.some(
            p =>
                p.name.toLowerCase() ===
                name.toLowerCase()
        )
    ) {

        toast("Profile already exists.");
        return;

    }

    profiles.push(newProfile(name));

    currentProfile = profiles.length - 1;

    save();

    renderProfiles();

    toast(`Welcome, ${name}!`);

}


function selectProfile(index) {

    index = Number(index);

    if (
        index < 0 ||
        index >= profiles.length
    )
        return;

    currentProfile = index;

    save();

    renderProfiles();

    toast(`Selected: ${profiles[index].name}`);

}


function deleteProfile() {

    const p = getProfile();

    if (!p) {

        toast("Select a profile first.");
        return;

    }

    if (!confirm(`Delete ${p.name}?`))
        return;

    profiles.splice(currentProfile,1);

    if (!profiles.length)
        currentProfile = -1;

    else if (currentProfile >= profiles.length)
        currentProfile = profiles.length - 1;

    save();

    renderProfiles();

    toast("Profile deleted.");

}


function renderProfiles() {

    const container =
        document.getElementById("profileList");

    if (!container) return;

    container.innerHTML = "";

    if (!profiles.length) {

        container.innerHTML =
            "<p>No profiles yet.</p>";

        return;

    }

    profiles.forEach((p,index) => {

        const div =
            document.createElement("div");

        div.className =
            "profile-item" +
            (
                index === currentProfile
                ? " selected"
                : ""
            );

        div.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(p.name)}
                </strong>

                <br>

                Lv.${p.level}
                |
                ${getRank(p.level)}
                |
                🪙 ${p.coins}

            </div>

            <div class="profile-actions">

                <button
                    onclick="selectProfile(${index})">
                    ${
                        index === currentProfile
                        ? "Selected"
                        : "Select"
                    }
                </button>

                <button
                    class="secondary"
                    onclick="viewProfile(${index})">
                    View
                </button>

            </div>

        `;

        container.appendChild(div);

    });

}


// ============================================================
// VIEW PROFILE
// ============================================================

function viewProfile(index = currentProfile) {

    index = Number(index);

    if (!profiles[index])
        return;

    const p = profiles[index];

    const accuracy =
        p.totalQuestions
        ? Math.round(
            p.totalCorrect /
            p.totalQuestions * 100
        )
        : 0;

    const box =
        document.getElementById("profileDetails");

    if (!box) return;

    box.innerHTML = `

        <h3>👤 ${escapeHTML(p.name)}</h3>

        <div class="profile-detail-grid">

            <div>⭐ Level<strong>${p.level}</strong></div>
            <div>🏆 Rank<strong>${getRank(p.level)}</strong></div>
            <div>✨ XP<strong>${p.xp}</strong></div>
            <div>🪙 Coins<strong>${p.coins}</strong></div>
            <div>🎮 Games<strong>${p.totalGames}</strong></div>
            <div>🎯 Accuracy<strong>${accuracy}%</strong></div>
            <div>🔥 Best Combo<strong>${p.bestCombo}</strong></div>
            <div>👹 Boss Wins<strong>${p.bossWins}</strong></div>
            <div>🏅 Achievements<strong>${p.achievements.length}</strong></div>
            <div>🎨 Skin<strong>${escapeHTML(p.equippedSkin)}</strong></div>

        </div>

    `;

    showScreen("profileViewScreen");

}


// ============================================================
// SHOP ITEMS
// ============================================================

const shopItems = [

    {
        id:"hints",
        name:"💡 Hint",
        price:100,
        description:"Remove two wrong answers."
    },

    {
        id:"extraLives",
        name:"❤️ Extra Life",
        price:250,
        description:"+1 Life."
    },

    {
        id:"doubleXP",
        name:"✨ Double XP",
        price:500,
        description:"Double XP from one correct answer."
    },

    {
        id:"scoreBoost",
        name:"📈 Score Boost",
        price:500,
        description:"+25% score on one answer."
    },

    {
        id:"secondChance",
        name:"🔄 Second Chance",
        price:750,
        description:"Prevent one life loss."
    },

    {
        id:"luckyAnswer",
        name:"🍀 Lucky Answer",
        price:1500,
        description:"Turn one wrong answer into a correct answer."
    },

    {
        id:"megaHint",
        name:"🧠 Mega Hint",
        price:2500,
        description:"Remove three wrong answers."
    },

    {
        id:"timeFreeze",
        name:"❄️ Time Freeze",
        price:3500,
        description:"Premium utility for future timed modes."
    },

    {
        id:"answerShield",
        name:"🛡️ Answer Shield",
        price:5000,
        description:"Protect one mistake without losing combo."
    },

    {
        id:"phoenix",
        name:"🔥 Phoenix Save",
        price:7500,
        description:"Revive once after losing all lives."
    }

];


// ============================================================
// SKINS
// ============================================================

const skins = [

    {
        name:"Default",
        price:0,
        bonus:"No bonus",
        score:1,
        xp:1,
        coins:1
    },

    {
        name:"Bronze Explorer",
        price:1000,
        bonus:"+5% Coins",
        score:1,
        xp:1,
        coins:1.05
    },

    {
        name:"Silver Traveler",
        price:5000,
        bonus:"+10% XP",
        score:1,
        xp:1.10,
        coins:1
    },

    {
        name:"Golden Master",
        price:12000,
        bonus:"+10% Score",
        score:1.10,
        xp:1,
        coins:1
    },

    {
        name:"Platinum Champion",
        price:25000,
        bonus:"+15% Score +5% XP",
        score:1.15,
        xp:1.05,
        coins:1
    },

    {
        name:"Diamond Elite",
        price:50000,
        bonus:"+15% XP +10% Coins",
        score:1,
        xp:1.15,
        coins:1.10
    },

    {
        name:"Celestial",
        price:100000,
        bonus:"+20% Score +20% XP +15% Coins",
        score:1.20,
        xp:1.20,
        coins:1.15
    },

    {
        name:"Divine",
        price:250000,
        bonus:"+30% Score +30% XP +25% Coins",
        score:1.30,
        xp:1.30,
        coins:1.25
    }

];


function getSkin() {

    const p = getProfile();

    if (!p) return skins[0];

    return (
        skins.find(
            s => s.name === p.equippedSkin
        ) || skins[0]
    );

}


// ============================================================
// SHOP
// ============================================================

function openShop() {

    if (!getProfile()) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    updateShop();

    showScreen("shopScreen");

}


function updateShop() {

    const p = getProfile();

    if (!p) return;

    const coins =
        document.getElementById("shopCoins");

    if (coins)
        coins.textContent = p.coins;

    const itemContainer =
        document.getElementById("shopItems");

    if (!itemContainer)
        return;

    itemContainer.innerHTML = "";

    shopItems.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "shop-item";

        const count =
            typeof p[item.id] === "number"
            ? p[item.id]
            : 0;

        div.innerHTML = `

            <h3>${item.name}</h3>

            <p>${item.description}</p>

            <strong>
                ${item.price.toLocaleString()} 🪙
            </strong>

            <small>
                Owned: ${count}
            </small>

            <button
                onclick="buyItem('${item.id}',${item.price})">
                Buy
            </button>

        `;

        itemContainer.appendChild(div);

    });

    renderSkins();

}


function buyItem(item,price) {

    const p = getProfile();

    if (!p) return;

    if (p.coins < price) {

        toast("Not enough Coins.");
        return;

    }

    p.coins -= price;

    if (typeof p[item] !== "number")
        p[item] = 0;

    p[item]++;

    save();

    updateShop();

    toast("🛒 Item purchased!");

}


// ============================================================
// SKIN SHOP
// ============================================================

function renderSkins() {

    const p = getProfile();

    const container =
        document.getElementById("skinShop");

    if (!p || !container)
        return;

    container.innerHTML = "";

    skins.forEach(skin => {

        const owned =
            p.skins.includes(skin.name);

        const equipped =
            p.equippedSkin === skin.name;

        const div =
            document.createElement("div");

        div.className =
            "skin-card" +
            (equipped ? " equipped" : "");

        div.innerHTML = `

            <h3>🎨 ${skin.name}</h3>

            <p>${skin.bonus}</p>

            ${
                skin.price === 0
                ? "<strong>FREE</strong>"
                : `<strong>${skin.price.toLocaleString()} 🪙</strong>`
            }

            <button
                onclick="buyOrEquipSkin('${escapeHTML(skin.name)}')">

                ${
                    equipped
                    ? "Equipped"
                    : owned
                    ? "Equip"
                    : "Buy"
                }

            </button>

        `;

        container.appendChild(div);

    });

}


function buyOrEquipSkin(name) {

    const p = getProfile();

    if (!p) return;

    const skin =
        skins.find(s => s.name === name);

    if (!skin) return;

    if (p.skins.includes(name)) {

        p.equippedSkin = name;

        save();

        renderSkins();

        toast(`🎨 Equipped ${name}`);

        return;

    }

    if (p.coins < skin.price) {

        toast("Not enough Coins.");
        return;

    }

    p.coins -= skin.price;

    p.skins.push(name);
    p.equippedSkin = name;

    save();

    renderSkins();

    toast(`🎨 Unlocked ${name}!`);

}


// ============================================================
// CHESTS
// ============================================================

const chestTypes = {

    Common: {
        price:1000,
        color:"Common"
    },

    Rare: {
        price:3000,
        color:"Rare"
    },

    Epic: {
        price:7500,
        color:"Epic"
    },

    Legend: {
        price:20000,
        color:"Legend"
    },

    Mythic: {
        price:50000,
        color:"Mythic"
    },

    Divine: {
        price:150000,
        color:"Divine"
    }

};


function chestRoll(type) {

    const p = getProfile();

    if (!p) return;

    let reward;

    const roll = Math.random();

    if (type === "Common") {

        if (roll < .50)
            reward = ["coins",500];

        else if (roll < .80)
            reward = ["xp",100];

        else
            reward = ["hints",2];

    }
    else if (type === "Rare") {

        if (roll < .45)
            reward = ["coins",1500];

        else if (roll < .75)
            reward = ["xp",300];

        else if (roll < .92)
            reward = ["secondChance",1];

        else
            reward = ["chest","Epic"];

    }
    else if (type === "Epic") {

        if (roll < .40)
            reward = ["coins",5000];

        else if (roll < .70)
            reward = ["xp",1000];

        else if (roll < .90)
            reward = ["scoreBoost",2];

        else
            reward = ["chest","Legend"];

    }
    else if (type === "Legend") {

        if (roll < .40)
            reward = ["coins",15000];

        else if (roll < .70)
            reward = ["xp",3000];

        else if (roll < .90)
            reward = ["luckyAnswer",2];

        else
            reward = ["chest","Mythic"];

    }
    else if (type === "Mythic") {

        if (roll < .40)
            reward = ["coins",40000];

        else if (roll < .70)
            reward = ["xp",10000];

        else if (roll < .90)
            reward = ["phoenix",1];

        else
            reward = ["chest","Divine"];

    }
    else {

        if (roll < .50)
            reward = ["coins",100000];

        else if (roll < .80)
            reward = ["xp",25000];

        else
            reward = ["divineItem","Celestial Core"];

    }

    applyChestReward(reward,type);

}


function applyChestReward(reward,type) {

    const p = getProfile();

    if (!p) return;

    if (reward[0] === "coins") {

        addCoins(reward[1]);

        toast(
            `🎁 ${type} Chest: +${reward[1]} Coins`
        );

    }

    else if (reward[0] === "xp") {

        addXP(reward[1]);

        toast(
            `🎁 ${type} Chest: +${reward[1]} XP`
        );

    }

    else if (reward[0] === "chest") {

        p.chests[reward[1]]++;

        toast(
            `🎁 ${type} Chest: You received a ${reward[1]} Chest!`
        );

    }

    else if (reward[0] === "divineItem") {

        p.bossItems.push(reward[1]);

        toast(
            `✨ DIVINE REWARD: ${reward[1]}`
        );

    }

    else {

        if (typeof p[reward[0]] !== "number")
            p[reward[0]] = 0;

        p[reward[0]] += reward[1];

        toast(
            `🎁 ${type} Chest: +${reward[1]} item`
        );

    }

    save();

    renderChests();

}


function openChest(type) {

    const p = getProfile();

    if (!p) return;

    if (p.chests[type] <= 0) {

        toast(`You don't have a ${type} Chest.`);
        return;

    }

    p.chests[type]--;

    chestRoll(type);

}


function buyChest(type) {

    const p = getProfile();

    if (!p) return;

    const chest =
        chestTypes[type];

    if (!chest) return;

    if (p.coins < chest.price) {

        toast("Not enough Coins.");
        return;

    }

    p.coins -= chest.price;

    p.chests[type]++;

    save();

    renderChests();

    toast(`🎁 Purchased ${type} Chest!`);

}


function renderChests() {

    const p = getProfile();

    const container =
        document.getElementById("chestShop");

    if (!p || !container)
        return;

    container.innerHTML = "";

    Object.keys(chestTypes).forEach(type => {

        const chest =
            chestTypes[type];

        const div =
            document.createElement("div");

        div.className =
            `chest-card ${type.toLowerCase()}`;

        div.innerHTML = `

            <h3>🎁 ${type} Chest</h3>

            <p>
                Owned:
                <strong>${p.chests[type]}</strong>
            </p>

            <button onclick="openChest('${type}')">
                Open
            </button>

            <button
                class="secondary"
                onclick="buyChest('${type}')">

                Buy
                ${chest.price.toLocaleString()} 🪙

            </button>

        `;

        container.appendChild(div);

    });

}


// ============================================================
// INVENTORY
// ============================================================

function openInventory() {

    if (!getProfile()) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    renderInventory();

    showScreen("inventoryScreen");

}


function renderInventory() {

    const p = getProfile();

    const container =
        document.getElementById("inventoryList");

    if (!p || !container)
        return;

    container.innerHTML = `

        <div class="inventory-item">
            <span>💡 Hint</span>
            <strong>${p.hints}</strong>
        </div>

        <div class="inventory-item">
            <span>❤️ Extra Life</span>
            <strong>${p.extraLives}</strong>
        </div>

        <div class="inventory-item">
            <span>✨ Double XP</span>
            <strong>${p.doubleXP}</strong>
        </div>

        <div class="inventory-item">
            <span>📈 Score Boost</span>
            <strong>${p.scoreBoost}</strong>
        </div>

        <div class="inventory-item">
            <span>🔄 Second Chance</span>
            <strong>${p.secondChance}</strong>
        </div>

        <div class="inventory-item">
            <span>🍀 Lucky Answer</span>
            <strong>${p.luckyAnswer}</strong>
        </div>

        <div class="inventory-item">
            <span>🧠 Mega Hint</span>
            <strong>${p.megaHint || 0}</strong>
        </div>

        <div class="inventory-item">
            <span>❄️ Time Freeze</span>
            <strong>${p.timeFreeze || 0}</strong>
        </div>

        <div class="inventory-item">
            <span>🛡️ Answer Shield</span>
            <strong>${p.answerShield || 0}</strong>
        </div>

        <div class="inventory-item">
            <span>🔥 Phoenix Save</span>
            <strong>${p.phoenix || 0}</strong>
        </div>

        <h3>🎨 Skins</h3>

        <div class="inventory-item">
            <span>Equipped</span>
            <strong>${escapeHTML(p.equippedSkin)}</strong>
        </div>

        <h3>🎁 Chests</h3>

        ${Object.keys(p.chests)
            .map(type => `
                <div class="inventory-item">
                    <span>🎁 ${type}</span>
                    <strong>${p.chests[type]}</strong>
                </div>
            `)
            .join("")}

        <h3>👹 Boss Items</h3>

        ${
            p.bossItems.length
            ? p.bossItems
                .map(item =>
                    `<div class="inventory-item">
                        <span>👹 ${escapeHTML(item)}</span>
                        <strong>✓</strong>
                    </div>`
                )
                .join("")
            : "<p>No Boss-exclusive items yet.</p>"
        }

    `;

}


function openInventoryDuringGame() {

    renderInventory();

    showScreen("inventoryScreen");

}


// ============================================================
// GAME STATE
// ============================================================

let game = {

    mode:"classic",

    difficulty:1,

    question:0,

    totalQuestions:10,

    score:0,

    lives:3,

    combo:0,

    bestCombo:0,

    correct:0,

    wrong:0,

    used:[],

    currentCountry:-1,

    options:[],

    type:1,

    hintUsed:false,

    locked:false

};


// ============================================================
// GAME MENU
// ============================================================

function startGameMenu() {

    if (!getProfile()) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    showScreen("difficultyScreen");

}


// ============================================================
// START CLASSIC
// ============================================================

function startGame(difficulty) {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");
        return;

    }

    difficulty = Number(difficulty);

    if (
        difficulty < 1 ||
        difficulty > 3
    )
        difficulty = 1;

    game = {

        mode:"classic",

        difficulty,

        question:0,

        totalQuestions:10,

        score:0,

        lives:3,

        combo:0,

        bestCombo:0,

        correct:0,

        wrong:0,

        used:[],

        currentCountry:-1,

        options:[],

        type:1,

        hintUsed:false,

        locked:false

    };

    if (p.extraLives > 0) {

        if (
            confirm(
                `You have ${p.extraLives} Extra Life(s).\nUse one?`
            )
        ) {

            p.extraLives--;

            game.lives++;

            save();

        }

    }

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// UNIQUE QUESTION GENERATOR
// ============================================================
//
// Currency and Region are NOT removed.
// Instead, the clue contains an additional unique fact.
//
// Example:
//
// Currency:
// "Which country uses Rupee AND has capital New Delhi?"
//
// Region:
// "Which country is in South Asia AND has capital New Delhi?"
//
// Therefore multiple countries can share the currency/region,
// but only one country matches the complete clue.
// ============================================================

function createOptions(correct,type) {

    const options = [correct];

    const correctCountry =
        countries[correct];

    let attempts = 0;

    while (
        options.length < 4 &&
        attempts < 1000
    ) {

        attempts++;

        const random =
            Math.floor(
                Math.random() *
                countries.length
            );

        if (options.includes(random))
            continue;

        const candidate =
            countries[random];

        // Never use countries sharing the unique clue.

        if (type === 3) {

            if (
                candidate[2] === correctCountry[2] &&
                candidate[1] === correctCountry[1]
            )
                continue;

        }

        if (type === 4) {

            if (
                candidate[3] === correctCountry[3] &&
                candidate[1] === correctCountry[1]
            )
                continue;

        }

        options.push(random);

    }

    while (options.length < 4) {

        const random =
            Math.floor(
                Math.random() *
                countries.length
            );

        if (!options.includes(random))
            options.push(random);

    }

    return shuffle(options);

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    if (
        game.question >=
        game.totalQuestions
    ) {

        finishGame();
        return;

    }

    if (game.lives <= 0) {

        finishGame();
        return;

    }

    game.question++;

    game.hintUsed = false;
    game.locked = false;

    let correct;

    do {

        correct =
            Math.floor(
                Math.random() *
                countries.length
            );

    }
    while (
        game.used.includes(correct)
    );

    game.used.push(correct);

    game.currentCountry = correct;

    if (game.difficulty === 1) {

        game.type = 1;

    }
    else if (game.difficulty === 2) {

        game.type =
            1 +
            Math.floor(
                Math.random() * 2
            );

    }
    else {

        game.type =
            1 +
            Math.floor(
                Math.random() * 4
            );

    }

    game.options =
        createOptions(
            correct,
            game.type
        );

    renderQuestion();

}


// ============================================================
// SHUFFLE
// ============================================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;

}


// ============================================================
// QUESTION RENDER
// ============================================================

function renderQuestion() {

    const c =
        countries[
            game.currentCountry
        ];

    const p =
        getProfile();

    document.getElementById(
        "questionNumber"
    ).textContent =
        `${game.question}/${game.totalQuestions}`;

    document.getElementById(
        "lives"
    ).textContent =
        game.lives;

    document.getElementById(
        "combo"
    ).textContent =
        game.combo;

    document.getElementById(
        "score"
    ).textContent =
        game.score;

    document.getElementById(
        "gameXP"
    ).textContent =
        p ? p.xp : 0;

    document.getElementById(
        "gameCoins"
    ).textContent =
        p ? p.coins : 0;

    document.getElementById(
        "gameLevel"
    ).textContent =
        p ? p.level : 1;

    let title = "";
    let value = "";

    if (game.type === 1) {

        title =
            "Which country has this capital?";

        value =
            c[1];

    }

    else if (game.type === 2) {

        title =
            "What is the capital of this country?";

        value =
            c[0];

    }

    else if (game.type === 3) {

        title =
            "Which country uses this currency and has this capital?";

        value =
            `${c[2]} • Capital: ${c[1]}`;

    }

    else {

        title =
            "Which country belongs to this region and has this capital?";

        value =
            `${c[3]} • Capital: ${c[1]}`;

    }

    document.getElementById(
        "questionType"
    ).textContent =
        title;

    document.getElementById(
        "questionText"
    ).textContent =
        "Choose the correct answer:";

    document.getElementById(
        "questionValue"
    ).textContent =
        value;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    game.options.forEach(
        (index,position) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";

            button.textContent =
                `${position + 1}. ${countries[index][0]}`;

            button.onclick =
                () =>
                    answerQuestion(position);

            answers.appendChild(button);

        }
    );

}


// ============================================================
// ANSWER
// ============================================================

function answerQuestion(position) {

    if (game.locked)
        return;

    const selected =
        game.options[position];

    if (
        selected ===
        game.currentCountry
    ) {

        correctAnswer();
        return;

    }

    const p = getProfile();

    if (
        p &&
        p.luckyAnswer > 0
    ) {

        if (
            confirm(
                "Wrong answer!\nUse Lucky Answer?"
            )
        ) {

            p.luckyAnswer--;

            save();

            correctAnswer(true);

            return;

        }

    }

    wrongAnswer();

}


// ============================================================
// CORRECT
// ============================================================

function correctAnswer(savedByLucky=false) {

    if (game.locked)
        return;

    game.locked = true;

    const p = getProfile();

    game.combo++;
    game.correct++;

    game.bestCombo =
        Math.max(
            game.bestCombo,
            game.combo
        );

    let baseScore =
        game.difficulty === 1
        ? 100
        : game.difficulty === 2
        ? 150
        : 200;

    let gained =
        baseScore +
        (
            game.combo >= 2
            ? game.combo * 25
            : 0
        );

    const skin =
        getSkin();

    gained =
        Math.floor(
            gained * skin.score
        );

    if (p.scoreBoost > 0) {

        if (confirm("Use Score Boost?")) {

            p.scoreBoost--;

            gained =
                Math.floor(
                    gained * 1.25
                );

        }

    }

    game.score += gained;

    let gainedXP =
        50 +
        game.combo * 10;

    gainedXP =
        Math.floor(
            gainedXP * skin.xp
        );

    if (p.doubleXP > 0) {

        if (confirm("Use Double XP?")) {

            p.doubleXP--;

            gainedXP *= 2;

        }

    }

    addXP(gainedXP);

    let coinReward =
        20 +
        game.combo * 5;

    coinReward =
        Math.floor(
            coinReward * skin.coins
        );

    addCoins(coinReward);

    p.totalCorrect++;
    p.totalQuestions++;

    save();

    toast(
        savedByLucky
        ? `🍀 Lucky! +${gained} Score`
        : `✅ Correct! +${gained} Score +${gainedXP} XP +${coinReward} Coins`
    );

    setTimeout(
        nextQuestion,
        850
    );

}


// ============================================================
// WRONG
// ============================================================

function wrongAnswer() {

    if (game.locked)
        return;

    game.locked = true;

    const p = getProfile();

    if (p.secondChance > 0) {

        if (
            confirm(
                "Wrong answer!\nUse Second Chance?"
            )
        ) {

            p.secondChance--;

            game.wrong++;
            game.combo = 0;

            p.totalWrong++;
            p.totalQuestions++;

            save();

            toast("🔄 Second Chance activated!");

            setTimeout(
                nextQuestion,
                850
            );

            return;

        }

    }

    if (p.answerShield > 0) {

        if (
            confirm(
                "Wrong answer!\nUse Answer Shield?"
            )
        ) {

            p.answerShield--;

            game.wrong++;

            p.totalWrong++;
            p.totalQuestions++;

            save();

            toast(
                "🛡️ Answer Shield protected your life!"
            );

            setTimeout(
                nextQuestion,
                850
            );

            return;

        }

    }

    game.wrong++;
    game.combo = 0;
    game.lives--;

    p.totalWrong++;
    p.totalQuestions++;

    save();

    const correctCountry =
        countries[
            game.currentCountry
        ][0];

    toast(
        `❌ Wrong! Correct: ${correctCountry}`
    );

    setTimeout(
        nextQuestion,
        1100
    );

}


// ============================================================
// HINT
// ============================================================

function useHint() {

    if (game.locked)
        return;

    const p = getProfile();

    if (!p) return;

    if (game.hintUsed) {

        toast("Hint already used.");
        return;

    }

    if (p.hints <= 0) {

        toast("You don't have any Hint.");
        return;

    }

    p.hints--;

    game.hintUsed = true;

    game.score =
        Math.max(
            0,
            game.score - 25
        );

    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers button"
            )
        );

    const wrongButtons =
        buttons.filter(
            (button,index) =>
                game.options[index] !==
                game.currentCountry
        );

    shuffle(wrongButtons);

    wrongButtons
        .slice(0,2)
        .forEach(button =>
            button.classList.add("removed")
        );

    save();

    document.getElementById(
        "score"
    ).textContent =
        game.score;

    toast("💡 Hint used! -25 Score");

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    const p = getProfile();

    if (!p) return;

    const completionReward =
        100 +
        (
            game.correct ===
            game.totalQuestions
            ? 250
            : 0
        ) +
        (
            game.difficulty === 3
            ? 100
            : 0
        );

    addCoins(completionReward);

    p.totalGames++;

    p.bestCombo =
        Math.max(
            p.bestCombo,
            game.bestCombo
        );

    let newHighScore = false;

    if (game.score > p.highScore) {

        p.highScore =
            game.score;

        newHighScore = true;

    }

    checkAchievements();

    save();

    let message;

    if (newHighScore)
        message = "🏆 NEW HIGH SCORE!";

    else if (
        game.correct ===
        game.totalQuestions
    )
        message = "🎉 PERFECT GAME!";

    else
        message =
            `Game reward: +${completionReward} Coins`;

    const result =
        document.getElementById("resultInfo");

    result.innerHTML = `

        <div class="result-message">
            ${message}
        </div>

        <div class="result-stat">
            <span>🎮 Mode</span>
            <strong>Classic</strong>
        </div>

        <div class="result-stat">
            <span>⭐ Score</span>
            <strong>${game.score}</strong>
        </div>

        <div class="result-stat">
            <span>✅ Correct</span>
            <strong>${game.correct}</strong>
        </div>

        <div class="result-stat">
            <span>❌ Wrong</span>
            <strong>${game.wrong}</strong>
        </div>

        <div class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>${game.bestCombo}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>${p.coins}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Level</span>
            <strong>${p.level} (${getRank(p.level)})</strong>
        </div>

    `;

    showScreen("resultScreen");

}


// ============================================================
// QUIT
// ============================================================

function confirmQuitGame() {

    if (game.locked)
        return;

    if (
        confirm(
            "Quit this game?\nCurrent progress will be lost."
        )
    ) {

        game.locked = true;

        goHome();

    }

}


// ============================================================
// BOSS SYSTEM
// ============================================================

const bosses = [

    {
        name:"Iron Khan",
        hp:1000,
        rewardCoins:5000,
        rewardXP:1000,
        chest:"Rare",
        item:"Khan's Compass"
    },

    {
        name:"Dragon Emperor",
        hp:2500,
        rewardCoins:15000,
        rewardXP:3000,
        chest:"Epic",
        item:"Dragon Scale"
    },

    {
        name:"Celestial Guardian",
        hp:5000,
        rewardCoins:50000,
        rewardXP:10000,
        chest:"Legend",
        item:"Celestial Seal"
    },

    {
        name:"Mythic Sovereign",
        hp:10000,
        rewardCoins:150000,
        rewardXP:30000,
        chest:"Mythic",
        item:"Sovereign Crown"
    },

    {
        name:"DIVINE DRAGON",
        hp:25000,
        rewardCoins:500000,
        rewardXP:100000,
        chest:"Divine",
        item:"Divine Dragon Heart"
    }

];


let bossGame = {

    boss:null,
    hp:0,
    maxHp:0,
    question:0,
    totalQuestions:15,
    score:0,
    correct:0,
    locked:false

};


function startBossMode() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    const boss =
        bosses[
            Math.floor(
                Math.random() *
                bosses.length
            )
        ];

    bossGame = {

        boss,

        hp:boss.hp,
        maxHp:boss.hp,

        question:0,

        totalQuestions:15,

        score:0,

        correct:0,

        locked:false

    };

    showScreen("bossScreen");

    nextBossQuestion();

}


function nextBossQuestion() {

    if (bossGame.question >= bossGame.totalQuestions) {

        finishBoss(false);

        return;

    }

    if (bossGame.hp <= 0) {

        finishBoss(true);

        return;

    }

    bossGame.question++;

    bossGame.locked = false;

    const correct =
        Math.floor(
            Math.random() *
            countries.length
        );

    const options =
        createOptions(correct,1);

    bossGame.currentCountry = correct;
    bossGame.options = options;

    const c = countries[correct];

    document.getElementById(
        "bossName"
    ).textContent =
        `👹 ${bossGame.boss.name}`;

    document.getElementById(
        "bossHP"
    ).textContent =
        `${bossGame.hp}/${bossGame.maxHp}`;

    document.getElementById(
        "bossQuestion"
    ).textContent =
        `${bossGame.question}/${bossGame.totalQuestions}`;

    document.getElementById(
        "bossValue"
    ).textContent =
        c[1];

    const answers =
        document.getElementById(
            "bossAnswers"
        );

    answers.innerHTML = "";

    options.forEach((index,pos) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            `${pos + 1}. ${countries[index][0]}`;

        button.onclick =
            () =>
                answerBoss(pos);

        answers.appendChild(button);

    });

}


function answerBoss(position) {

    if (bossGame.locked)
        return;

    bossGame.locked = true;

    const selected =
        bossGame.options[position];

    const correct =
        bossGame.currentCountry;

    if (selected === correct) {

        const damage =
            100 +
            Math.floor(
                Math.random() * 151
            );

        bossGame.hp =
            Math.max(
                0,
                bossGame.hp - damage
            );

        bossGame.correct++;

        bossGame.score += damage;

        toast(
            `⚔️ HIT! Boss -${damage} HP`
        );

    }
    else {

        toast("❌ MISS! The boss attacks!");

    }

    setTimeout(
        nextBossQuestion,
        850
    );

}


function finishBoss(victory) {

    const p = getProfile();

    if (!p) return;

    const box =
        document.getElementById("bossResult");

    if (victory) {

        p.bossWins++;

        addCoins(
            bossGame.boss.rewardCoins
        );

        addXP(
            bossGame.boss.rewardXP
        );

        p.chests[
            bossGame.boss.chest
        ]++;

        if (
            !p.bossItems.includes(
                bossGame.boss.item
            )
        ) {

            p.bossItems.push(
                bossGame.boss.item
            );

        }

        checkAchievements();

        save();

        box.innerHTML = `

            <div class="result-message boss-win">
                👑 BOSS DEFEATED!
            </div>

            <div class="result-stat">
                <span>👹 Boss</span>
                <strong>${bossGame.boss.name}</strong>
            </div>

            <div class="result-stat">
                <span>⚔️ Damage</span>
                <strong>${bossGame.score}</strong>
            </div>

            <div class="result-stat">
                <span>🪙 Coins</span>
                <strong>+${bossGame.boss.rewardCoins}</strong>
            </div>

            <div class="result-stat">
                <span>✨ XP</span>
                <strong>+${bossGame.boss.rewardXP}</strong>
            </div>

            <div class="result-stat">
                <span>🎁 Chest</span>
                <strong>${bossGame.boss.chest}</strong>
            </div>

            <div class="result-stat">
                <span>👹 Exclusive Item</span>
                <strong>${bossGame.boss.item}</strong>
            </div>

        `;

    }
    else {

        box.innerHTML = `

            <div class="result-message">
                💀 BOSS SURVIVED
            </div>

            <div class="result-stat">
                <span>👹 Boss HP Remaining</span>
                <strong>${bossGame.hp}</strong>
            </div>

            <div class="result-stat">
                <span>⚔️ Damage Dealt</span>
                <strong>${bossGame.score}</strong>
            </div>

        `;

    }

    showScreen("bossResultScreen");

}


// ============================================================
// ACHIEVEMENTS
// ============================================================

const achievements = [

    {
        id:"first_game",
        name:"First Steps",
        description:"Complete your first game.",
        reward:500
    },

    {
        id:"perfect",
        name:"Perfect!",
        description:"Answer all 10 Classic questions correctly.",
        reward:2000
    },

    {
        id:"combo10",
        name:"Combo Master",
        description:"Reach a 10 combo.",
        reward:3000
    },

    {
        id:"rich",
        name:"Rich Explorer",
        description:"Own 50,000 Coins.",
        reward:5000
    },

    {
        id:"level20",
        name:"Champion",
        description:"Reach Level 20.",
        reward:5000
    },

    {
        id:"level50",
        name:"Grandmaster",
        description:"Reach Level 50.",
        reward:15000
    },

    {
        id:"level100",
        name:"DIVINE",
        description:"Reach Level 100.",
        reward:100000
    },

    {
        id:"boss1",
        name:"Boss Hunter",
        description:"Defeat your first boss.",
        reward:5000
    },

    {
        id:"boss10",
        name:"Boss Slayer",
        description:"Defeat 10 bosses.",
        reward:25000
    },

    {
        id:"skin",
        name:"Fashion Explorer",
        description:"Own 3 skins.",
        reward:5000
    },

    {
        id:"chest",
        name:"Treasure Hunter",
        description:"Open a chest.",
        reward:1000
    }

];


function checkAchievements() {

    const p = getProfile();

    if (!p) return;

    achievements.forEach(a => {

        if (p.achievements.includes(a.id))
            return;

        let unlocked = false;

        if (a.id === "first_game")
            unlocked = p.totalGames >= 1;

        else if (a.id === "perfect")
            unlocked =
                game.correct === 10 &&
                game.totalQuestions === 10;

        else if (a.id === "combo10")
            unlocked = p.bestCombo >= 10;

        else if (a.id === "rich")
            unlocked = p.coins >= 50000;

        else if (a.id === "level20")
            unlocked = p.level >= 20;

        else if (a.id === "level50")
            unlocked = p.level >= 50;

        else if (a.id === "level100")
            unlocked = p.level >= 100;

        else if (a.id === "boss1")
            unlocked = p.bossWins >= 1;

        else if (a.id === "boss10")
            unlocked = p.bossWins >= 10;

        else if (a.id === "skin")
            unlocked = p.skins.length >= 3;

        if (unlocked) {

            p.achievements.push(a.id);

            addCoins(a.reward);

            toast(
                `🏅 ACHIEVEMENT: ${a.name}! +${a.reward} Coins`
            );

        }

    });

    save();

}


function openAchievements() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    const container =
        document.getElementById(
            "achievementList"
        );

    container.innerHTML = "";

    achievements.forEach(a => {

        const unlocked =
            p.achievements.includes(a.id);

        const div =
            document.createElement("div");

        div.className =
            "achievement-item" +
            (unlocked ? " unlocked" : "");

        div.innerHTML = `

            <div>

                <h3>
                    ${unlocked ? "🏆" : "🔒"}
                    ${a.name}
                </h3>

                <p>${a.description}</p>

            </div>

            <strong>
                +${a.reward} 🪙
            </strong>

        `;

        container.appendChild(div);

    });

    showScreen("achievementScreen");

}


// ============================================================
// DAILY CHALLENGE
// ============================================================

function getTodayKey() {

    const d = new Date();

    return [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
    ].join("-");

}


function getDailyState() {

    const key = getTodayKey();

    let state;

    try {

        state =
            JSON.parse(
                localStorage.getItem(DAILY_KEY)
            );

    }
    catch (e) {

        state = null;

    }

    if (
        !state ||
        state.date !== key
    ) {

        state = {

            date:key,
            completed:false,
            score:0,
            correct:0

        };

        localStorage.setItem(
            DAILY_KEY,
            JSON.stringify(state)
        );

    }

    return state;

}


function openDailyChallenge() {

    if (!getProfile()) {

        toast("Create/select a profile first.");
        openProfileMenu();
        return;

    }

    const state =
        getDailyState();

    const info =
        document.getElementById(
            "dailyInfo"
        );

    if (state.completed) {

        info.innerHTML = `
            <div class="result-message">
                ✅ Today's Challenge Completed!
            </div>

            <p>
                Score: <strong>${state.score}</strong>
            </p>

            <p>
                Correct:
                <strong>${state.correct}/10</strong>
            </p>
        `;

    }
    else {

        info.innerHTML = `
            <div class="result-message">
                🎯 10 questions • Special rewards
            </div>

            <p>
                Reward:
                🪙 5,000 Coins +
                🎁 Rare Chest
            </p>
        `;

    }

    showScreen("dailyScreen");

}


function startDailyChallenge() {

    const p = getProfile();

    if (!p) return;

    const state =
        getDailyState();

    if (state.completed) {

        toast("Daily Challenge already completed today.");
        return;

    }

    game = {

        mode:"daily",

        difficulty:3,

        question:0,

        totalQuestions:10,

        score:0,

        lives:3,

        combo:0,

        bestCombo:0,

        correct:0,

        wrong:0,

        used:[],

        currentCountry:-1,

        options:[],

        type:1,

        hintUsed:false,

        locked:false

    };

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// COUNTRY DATABASE
// ============================================================

function openCountries() {

    const container =
        document.getElementById("countryList");

    container.innerHTML = "";

    document.getElementById(
        "countryCount"
    ).textContent =
        countries.length;

    countries.forEach((c,index) => {

        const div =
            document.createElement("div");

        div.className =
            "country-card";

        div.innerHTML = `

            <h3>
                ${index + 1}.
                ${escapeHTML(c[0])}
            </h3>

            <p>🏛️ Capital: ${escapeHTML(c[1])}</p>
            <p>💰 Currency: ${escapeHTML(c[2])}</p>
            <p>🌏 Region: ${escapeHTML(c[3])}</p>

        `;

        container.appendChild(div);

    });

    showScreen("countriesScreen");

}


// ============================================================
// FINISH DAILY
// ============================================================

function finishDailyIfNeeded() {

    if (game.mode !== "daily")
        return false;

    const state =
        getDailyState();

    if (state.completed)
        return true;

    state.completed = true;
    state.score = game.score;
    state.correct = game.correct;

    localStorage.setItem(
        DAILY_KEY,
        JSON.stringify(state)
    );

    const p = getProfile();

    if (p) {

        p.dailyWins++;

        addCoins(5000);

        p.chests.Rare++;

        save();

    }

    return true;

}


// ============================================================
// OVERRIDE FINISH FOR DAILY
// ============================================================

const originalFinishGame = finishGame;

finishGame = function() {

    if (game.mode === "daily") {

        const p = getProfile();

        if (!p) return;

        const completed =
            finishDailyIfNeeded();

        document.getElementById(
            "resultInfo"
        ).innerHTML = `

            <div class="result-message">
                🎯 DAILY CHALLENGE COMPLETE!
            </div>

            <div class="result-stat">
                <span>⭐ Score</span>
                <strong>${game.score}</strong>
            </div>

            <div class="result-stat">
                <span>✅ Correct</span>
                <strong>${game.correct}</strong>
            </div>

            <div class="result-stat">
                <span>🪙 Reward</span>
                <strong>+5,000 Coins</strong>
            </div>

            <div class="result-stat">
                <span>🎁 Reward</span>
                <strong>Rare Chest</strong>
            </div>

        `;

        showScreen("resultScreen");

        return;

    }

    originalFinishGame();

};


// ============================================================
// RULES / INFO / UPDATE
// ============================================================

function openRules() {
    showScreen("rulesScreen");
}


function openUpdateLog() {
    showScreen("updateScreen");
}


function openInfo() {
    showScreen("infoScreen");
}


function goHome() {
    showScreen("homeScreen");
    updateMainProfile();
}


// ============================================================
// OWNER PANEL
// ============================================================
//
// IMPORTANT:
// This is client-side only.
// It is NOT real server security.
// Do not store a real production secret here.
// ============================================================

let ownerMode = false;

function openOwnerPanel() {

    if (!ownerMode) {

        const code =
            prompt(
                "OWNER ACCESS\nEnter Owner Code:"
            );

        if (code !== "ASIA-OWNER-250")
            return;

        ownerMode = true;

    }

    renderOwnerPanel();

    showScreen("ownerScreen");

}


function renderOwnerPanel() {

    const p = getProfile();

    const container =
        document.getElementById("ownerControls");

    if (!container) return;

    container.innerHTML = `

        <div class="owner-warning">
            👑 OWNER MODE ACTIVE
        </div>

        <button onclick="ownerAddCoins()">
            🪙 Add 100,000 Coins
        </button>

        <button onclick="ownerAddXP()">
            ✨ Add 50,000 XP
        </button>

        <button onclick="ownerLevelUp()">
            🚀 Level +10
        </button>

        <button onclick="ownerGiveItems()">
            🎁 Give Premium Items
        </button>

        <button onclick="ownerGiveChests()">
            🎁 Give One of Every Chest
        </button>

        <button onclick="ownerUnlockSkins()">
            🎨 Unlock All Skins
        </button>

        <button onclick="ownerUnlockAchievements()">
            🏆 Unlock All Achievements
        </button>

        <button onclick="ownerBossReward()">
            👹 Give Boss Exclusive Items
        </button>

        <button
            class="danger"
            onclick="ownerResetProfile()">
            ⚠️ Reset Current Profile
        </button>

        <button
            class="secondary"
            onclick="ownerMode=false;goHome()">
            Exit Owner Mode
        </button>

    `;

}


function ownerAddCoins() {

    const p = getProfile();

    if (!p) return;

    addCoins(100000);

    save();

    toast("👑 Owner: +100,000 Coins");

}


function ownerAddXP() {

    const p = getProfile();

    if (!p) return;

    addXP(50000);

    save();

    toast("👑 Owner: +50,000 XP");

}


function ownerLevelUp() {

    const p = getProfile();

    if (!p) return;

    p.level =
        Math.min(
            100,
            p.level + 10
        );

    p.xp =
        Math.max(
            p.xp,
            (p.level - 1) * 500
        );

    save();

    toast("👑 Owner: Level increased!");

}


function ownerGiveItems() {

    const p = getProfile();

    if (!p) return;

    p.hints += 20;
    p.extraLives += 20;
    p.doubleXP += 20;
    p.scoreBoost += 20;
    p.secondChance += 20;
    p.luckyAnswer += 20;
    p.megaHint = (p.megaHint || 0) + 20;
    p.timeFreeze = (p.timeFreeze || 0) + 20;
    p.answerShield = (p.answerShield || 0) + 20;
    p.phoenix = (p.phoenix || 0) + 20;

    save();

    toast("👑 Owner: Premium items granted!");

}


function ownerGiveChests() {

    const p = getProfile();

    if (!p) return;

    Object.keys(p.chests)
        .forEach(
            type => p.chests[type]++
        );

    save();

    toast("👑 Owner: All chests +1");

}


function ownerUnlockSkins() {

    const p = getProfile();

    if (!p) return;

    skins.forEach(skin => {

        if (!p.skins.includes(skin.name))
            p.skins.push(skin.name);

    });

    save();

    toast("👑 Owner: All skins unlocked!");

}


function ownerUnlockAchievements() {

    const p = getProfile();

    if (!p) return;

    achievements.forEach(a => {

        if (!p.achievements.includes(a.id))
            p.achievements.push(a.id);

    });

    save();

    toast("👑 Owner: All achievements unlocked!");

}


function ownerBossReward() {

    const p = getProfile();

    if (!p) return;

    bosses.forEach(boss => {

        if (!p.bossItems.includes(boss.item))
            p.bossItems.push(boss.item);

    });

    save();

    toast("👑 Owner: Boss items granted!");

}


function ownerResetProfile() {

    if (!getProfile())
        return;

    if (
        !confirm(
            "RESET CURRENT PROFILE?\nThis cannot be undone."
        )
    )
        return;

    const name =
        getProfile().name;

    profiles[currentProfile] =
        newProfile(name);

    save();

    toast("👑 Profile reset.");

    renderOwnerPanel();

}


// ============================================================
// OWNER HOTKEY
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() === "o" &&
            !event.ctrlKey &&
            !event.altKey &&
            !event.shiftKey
        ) {

            const tag =
                document.activeElement?.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA"
            )
                return;

            openOwnerPanel();

        }

    }
);


// ============================================================
// INITIALIZATION
// ============================================================

function initialize() {

    if (
        currentProfile >= 0 &&
        !profiles[currentProfile]
    ) {

        currentProfile = -1;

    }

    profiles.forEach(migrateProfile);

    updateHeader();
    updateMainProfile();

    renderChests();

}

initialize();
