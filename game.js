// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 3.0
// ============================================================

const VERSION = "3.0";
const SAVE_KEY = "asia_country_game_v30";


// ============================================================
// COUNTRY DATABASE
// Asia + Europe + Africa
// ============================================================

const countries = [

    // ================= ASIA =================

    ["Vietnam","Hanoi","Dong","Southeast Asia","Asia"],
    ["Thailand","Bangkok","Baht","Southeast Asia","Asia"],
    ["Laos","Vientiane","Kip","Southeast Asia","Asia"],
    ["Cambodia","Phnom Penh","Riel","Southeast Asia","Asia"],
    ["Myanmar","Naypyidaw","Kyat","Southeast Asia","Asia"],
    ["Malaysia","Kuala Lumpur","Ringgit","Southeast Asia","Asia"],
    ["Singapore","Singapore","Dollar","Southeast Asia","Asia"],
    ["Indonesia","Jakarta","Rupiah","Southeast Asia","Asia"],
    ["Philippines","Manila","Peso","Southeast Asia","Asia"],
    ["Brunei","Bandar Seri Begawan","Dollar","Southeast Asia","Asia"],
    ["Timor-Leste","Dili","Dollar","Southeast Asia","Asia"],

    ["China","Beijing","Yuan","East Asia","Asia"],
    ["Japan","Tokyo","Yen","East Asia","Asia"],
    ["South Korea","Seoul","Won","East Asia","Asia"],
    ["North Korea","Pyongyang","Won","East Asia","Asia"],
    ["Mongolia","Ulaanbaatar","Tugrik","East Asia","Asia"],
    ["Taiwan","Taipei","Dollar","East Asia","Asia"],

    ["India","New Delhi","Rupee","South Asia","Asia"],
    ["Pakistan","Islamabad","Rupee","South Asia","Asia"],
    ["Bangladesh","Dhaka","Taka","South Asia","Asia"],
    ["Nepal","Kathmandu","Rupee","South Asia","Asia"],
    ["Bhutan","Thimphu","Ngultrum","South Asia","Asia"],
    ["Sri Lanka","Sri Jayawardenepura Kotte","Rupee","South Asia","Asia"],
    ["Maldives","Male","Rufiyaa","South Asia","Asia"],
    ["Afghanistan","Kabul","Afghani","South Asia","Asia"],

    ["Iran","Tehran","Rial","West Asia","Asia"],
    ["Iraq","Baghdad","Dinar","West Asia","Asia"],
    ["Saudi Arabia","Riyadh","Riyal","West Asia","Asia"],
    ["United Arab Emirates","Abu Dhabi","Dirham","West Asia","Asia"],
    ["Qatar","Doha","Riyal","West Asia","Asia"],
    ["Kuwait","Kuwait City","Dinar","West Asia","Asia"],
    ["Bahrain","Manama","Dinar","West Asia","Asia"],
    ["Oman","Muscat","Rial","West Asia","Asia"],
    ["Yemen","Sanaa","Rial","West Asia","Asia"],
    ["Jordan","Amman","Dinar","West Asia","Asia"],
    ["Lebanon","Beirut","Pound","West Asia","Asia"],
    ["Syria","Damascus","Pound","West Asia","Asia"],
    ["Israel","Jerusalem","Shekel","West Asia","Asia"],
    ["Turkey","Ankara","Lira","West Asia","Asia"],
    ["Palestine","Ramallah","Shekel","West Asia","Asia"],

    ["Kazakhstan","Astana","Tenge","Central Asia","Asia"],
    ["Uzbekistan","Tashkent","Som","Central Asia","Asia"],
    ["Turkmenistan","Ashgabat","Manat","Central Asia","Asia"],
    ["Kyrgyzstan","Bishkek","Som","Central Asia","Asia"],
    ["Tajikistan","Dushanbe","Somoni","Central Asia","Asia"],

    // ================= EUROPE =================

    ["United Kingdom","London","Pound","Western Europe","Europe"],
    ["France","Paris","Euro","Western Europe","Europe"],
    ["Germany","Berlin","Euro","Central Europe","Europe"],
    ["Italy","Rome","Euro","Southern Europe","Europe"],
    ["Spain","Madrid","Euro","Southern Europe","Europe"],
    ["Portugal","Lisbon","Euro","Southern Europe","Europe"],
    ["Netherlands","Amsterdam","Euro","Western Europe","Europe"],
    ["Belgium","Brussels","Euro","Western Europe","Europe"],
    ["Switzerland","Bern","Franc","Central Europe","Europe"],
    ["Austria","Vienna","Euro","Central Europe","Europe"],
    ["Poland","Warsaw","Zloty","Central Europe","Europe"],
    ["Czech Republic","Prague","Koruna","Central Europe","Europe"],
    ["Greece","Athens","Euro","Southern Europe","Europe"],
    ["Norway","Oslo","Krone","Northern Europe","Europe"],
    ["Sweden","Stockholm","Krona","Northern Europe","Europe"],
    ["Finland","Helsinki","Euro","Northern Europe","Europe"],
    ["Denmark","Copenhagen","Krone","Northern Europe","Europe"],
    ["Ireland","Dublin","Euro","Western Europe","Europe"],
    ["Iceland","Reykjavik","Krona","Northern Europe","Europe"],
    ["Ukraine","Kyiv","Hryvnia","Eastern Europe","Europe"],
    ["Romania","Bucharest","Leu","Eastern Europe","Europe"],
    ["Bulgaria","Sofia","Lev","Eastern Europe","Europe"],
    ["Hungary","Budapest","Forint","Central Europe","Europe"],
    ["Croatia","Zagreb","Euro","Southern Europe","Europe"],
    ["Serbia","Belgrade","Dinar","Southern Europe","Europe"],
    ["Russia","Moscow","Ruble","Eastern Europe","Europe"],

    // ================= AFRICA =================

    ["Egypt","Cairo","Pound","North Africa","Africa"],
    ["Morocco","Rabat","Dirham","North Africa","Africa"],
    ["Algeria","Algiers","Dinar","North Africa","Africa"],
    ["Tunisia","Tunis","Dinar","North Africa","Africa"],
    ["Libya","Tripoli","Dinar","North Africa","Africa"],

    ["Nigeria","Abuja","Naira","West Africa","Africa"],
    ["Ghana","Accra","Cedi","West Africa","Africa"],
    ["Senegal","Dakar","Franc","West Africa","Africa"],
    ["Mali","Bamako","Franc","West Africa","Africa"],
    ["Ivory Coast","Yamoussoukro","Franc","West Africa","Africa"],

    ["Kenya","Nairobi","Shilling","East Africa","Africa"],
    ["Tanzania","Dodoma","Shilling","East Africa","Africa"],
    ["Uganda","Kampala","Shilling","East Africa","Africa"],
    ["Ethiopia","Addis Ababa","Birr","East Africa","Africa"],
    ["Somalia","Mogadishu","Shilling","East Africa","Africa"],

    ["South Africa","Pretoria","Rand","Southern Africa","Africa"],
    ["Zimbabwe","Harare","Dollar","Southern Africa","Africa"],
    ["Zambia","Lusaka","Kwacha","Southern Africa","Africa"],
    ["Botswana","Gaborone","Pula","Southern Africa","Africa"],
    ["Namibia","Windhoek","Dollar","Southern Africa","Africa"]

];


// ============================================================
// PROFILE
// ============================================================

let profiles = [];
let currentProfile = "";
let selectedProfile = "";

function defaultProfile(name) {

    return {

        name:name,

        xp:0,
        coins:100,
        level:1,

        totalGames:0,
        totalCorrect:0,
        totalWrong:0,

        bestScore:0,
        bestCombo:0,

        bossesDefeated:0,
        dailyCompleted:0,

        achievements:[],
        inventory:{
            "Hint":3,
            "Mega Hint":1,
            "Answer Shield":0,
            "Time Freeze":0,
            "Phoenix Save":0,
            "Boss Damage":0,
            "Treasure Key":0
        },

        skins:{
            "Explorer":true
        },

        equippedSkin:"Explorer",

        chests:{
            Common:0,
            Rare:0,
            Epic:0,
            Legend:0,
            Mythic:0,
            Divine:0,
            Transcendent:0
        },

        bossItems:{},

        stats:{
            classic:0,
            survival:0,
            timeAttack:0,
            suddenDeath:0,
            endless:0
        },

        dailyDate:""

    };

}


function loadData() {

    try {

        const raw =
            localStorage.getItem(SAVE_KEY);

        if (!raw)
            return;

        const data =
            JSON.parse(raw);

        profiles =
            data.profiles || [];

        currentProfile =
            data.currentProfile || "";

    }
    catch(e) {

        console.error(e);

        profiles = [];
        currentProfile = "";

    }

}


function saveData() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
            profiles,
            currentProfile
        })
    );

}


function getProfile() {

    return profiles.find(
        p => p.name === currentProfile
    );

}


function ensureProfileData(p) {

    if (!p.inventory)
        p.inventory = {};

    if (!p.skins)
        p.skins = {"Explorer":true};

    if (!p.chests)
        p.chests = {
            Common:0,
            Rare:0,
            Epic:0,
            Legend:0,
            Mythic:0,
            Divine:0,
            Transcendent:0
        };

    if (!p.achievements)
        p.achievements = [];

    if (!p.stats)
        p.stats = {
            classic:0,
            survival:0,
            timeAttack:0,
            suddenDeath:0,
            endless:0
        };

    if (!p.inventory["Hint"])
        p.inventory["Hint"] = 0;

    if (!p.inventory["Mega Hint"])
        p.inventory["Mega Hint"] = 0;

    if (!p.inventory["Answer Shield"])
        p.inventory["Answer Shield"] = 0;

    if (!p.inventory["Time Freeze"])
        p.inventory["Time Freeze"] = 0;

    if (!p.inventory["Phoenix Save"])
        p.inventory["Phoenix Save"] = 0;

    if (!p.inventory["Boss Damage"])
        p.inventory["Boss Damage"] = 0;

    if (!p.inventory["Treasure Key"])
        p.inventory["Treasure Key"] = 0;

}


function createProfileFromInput() {

    const input =
        document.getElementById("profileNameInput");

    const name =
        input.value.trim();

    if (!name) {

        toast("Enter a profile name.");

        return;

    }

    if (
        profiles.some(
            p => p.name.toLowerCase() === name.toLowerCase()
        )
    ) {

        toast("Profile already exists.");

        return;

    }

    const p =
        defaultProfile(name);

    profiles.push(p);

    currentProfile = name;
    selectedProfile = name;

    saveData();

    input.value = "";

    refreshAll();

    toast("Profile created!");

}


function selectProfile(name) {

    currentProfile = name;
    selectedProfile = name;

    saveData();

    refreshAll();

    toast("Profile selected.");

}


function deleteProfile() {

    if (!selectedProfile) {

        toast("Select a profile first.");

        return;

    }

    if (
        !confirm(
            "Delete profile " +
            selectedProfile +
            "?"
        )
    )
        return;

    profiles =
        profiles.filter(
            p => p.name !== selectedProfile
        );

    if (currentProfile === selectedProfile)
        currentProfile =
            profiles.length ?
            profiles[0].name :
            "";

    selectedProfile = currentProfile;

    saveData();

    refreshAll();

}


function openProfileMenu() {

    renderProfiles();

    showScreen("profileScreen");

}


function openProfileView() {

    const p = getProfile();

    if (!p) {

        toast("Select a profile first.");

        return;

    }

    document.getElementById(
        "profileDetails"
    ).innerHTML = profileHTML(p);

    showScreen("profileViewScreen");

}


function profileHTML(p) {

    return `

        <div class="profile-detail-grid">

            <div>
                👤 Name
                <strong>${p.name}</strong>
            </div>

            <div>
                🏆 Rank
                <strong>${getRank(p.level)}</strong>
            </div>

            <div>
                ⭐ Level
                <strong>${p.level}</strong>
            </div>

            <div>
                ✨ XP
                <strong>${p.xp}</strong>
            </div>

            <div>
                🪙 Coins
                <strong>${p.coins}</strong>
            </div>

            <div>
                🎮 Games
                <strong>${p.totalGames}</strong>
            </div>

            <div>
                ✅ Correct
                <strong>${p.totalCorrect}</strong>
            </div>

            <div>
                🔥 Best Combo
                <strong>${p.bestCombo}</strong>
            </div>

            <div>
                👹 Bosses Defeated
                <strong>${p.bossesDefeated}</strong>
            </div>

            <div>
                🏆 Achievements
                <strong>${p.achievements.length}/${achievements.length}</strong>
            </div>

        </div>

        <br>

        <button onclick="openProfileView()">
            🔄 Refresh
        </button>

    `;

}


function renderProfiles() {

    const box =
        document.getElementById("profileList");

    if (!profiles.length) {

        box.innerHTML =
            "<p>No profiles. Create one below.</p>";

        return;

    }

    box.innerHTML =
        profiles.map(p => `

            <div class="profile-item ${
                p.name === currentProfile ?
                "selected" :
                ""
            }">

                <div>

                    <strong>
                        👤 ${p.name}
                    </strong>

                    <br>

                    ⭐ Lv.${p.level}
                    • ${getRank(p.level)}
                    • 🪙 ${p.coins}

                </div>

                <div class="profile-actions">

                    <button
                        onclick="selectProfile('${escapeJS(p.name)}')">

                        Select

                    </button>

                    <button
                        onclick="
                        selectedProfile='${escapeJS(p.name)}';
                        openProfileView();
                        ">

                        View

                    </button>

                </div>

            </div>

        `).join("");

}


function escapeJS(text) {

    return text
        .replace(/\\/g,"\\\\")
        .replace(/'/g,"\\'");

}


// ============================================================
// LEVEL / RANK
// ============================================================

function calculateLevel(xp) {

    return Math.max(
        1,
        Math.floor(
            Math.sqrt(xp / 100)
        ) + 1
    );

}


const rankList = [

    [1,"Novice"],
    [5,"Explorer"],
    [10,"Adventurer"],
    [20,"Bronze Scholar"],
    [30,"Silver Scholar"],
    [40,"Gold Scholar"],
    [50,"Platinum Scholar"],
    [60,"Diamond Scholar"],
    [70,"Master"],
    [80,"Grandmaster"],
    [90,"Legend"],
    [100,"Mythic"],
    [125,"Divine"],
    [150,"Transcendent"],
    [200,"World Champion"],
    [300,"Geography God"],
    [500,"Eternal Explorer"],
    [1000,"Infinite Master"]

];


function getRank(level) {

    let rank = "Novice";

    for (const r of rankList) {

        if (level >= r[0])
            rank = r[1];

    }

    return rank;

}


// ============================================================
// SKINS
// ============================================================

const skins = [

    {
        name:"Explorer",
        price:0,
        bonus:"No bonus",
        multiplier:1
    },

    {
        name:"Scholar",
        price:5000,
        bonus:"+10% XP",
        xp:1.10,
        multiplier:1
    },

    {
        name:"Speedster",
        price:12000,
        bonus:"+2 seconds on timers",
        timer:2,
        multiplier:1
    },

    {
        name:"Lucky Star",
        price:25000,
        bonus:"+15% reward chance",
        luck:1.15,
        multiplier:1
    },

    {
        name:"Golden Explorer",
        price:50000,
        bonus:"+25% Coins",
        multiplier:1.25
    },

    {
        name:"Mythic Dragon",
        price:150000,
        bonus:"+50% XP and Coins",
        xp:1.50,
        multiplier:1.50
    },

    {
        name:"Divine Emperor",
        price:500000,
        bonus:"+100% rewards",
        xp:2,
        multiplier:2
    },

    {
        name:"Transcendent",
        price:2500000,
        bonus:"+200% rewards + rare chest luck",
        xp:3,
        multiplier:3,
        luck:2
    }

];


function getSkin() {

    const p = getProfile();

    if (!p)
        return skins[0];

    return skins.find(
        s => s.name === p.equippedSkin
    ) || skins[0];

}


// ============================================================
// ITEMS
// ============================================================

const shopItems = [

    {
        name:"Hint",
        price:500,
        desc:"Remove two wrong answers.",
        buy:1
    },

    {
        name:"Mega Hint",
        price:5000,
        desc:"Remove three wrong answers.",
        buy:1
    },

    {
        name:"Answer Shield",
        price:8000,
        desc:"Protects against one wrong answer.",
        buy:1
    },

    {
        name:"Time Freeze",
        price:10000,
        desc:"Adds 5 seconds to the timer.",
        buy:1
    },

    {
        name:"Phoenix Save",
        price:30000,
        desc:"Prevents one life from being lost.",
        buy:1
    },

    {
        name:"Boss Damage",
        price:40000,
        desc:"Deals bonus damage to a Boss.",
        buy:1
    },

    {
        name:"Treasure Key",
        price:75000,
        desc:"Opens an additional reward chest.",
        buy:1
    }

];


function buyItem(name) {

    const p = getProfile();

    const item =
        shopItems.find(
            i => i.name === name
        );

    if (!p || !item)
        return;

    if (p.coins < item.price) {

        toast("Not enough Coins.");

        return;

    }

    p.coins -= item.price;

    p.inventory[item.name] =
        (p.inventory[item.name] || 0) + item.buy;

    saveData();

    renderShop();
    updateHeader();

    toast(
        "Purchased " +
        item.name +
        "!"
    );

}


// ============================================================
// CHESTS
// ============================================================

const chestData = {

    Common:{
        price:5000,
        className:"common",
        coins:[500,3000],
        xp:[100,500]
    },

    Rare:{
        price:15000,
        className:"rare",
        coins:[2000,10000],
        xp:[500,1500]
    },

    Epic:{
        price:50000,
        className:"epic",
        coins:[5000,30000],
        xp:[1500,5000]
    },

    Legend:{
        price:150000,
        className:"legend",
        coins:[20000,100000],
        xp:[5000,15000]
    },

    Mythic:{
        price:500000,
        className:"mythic",
        coins:[75000,400000],
        xp:[15000,50000]
    },

    Divine:{
        price:2000000,
        className:"divine",
        coins:[300000,1500000],
        xp:[50000,150000]
    },

    Transcendent:{
        price:10000000,
        className:"transcendent",
        coins:[2000000,10000000],
        xp:[250000,1000000]
    }

};


function randomRange(a,b) {

    return Math.floor(
        Math.random() * (b-a+1)
    ) + a;

}


function openChest(type) {

    const p = getProfile();

    if (!p)
        return;

    if (
        (p.chests[type] || 0) <= 0
    ) {

        toast(
            "You don't have a " +
            type +
            " Chest."
        );

        return;

    }

    p.chests[type]--;

    const data =
        chestData[type];

    const coins =
        randomRange(
            data.coins[0],
            data.coins[1]
        );

    const xp =
        randomRange(
            data.xp[0],
            data.xp[1]
        );

    p.coins += coins;

    addXP(xp);

    let bonus = "";

    const roll =
        Math.random();

    if (
        roll < chestBonusChance(type)
    ) {

        const reward =
            randomChestItem(type);

        p.inventory[reward] =
            (p.inventory[reward] || 0) + 1;

        bonus =
            `<br>🎁 Bonus: <strong>${reward}</strong>`;

    }

    saveData();

    renderInventory();
    updateHeader();

    toast(
        `${type} Chest opened! +${coins} Coins +${xp} XP`
    );

    alert(
        `${type} CHEST\n\n` +
        `🪙 +${coins} Coins\n` +
        `✨ +${xp} XP` +
        bonus
    );

    checkAchievements();

}


function chestBonusChance(type) {

    const chance = {

        Common:.15,
        Rare:.25,
        Epic:.35,
        Legend:.45,
        Mythic:.55,
        Divine:.70,
        Transcendent:.95

    };

    return chance[type] || .1;

}


function randomChestItem(type) {

    const common =
        ["Hint","Mega Hint"];

    const rare =
        ["Answer Shield","Time Freeze"];

    const epic =
        ["Phoenix Save","Boss Damage"];

    const divine =
        ["Treasure Key","Mega Hint"];

    let pool =
        common;

    if (
        type === "Epic" ||
        type === "Legend"
    )
        pool = rare.concat(epic);

    if (
        type === "Mythic" ||
        type === "Divine"
    )
        pool = rare.concat(epic,divine);

    if (type === "Transcendent")
        pool = [
            "Phoenix Save",
            "Boss Damage",
            "Treasure Key",
            "Mega Hint"
        ];

    return pool[
        Math.floor(
            Math.random()*pool.length
        )
    ];

}


function buyChest(type) {

    const p = getProfile();

    if (!p)
        return;

    const data =
        chestData[type];

    if (p.coins < data.price) {

        toast("Not enough Coins.");

        return;

    }

    p.coins -= data.price;

    p.chests[type] =
        (p.chests[type] || 0) + 1;

    saveData();

    renderShop();
    updateHeader();

    toast(
        `Purchased ${type} Chest!`
    );

}


// ============================================================
// SHOP UI
// ============================================================

function openShop() {

    renderShop();

    showScreen("shopScreen");

}


function renderShop() {

    const p = getProfile();

    if (!p)
        return;

    document.getElementById(
        "shopCoins"
    ).textContent =
        p.coins;

    document.getElementById(
        "shopItems"
    ).innerHTML =
        shopItems.map(item => `

            <div class="shop-item">

                <h3>🧰 ${item.name}</h3>

                <p>${item.desc}</p>

                <small>
                    🪙 ${item.price.toLocaleString()}
                </small>

                <button
                    onclick="buyItem('${item.name}')">

                    Buy

                </button>

            </div>

        `).join("");


    document.getElementById(
        "skinShop"
    ).innerHTML =
        skins.map(s => `

            <div class="
                skin-card
                ${s.name === p.equippedSkin ? "equipped" : ""}
                ${s.name === "Transcendent" ? "transcendent" : ""}
            ">

                <h3>🎨 ${s.name}</h3>

                <p>${s.bonus}</p>

                <small>
                    🪙 ${s.price.toLocaleString()}
                </small>

                ${
                    p.skins[s.name]
                    ?
                    `<button
                        onclick="equipSkin('${s.name}')">
                        ${
                            p.equippedSkin === s.name
                            ?
                            "✓ Equipped"
                            :
                            "Equip"
                        }
                    </button>`
                    :
                    `<button
                        onclick="buySkin('${s.name}')">
                        Buy
                    </button>`
                }

            </div>

        `).join("");


    document.getElementById(
        "chestShop"
    ).innerHTML =
        Object.keys(chestData)
        .map(type => {

            const d =
                chestData[type];

            return `

                <div class="
                    chest-card
                    ${d.className}
                ">

                    <h3>🎁 ${type} Chest</h3>

                    <p>
                        Current:
                        ${p.chests[type] || 0}
                    </p>

                    <p>
                        🪙 ${d.price.toLocaleString()}
                    </p>

                    <button
                        onclick="buyChest('${type}')">

                        Buy Chest

                    </button>

                    ${
                        (p.chests[type] || 0) > 0
                        ?
                        `<button
                            onclick="openChest('${type}')">

                            Open

                        </button>`
                        :
                        ""
                    }

                </div>

            `;

        }).join("");

}


function buySkin(name) {

    const p = getProfile();

    const skin =
        skins.find(
            s => s.name === name
        );

    if (!p || !skin)
        return;

    if (p.skins[name]) {

        equipSkin(name);

        return;

    }

    if (p.coins < skin.price) {

        toast("Not enough Coins.");

        return;

    }

    p.coins -= skin.price;

    p.skins[name] = true;

    p.equippedSkin = name;

    saveData();

    renderShop();
    updateHeader();

    toast(
        `Unlocked ${name} Skin!`
    );

}


function equipSkin(name) {

    const p = getProfile();

    if (!p || !p.skins[name])
        return;

    p.equippedSkin = name;

    saveData();

    renderShop();

    toast(
        `${name} equipped!`
    );

}


// ============================================================
// INVENTORY
// ============================================================

function openInventory() {

    renderInventory();

    showScreen("inventoryScreen");

}


function renderInventory() {

    const p = getProfile();

    if (!p)
        return;

    const box =
        document.getElementById(
            "inventoryList"
        );

    const entries =
        Object.entries(
            p.inventory
        );

    let html = "";

    entries.forEach(
        ([name,count]) => {

            html += `

                <div class="inventory-item">

                    <div>
                        🧰 <strong>${name}</strong>
                    </div>

                    <div>
                        ×${count}
                    </div>

                </div>

            `;

        }
    );


    Object.entries(
        p.chests
    ).forEach(
        ([name,count]) => {

            html += `

                <div class="inventory-item">

                    <div>
                        🎁
                        <strong>${name} Chest</strong>
                    </div>

                    <div>

                        ×${count}

                        ${
                            count > 0
                            ?
                            `<button
                                onclick="openChest('${name}')">
                                Open
                            </button>`
                            :
                            ""
                        }

                    </div>

                </div>

            `;

        }
    );


    box.innerHTML =
        html ||
        "<p>Inventory empty.</p>";

}


function openInventoryDuringGame() {

    renderInventory();

    showScreen("inventoryScreen");

}


// ============================================================
// ITEM USAGE
// ============================================================

function useItem(name) {

    const p = getProfile();

    if (!p)
        return false;

    if (
        !p.inventory[name] ||
        p.inventory[name] <= 0
    ) {

        toast(
            `No ${name} available.`
        );

        return false;

    }

    p.inventory[name]--;

    saveData();

    return true;

}


// ============================================================
// ACHIEVEMENTS
// ============================================================

const achievements = [

    {
        id:"first",
        icon:"🌟",
        name:"First Steps",
        desc:"Play your first game.",
        check:p => p.totalGames >= 1
    },

    {
        id:"perfect",
        icon:"🎯",
        name:"Perfect",
        desc:"Get a perfect Classic game.",
        check:p => p.bestScore >= 1000
    },

    {
        id:"combo10",
        icon:"🔥",
        name:"Combo Master",
        desc:"Reach a 10 combo.",
        check:p => p.bestCombo >= 10
    },

    {
        id:"level50",
        icon:"⭐",
        name:"Elite",
        desc:"Reach Level 50.",
        check:p => p.level >= 50
    },

    {
        id:"level100",
        icon:"👑",
        name:"Centurion",
        desc:"Reach Level 100.",
        check:p => p.level >= 100
    },

    {
        id:"level200",
        icon:"💎",
        name:"World Champion",
        desc:"Reach Level 200.",
        check:p => p.level >= 200
    },

    {
        id:"games25",
        icon:"🎮",
        name:"Dedicated",
        desc:"Play 25 games.",
        check:p => p.totalGames >= 25
    },

    {
        id:"games100",
        icon:"🏅",
        name:"Veteran",
        desc:"Play 100 games.",
        check:p => p.totalGames >= 100
    },

    {
        id:"boss1",
        icon:"👹",
        name:"Boss Slayer",
        desc:"Defeat your first Boss.",
        check:p => p.bossesDefeated >= 1
    },

    {
        id:"boss10",
        icon:"⚔️",
        name:"Boss Hunter",
        desc:"Defeat 10 Bosses.",
        check:p => p.bossesDefeated >= 10
    },

    {
        id:"treasure",
        icon:"🎁",
        name:"Treasure Hunter",
        desc:"Open your first Chest.",
        check:p => totalChestsOpened(p) >= 1
    },

    {
        id:"divine",
        icon:"✨",
        name:"Divine Fortune",
        desc:"Obtain a Divine Chest.",
        check:p => p.chests.Divine > 0
    },

    {
        id:"trans",
        icon:"🌌",
        name:"Beyond Reality",
        desc:"Obtain a Transcendent Chest.",
        check:p => p.chests.Transcendent > 0
    },

    {
        id:"regions",
        icon:"🌍",
        name:"World Traveler",
        desc:"Explore Asia, Europe and Africa.",
        check:p =>
            p.stats.classic +
            p.stats.survival +
            p.stats.timeAttack >= 30
    },

    {
        id:"daily7",
        icon:"📅",
        name:"Daily Warrior",
        desc:"Complete 7 Daily Challenges.",
        check:p => p.dailyCompleted >= 7
    },

    {
        id:"rich",
        icon:"🪙",
        name:"Millionaire",
        desc:"Hold 1,000,000 Coins.",
        check:p => p.coins >= 1000000
    },

    {
        id:"skins",
        icon:"🎨",
        name:"Fashion Master",
        desc:"Own 5 Skins.",
        check:p => Object.keys(p.skins).length >= 5
    },

    {
        id:"allitems",
        icon:"🎒",
        name:"Collector",
        desc:"Own every item.",
        check:p =>
            shopItems.every(
                i => (p.inventory[i.name] || 0) > 0
            )
    }

];


function totalChestsOpened(p) {

    return p._openedChests || 0;

}


function checkAchievements() {

    const p = getProfile();

    if (!p)
        return;

    ensureProfileData(p);

    achievements.forEach(a => {

        if (
            !p.achievements.includes(a.id) &&
            a.check(p)
        ) {

            p.achievements.push(a.id);

            toast(
                `🏆 Achievement Unlocked: ${a.name}`
            );

        }

    });

    saveData();

}


function openAchievements() {

    renderAchievements();

    showScreen("achievementScreen");

}


function renderAchievements() {

    const p = getProfile();

    if (!p)
        return;

    document.getElementById(
        "achievementList"
    ).innerHTML =
        achievements.map(a => {

            const unlocked =
                p.achievements.includes(
                    a.id
                );

            return `

                <div class="
                    achievement-item
                    ${unlocked ? "unlocked" : ""}
                ">

                    <div>

                        <h3>
                            ${a.icon}
                            ${a.name}
                        </h3>

                        <p>
                            ${a.desc}
                        </p>

                    </div>

                    <strong>
                        ${unlocked ? "✓" : "🔒"}
                    </strong>

                </div>

            `;

        }).join("");

}


// ============================================================
// GAME MODES
// ============================================================

const modes = [

    {
        id:"classic",
        icon:"🎮",
        name:"Classic Mode",
        desc:"10 questions. 12 seconds each.",
        action:"openDifficulty()"
    },

    {
        id:"survival",
        icon:"❤️",
        name:"Survival",
        desc:"Keep answering until your lives run out.",
        action:"startSurvival()"
    },

    {
        id:"timeAttack",
        icon:"⏱️",
        name:"Time Attack",
        desc:"Fast questions and intense timer.",
        action:"startTimeAttack()"
    },

    {
        id:"suddenDeath",
        icon:"💀",
        name:"Sudden Death",
        desc:"One mistake ends the run.",
        action:"startSuddenDeath()"
    },

    {
        id:"endless",
        icon:"♾️",
        name:"Endless",
        desc:"No fixed question limit.",
        action:"startEndless()"
    },

    {
        id:"boss",
        icon:"👹",
        name:"Boss Mode",
        desc:"Defeat increasingly powerful bosses.",
        action:"startBossMode()"
    },

    {
        id:"daily",
        icon:"🎯",
        name:"Daily Challenge",
        desc:"One special challenge every day.",
        action:"openDailyChallenge()"
    }

];


function startGameMenu() {

    renderModes();

    showScreen("modeScreen");

}


function renderModes() {

    document.getElementById(
        "modeGrid"
    ).innerHTML =
        modes.map(m => `

            <button
                class="mode-card"
                onclick="${m.action}">

                <h3>
                    ${m.icon} ${m.name}
                </h3>

                <p>
                    ${m.desc}
                </p>

            </button>

        `).join("");

}


function openDifficulty() {

    showScreen(
        "difficultyScreen"
    );

}


// ============================================================
// GAME STATE
// ============================================================

let game = {

    mode:"classic",

    difficulty:1,

    totalQuestions:10,

    question:0,

    correct:0,

    wrong:0,

    score:0,

    xp:0,

    coins:0,

    lives:3,

    combo:0,

    bestCombo:0,

    locked:false,

    timer:12,

    timerMax:12,

    timerID:null,

    current:null,

    usedHint:false

};


let currentMode = "classic";


// ============================================================
// QUESTION CREATION
// ============================================================

function getCountriesForMode() {

    return countries;

}


function randomCountry() {

    const list =
        getCountriesForMode();

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ];

}


function shuffle(arr) {

    for (
        let i = arr.length-1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random()*(i+1)
            );

        [
            arr[i],
            arr[j]
        ] =
        [
            arr[j],
            arr[i]
        ];

    }

    return arr;

}


function createOptions(correct) {

    const options = [correct];

    const pool =
        countries.filter(
            c => c[0] !== correct[0]
        );

    shuffle(pool);

    while (
        options.length < 4 &&
        pool.length
    ) {

        options.push(
            pool.pop()
        );

    }

    return shuffle(options);

}


// ============================================================
// IMPORTANT HARD MODE FIX
// Currency / Region has multiple valid countries.
// Instead of asking:
// "Which country uses Rupee?"
// we use a second UNIQUE clue: CAPITAL.
// ============================================================

function createQuestion(difficulty) {

    const c =
        randomCountry();

    let type;

    if (difficulty === 1) {

        type = "capital";

    }
    else if (difficulty === 2) {

        type =
            Math.random() < .5
            ? "capital"
            : "country";

    }
    else {

        const types = [
            "capital",
            "country",
            "currency",
            "region"
        ];

        type =
            types[
                Math.floor(
                    Math.random()*types.length
                )
            ];

    }


    if (type === "capital") {

        return {

            type:"CAPITAL",

            text:
                `What is the capital of ${c[0]}?`,

            value:
                c[1],

            correct:c,

            options:createOptions(c)

        };

    }


    if (type === "country") {

        return {

            type:"COUNTRY",

            text:
                `Which country has this capital?`,

            value:c[1],

            correct:c,

            options:createOptions(c)

        };

    }


    if (type === "currency") {

        /*
            FIX:
            Currency alone is ambiguous.

            We add the unique capital clue.
        */

        return {

            type:"CURRENCY + CAPITAL",

            text:
                `Which country uses ${c[2]} as its currency and has ${c[1]} as its capital?`,

            value:
                `💰 Currency: ${c[2]}<br>🏛️ Capital: ${c[1]}`,

            correct:c,

            options:createOptions(c)

        };

    }


    if (type === "region") {

        /*
            FIX:
            Region alone is ambiguous.

            We add unique capital clue.
        */

        return {

            type:"REGION + CAPITAL",

            text:
                `Which country is in ${c[3]} and has ${c[1]} as its capital?`,

            value:
                `🌍 Region: ${c[3]}<br>🏛️ Capital: ${c[1]}`,

            correct:c,

            options:createOptions(c)

        };

    }

}


// ============================================================
// START CLASSIC
// ============================================================

function startGame(difficulty) {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    game = {

        mode:"classic",

        difficulty:difficulty,

        totalQuestions:10,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:3,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:12,

        timerMax:12,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "classic";

    p.stats.classic++;

    saveData();

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// SURVIVAL
// ============================================================

function startSurvival() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    game = {

        mode:"survival",

        difficulty:2,

        totalQuestions:9999,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:3,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:10,

        timerMax:10,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "survival";

    p.stats.survival++;

    saveData();

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// TIME ATTACK
// ============================================================

function startTimeAttack() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    game = {

        mode:"timeAttack",

        difficulty:3,

        totalQuestions:20,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:3,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:7,

        timerMax:7,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "timeAttack";

    p.stats.timeAttack++;

    saveData();

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// SUDDEN DEATH
// ============================================================

function startSuddenDeath() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    game = {

        mode:"suddenDeath",

        difficulty:3,

        totalQuestions:50,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:1,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:8,

        timerMax:8,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "suddenDeath";

    p.stats.suddenDeath++;

    saveData();

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// ENDLESS
// ============================================================

function startEndless() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    game = {

        mode:"endless",

        difficulty:3,

        totalQuestions:Infinity,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:3,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:12,

        timerMax:12,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "endless";

    p.stats.endless++;

    saveData();

    showScreen("gameScreen");

    nextQuestion();

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    if (game.locked)
        return;

    if (
        game.mode !== "endless" &&
        game.question >= game.totalQuestions
    ) {

        finishGame();

        return;

    }

    game.question++;

    game.current =
        createQuestion(
            game.difficulty
        );

    game.usedHint = false;

    renderQuestion();

    startTimer();

}


function renderQuestion() {

    const q =
        game.current;

    document.getElementById(
        "questionNumber"
    ).textContent =
        game.mode === "endless"
        ?
        `${game.question}/∞`
        :
        `${game.question}/${game.totalQuestions}`;

    document.getElementById(
        "questionType"
    ).textContent =
        q.type;

    document.getElementById(
        "questionText"
    ).textContent =
        q.text;

    document.getElementById(
        "questionValue"
    ).innerHTML =
        q.value;

    document.getElementById(
        "answers"
    ).innerHTML =
        q.options.map(
            c => `

                <button
                    class="answer-button"
                    data-country="${escapeHTML(c[0])}"
                    onclick="
                        answerQuestion('${escapeJS(c[0])}')
                    ">

                    ${c[0]}

                </button>

            `
        ).join("");

    updateGameUI();

}


function escapeHTML(text) {

    return text
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

    stopTimer();

    const skin =
        getSkin();

    game.timerMax =
        game.mode === "classic"
        ?
        12 + (skin.timer || 0)
        :
        game.timerMax + (skin.timer || 0);

    game.timer =
        game.timerMax;

    updateTimer();

    game.timerID =
        setInterval(
            () => {

                if (game.locked)
                    return;

                game.timer--;

                updateTimer();

                if (game.timer <= 0) {

                    stopTimer();

                    handleTimeout();

                }

            },
            1000
        );

}


function stopTimer() {

    if (game.timerID) {

        clearInterval(
            game.timerID
        );

        game.timerID = null;

    }

}


function updateTimer() {

    const el =
        document.getElementById(
            "timer"
        );

    el.textContent =
        game.timer;

    if (game.timer <= 3)
        el.classList.add(
            "timer-danger"
        );
    else
        el.classList.remove(
            "timer-danger"
        );

}


function handleTimeout() {

    if (game.locked)
        return;

    toast("⏱️ Time's up!");

    loseLife();

}


// ============================================================
// ANSWER
// ============================================================

function answerQuestion(name) {

    if (game.locked)
        return;

    stopTimer();

    const q =
        game.current;

    const correct =
        q.correct[0] === name;

    if (correct)
        handleCorrect();
    else
        handleWrong();

}


function handleCorrect() {

    game.correct++;

    game.combo++;

    game.bestCombo =
        Math.max(
            game.bestCombo,
            game.combo
        );

    let scoreGain =
        100 +
        game.combo * 15;

    let xpGain =
        50 +
        game.combo * 5;

    let coinGain =
        25 +
        game.combo * 3;

    const skin =
        getSkin();

    xpGain =
        Math.floor(
            xpGain *
            (skin.xp || 1)
        );

    coinGain =
        Math.floor(
            coinGain *
            (skin.multiplier || 1)
        );

    scoreGain =
        Math.floor(
            scoreGain *
            (skin.multiplier || 1)
        );

    game.score += scoreGain;

    game.xp += xpGain;

    game.coins += coinGain;

    toast(
        `✅ Correct! +${scoreGain} Score`
    );

    updateGameUI();

    setTimeout(
        () => {

            if (!game.locked)
                nextQuestion();

        },
        500
    );

}


function handleWrong() {

    game.wrong++;

    game.combo = 0;

    const p = getProfile();

    if (
        p &&
        p.inventory["Answer Shield"] > 0
    ) {

        p.inventory["Answer Shield"]--;

        saveData();

        toast(
            "🛡️ Answer Shield protected you!"
        );

        setTimeout(
            () => nextQuestion(),
            500
        );

        return;

    }

    loseLife();

}


function loseLife() {

    const p = getProfile();

    if (
        p &&
        p.inventory["Phoenix Save"] > 0
    ) {

        p.inventory["Phoenix Save"]--;

        saveData();

        toast(
            "🔥 Phoenix Save activated!"
        );

        setTimeout(
            () => nextQuestion(),
            500
        );

        return;

    }

    game.lives--;

    updateGameUI();

    if (game.lives <= 0) {

        game.locked = true;

        finishGame();

        return;

    }

    setTimeout(
        () => {

            if (!game.locked)
                nextQuestion();

        },
        500
    );

}


// ============================================================
// HINT
// ============================================================

function useHint() {

    if (game.locked)
        return;

    const p = getProfile();

    if (!p)
        return;

    if (
        !p.inventory["Hint"] ||
        p.inventory["Hint"] <= 0
    ) {

        toast("No Hint available.");

        return;

    }

    p.inventory["Hint"]--;

    game.usedHint = true;

    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers .answer-button"
            )
        );

    const wrong =
        buttons.filter(
            b =>
                b.dataset.country !==
                game.current.correct[0]
        );

    shuffle(wrong);

    wrong
        .slice(0,2)
        .forEach(
            b => b.classList.add("removed")
        );

    saveData();

    toast("💡 Hint used.");

}


function useMegaHint() {

    if (game.locked)
        return;

    const p = getProfile();

    if (!p)
        return;

    if (
        !p.inventory["Mega Hint"] ||
        p.inventory["Mega Hint"] <= 0
    ) {

        toast("No Mega Hint available.");

        return;

    }

    p.inventory["Mega Hint"]--;

    game.usedHint = true;

    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers .answer-button"
            )
        );

    const wrong =
        buttons.filter(
            b =>
                b.dataset.country !==
                game.current.correct[0]
        );

    wrong
        .forEach(
            b => b.classList.add("removed")
        );

    saveData();

    toast(
        "✨ Mega Hint removed all wrong answers!"
    );

}


function useBossHint() {

    useHint();

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    stopTimer();

    const p = getProfile();

    if (!p)
        return;

    p.totalGames++;

    p.totalCorrect +=
        game.correct;

    p.totalWrong +=
        game.wrong;

    p.bestScore =
        Math.max(
            p.bestScore,
            game.score
        );

    p.bestCombo =
        Math.max(
            p.bestCombo,
            game.bestCombo
        );

    addXP(game.xp);

    const reward =
        Math.floor(
            game.coins *
            (getSkin().multiplier || 1)
        );

    p.coins += reward;

    saveData();

    checkAchievements();

    document.getElementById(
        "resultInfo"
    ).innerHTML = `

        <div class="result-message">

            ${
                game.correct ===
                game.totalQuestions
                ?
                "🎉 PERFECT RUN!"
                :
                game.correct > game.wrong
                ?
                "🏆 Great Job!"
                :
                "💪 Keep Practicing!"
            }

        </div>

        <div class="result-stat">
            <span>🎮 Mode</span>
            <strong>${modeName(game.mode)}</strong>
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
            <span>✨ XP Earned</span>
            <strong>+${game.xp}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>+${reward}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Rank</span>
            <strong>
                ${getRank(p.level)}
            </strong>
        </div>

    `;

    showScreen(
        "resultScreen"
    );

    updateHeader();

}


function modeName(mode) {

    const names = {

        classic:"Classic",
        survival:"Survival",
        timeAttack:"Time Attack",
        suddenDeath:"Sudden Death",
        endless:"Endless"

    };

    return names[mode] || mode;

}


function replayCurrentMode() {

    switch(currentMode) {

        case "classic":
            startGame(game.difficulty);
            break;

        case "survival":
            startSurvival();
            break;

        case "timeAttack":
            startTimeAttack();
            break;

        case "suddenDeath":
            startSuddenDeath();
            break;

        case "endless":
            startEndless();
            break;

        default:
            startGame(2);

    }

}


// ============================================================
// BOSS SYSTEM
// ============================================================

const bosses = [

    {
        name:"Iron Khan",
        rarity:"Common",
        hp:800,
        questions:8,
        rewardCoins:5000,
        rewardXP:1000,
        chest:"Common",
        item:"Khan's Compass",
        damage:100
    },

    {
        name:"Dragon Emperor",
        rarity:"Rare",
        hp:1800,
        questions:10,
        rewardCoins:15000,
        rewardXP:3000,
        chest:"Rare",
        item:"Dragon Scale",
        damage:180
    },

    {
        name:"Celestial Guardian",
        rarity:"Epic",
        hp:3500,
        questions:12,
        rewardCoins:50000,
        rewardXP:10000,
        chest:"Epic",
        item:"Celestial Seal",
        damage:300
    },

    {
        name:"Mythic Sovereign",
        rarity:"Mythic",
        hp:6000,
        questions:18,
        rewardCoins:150000,
        rewardXP:30000,
        chest:"Mythic",
        item:"Sovereign Crown",
        damage:400
    },

    {
        name:"DIVINE DRAGON",
        rarity:"Divine",
        hp:10000,
        questions:24,
        rewardCoins:500000,
        rewardXP:100000,
        chest:"Divine",
        item:"Divine Dragon Heart",
        damage:550
    }

];


let bossGame = {

    boss:null,
    hp:0,
    maxHp:0,
    question:0,
    totalQuestions:0,
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

        boss:boss,

        hp:boss.hp,

        maxHp:boss.hp,

        question:0,

        totalQuestions:boss.questions,

        correct:0,

        locked:false

    };

    showScreen("bossScreen");

    nextBossQuestion();

}


function nextBossQuestion() {

    if (bossGame.locked)
        return;

    if (
        bossGame.question >=
        bossGame.totalQuestions
    ) {

        bossDefeat();

        return;

    }

    bossGame.question++;

    const q =
        createQuestion(3);

    bossGame.current =
        q;

    document.getElementById(
        "bossName"
    ).textContent =
        "👹 " +
        bossGame.boss.name;

    document.getElementById(
        "bossRarity"
    ).textContent =
        bossGame.boss.rarity;

    document.getElementById(
        "bossDescription"
    ).textContent =
        `${bossGame.boss.rarity} Boss • ${bossGame.totalQuestions} questions`;

    document.getElementById(
        "bossQuestion"
    ).textContent =
        `${bossGame.question}/${bossGame.totalQuestions}`;

    document.getElementById(
        "bossValue"
    ).innerHTML =
        q.value;

    document.getElementById(
        "bossAnswers"
    ).innerHTML =
        q.options.map(
            c => `

                <button
                    class="answer-button"
                    data-country="${escapeHTML(c[0])}"
                    onclick="
                        answerBoss('${escapeJS(c[0])}')
                    ">

                    ${c[0]}

                </button>

            `
        ).join("");

    updateBossUI();

}


function answerBoss(name) {

    if (bossGame.locked)
        return;

    const correct =
        bossGame.current.correct[0]
        ===
        name;

    if (correct) {

        bossGame.correct++;

        let damage =
            bossGame.boss.damage;

        const comboBonus =
            Math.min(
                bossGame.correct * 20,
                300
            );

        damage += comboBonus;

        const p = getProfile();

        if (
            p &&
            p.inventory["Boss Damage"] > 0
        ) {

            p.inventory["Boss Damage"]--;

            damage += 500;

            toast(
                "💥 Boss Damage item activated!"
            );

        }

        bossGame.hp =
            Math.max(
                0,
                bossGame.hp - damage
            );

        toast(
            `⚔️ Correct! -${damage} Boss HP`
        );

        updateBossUI();

        if (bossGame.hp <= 0) {

            bossDefeat();

            return;

        }

        setTimeout(
            nextBossQuestion,
            500
        );

    }
    else {

        toast(
            "❌ Wrong answer!"
        );

        setTimeout(
            nextBossQuestion,
            500
        );

    }

}


function updateBossUI() {

    const percent =
        Math.max(
            0,
            bossGame.hp /
            bossGame.maxHp *
            100
        );

    document.getElementById(
        "bossHPBar"
    ).style.width =
        percent + "%";

    document.getElementById(
        "bossHP"
    ).textContent =
        `${bossGame.hp}/${bossGame.maxHp}`;

}


function bossDefeat() {

    if (bossGame.locked)
        return;

    bossGame.locked = true;

    const p = getProfile();

    const boss =
        bossGame.boss;

    p.bossesDefeated++;

    p.coins +=
        boss.rewardCoins;

    addXP(
        boss.rewardXP
    );

    p.inventory[
        boss.item
    ] =
        (p.inventory[boss.item] || 0) + 1;

    p.bossItems[
        boss.item
    ] =
        (p.bossItems[boss.item] || 0) + 1;

    p.chests[
        boss.chest
    ] =
        (p.chests[boss.chest] || 0) + 1;

    /*
        Divine Boss:
        tiny chance to drop Transcendent.
    */

    let transcendent = false;

    if (
        boss.rarity === "Divine" &&
        Math.random() < .03
    ) {

        p.chests.Transcendent++;

        transcendent = true;

    }

    p._openedChests =
        p._openedChests || 0;

    saveData();

    checkAchievements();

    document.getElementById(
        "bossResult"
    ).innerHTML = `

        <div class="result-message">

            🎉 ${boss.name} DEFEATED!

        </div>

        <div class="result-stat">
            <span>👹 Boss</span>
            <strong>${boss.name}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>+${boss.rewardCoins.toLocaleString()}</strong>
        </div>

        <div class="result-stat">
            <span>✨ XP</span>
            <strong>+${boss.rewardXP.toLocaleString()}</strong>
        </div>

        <div class="result-stat">
            <span>🎁 Chest</span>
            <strong>${boss.chest}</strong>
        </div>

        <div class="result-stat">
            <span>⚔️ Exclusive Item</span>
            <strong>${boss.item}</strong>
        </div>

        ${
            transcendent
            ?
            `
            <div class="result-message">
                🌌 TRANSCENDENT CHEST DROPPED!
            </div>
            `
            :
            ""
        }

    `;

    showScreen(
        "bossResultScreen"
    );

    updateHeader();

}


function confirmQuitBoss() {

    if (
        confirm(
            "Retreat from Boss Battle?"
        )
    ) {

        bossGame.locked = true;

        goHome();

    }

}


// ============================================================
// DAILY CHALLENGE
// ============================================================

function todayString() {

    const d =
        new Date();

    return d.toISOString()
        .slice(0,10);

}


function openDailyChallenge() {

    const p = getProfile();

    if (!p) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }

    const today =
        todayString();

    const completed =
        p.dailyDate === today;

    document.getElementById(
        "dailyInfo"
    ).innerHTML = `

        <div class="result-message">

            ${
                completed
                ?
                "✅ Today's Challenge completed!"
                :
                "🎯 10 Hard questions • Bonus rewards"
            }

        </div>

    `;

    document.getElementById(
        "dailyStartButton"
    ).disabled =
        completed;

    showScreen("dailyScreen");

}


function startDailyChallenge() {

    const p = getProfile();

    if (!p)
        return;

    if (
        p.dailyDate ===
        todayString()
    ) {

        toast(
            "Already completed today."
        );

        return;

    }

    game = {

        mode:"daily",

        difficulty:3,

        totalQuestions:10,

        question:0,

        correct:0,

        wrong:0,

        score:0,

        xp:0,

        coins:0,

        lives:3,

        combo:0,

        bestCombo:0,

        locked:false,

        timer:15,

        timerMax:15,

        timerID:null,

        current:null,

        usedHint:false

    };

    currentMode = "daily";

    showScreen("gameScreen");

    nextDailyQuestion();

}


function nextDailyQuestion() {

    if (game.question >= 10) {

        finishDaily();

        return;

    }

    game.question++;

    game.current =
        createQuestion(3);

    renderQuestion();

    startTimer();

}


function finishDaily() {

    stopTimer();

    const p = getProfile();

    p.dailyDate =
        todayString();

    p.dailyCompleted++;

    p.coins +=
        5000 +
        game.correct * 500;

    addXP(
        3000 +
        game.correct * 100
    );

    p._openedChests =
        p._openedChests || 0;

    if (game.correct >= 8)
        p.chests.Rare++;

    if (game.correct === 10)
        p.chests.Epic++;

    saveData();

    checkAchievements();

    toast(
        "🎯 Daily Challenge Complete!"
    );

    finishGame();

}


// ============================================================
// GAME ROUTER FOR DAILY
// ============================================================

const originalNextQuestion =
    nextQuestion;


// ============================================================
// XP
// ============================================================

function addXP(amount) {

    const p = getProfile();

    if (!p)
        return;

    p.xp += amount;

    p.level =
        calculateLevel(
            p.xp
        );

}


// ============================================================
// COUNTRIES DATABASE
// ============================================================

let countryFilter = "All";


function openCountries() {

    filterCountries("All");

    showScreen(
        "countriesScreen"
    );

}


function filterCountries(filter) {

    countryFilter = filter;

    const list =
        filter === "All"
        ?
        countries
        :
        countries.filter(
            c => c[4] === filter
        );

    document.getElementById(
        "countryCount"
    ).textContent =
        list.length;

    document.getElementById(
        "countryList"
    ).innerHTML =
        list.map(
            c => `

                <div class="country-card">

                    <h3>
                        ${c[0]}
                    </h3>

                    <p>
                        🏛️ Capital:
                        ${c[1]}
                    </p>

                    <p>
                        💰 Currency:
                        ${c[2]}
                    </p>

                    <p>
                        🌍 Region:
                        ${c[3]}
                    </p>

                    <p>
                        🗺️ Continent:
                        ${c[4]}
                    </p>

                </div>

            `
        ).join("");

}


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


// ============================================================
// NAVIGATION
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            s => s.classList.remove("active")
        );

    const target =
        document.getElementById(id);

    if (target)
        target.classList.add("active");

    window.scrollTo(0,0);

}


function goHome() {

    stopTimer();

    if (game)
        game.locked = true;

    showScreen("homeScreen");

    refreshAll();

}


// ============================================================
// QUIT
// ============================================================

function confirmQuitGame() {

    if (
        confirm(
            "Quit this game?\nCurrent progress will be lost."
        )
    ) {

        game.locked = true;

        stopTimer();

        goHome();

    }

}


// ============================================================
// UI
// ============================================================

function updateHeader() {

    const p = getProfile();

    if (!p) {

        document.getElementById(
            "topName"
        ).textContent =
            "Guest";

        document.getElementById(
            "topLevel"
        ).textContent =
            "1";

        document.getElementById(
            "topCoins"
        ).textContent =
            "0";

        return;

    }

    document.getElementById(
        "topName"
    ).textContent =
        p.name;

    document.getElementById(
        "topLevel"
    ).textContent =
        p.level;

    document.getElementById(
        "topCoins"
    ).textContent =
        p.coins.toLocaleString();


    document.getElementById(
        "mainProfileInfo"
    ).innerHTML = `

        <div class="profile-detail-grid">

            <div>
                👤 Profile
                <strong>${p.name}</strong>
            </div>

            <div>
                👑 Rank
                <strong>${getRank(p.level)}</strong>
            </div>

            <div>
                ⭐ Level
                <strong>${p.level}</strong>
            </div>

            <div>
                ✨ XP
                <strong>${p.xp}</strong>
            </div>

            <div>
                🪙 Coins
                <strong>${p.coins}</strong>
            </div>

            <div>
                🎨 Skin
                <strong>${p.equippedSkin}</strong>
            </div>

        </div>

    `;

}


function updateGameUI() {

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
        game.xp;

    document.getElementById(
        "gameCoins"
    ).textContent =
        game.coins;

    const p = getProfile();

    document.getElementById(
        "gameLevel"
    ).textContent =
        p ? p.level : 1;

}


function refreshAll() {

    updateHeader();

    renderProfiles();

    renderShop();

    renderInventory();

    renderAchievements();

}


// ============================================================
// TOAST
// ============================================================

let toastTimer = null;

function toast(message) {

    const el =
        document.getElementById(
            "toast"
        );

    el.textContent =
        message;

    el.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                el.classList.remove(
                    "show"
                );

            },
            2200
        );

}


// ============================================================
// OWNER PANEL
// ============================================================

let ownerOpen = false;

const OWNER_CODE =
    "OWNER_V30";


function toggleOwnerPanel() {

    if (ownerOpen) {

        ownerOpen = false;

        goHome();

        return;

    }

    const code =
        prompt(
            "Enter Owner Code:"
        );

    if (code !== OWNER_CODE) {

        toast(
            "Access denied."
        );

        return;

    }

    ownerOpen = true;

    renderOwnerPanel();

    showScreen(
        "ownerScreen"
    );

}


function renderOwnerPanel() {

    document.getElementById(
        "ownerControls"
    ).innerHTML = `

        <div class="owner-control">

            <h3>💰 Economy</h3>

            <button onclick="ownerCoins()">
                Give Coins
            </button>

            <button onclick="ownerXP()">
                Give XP
            </button>

            <button onclick="ownerLevel()">
                Set Level
            </button>

        </div>

        <div class="owner-control">

            <h3>🎁 Items</h3>

            <button onclick="ownerGiveItem()">
                Give Item
            </button>

            <button onclick="ownerGiveChest()">
                Give Chest
            </button>

            <button onclick="ownerGiveSkin()">
                Unlock All Skins
            </button>

        </div>

        <div class="owner-control">

            <h3>👹 Boss Testing</h3>

            <button onclick="ownerBoss('Divine')">
                Spawn Divine Boss
            </button>

            <button onclick="ownerBoss('Mythic')">
                Spawn Mythic Boss
            </button>

            <button onclick="ownerBoss('Common')">
                Spawn Test Boss
            </button>

        </div>

        <div class="owner-control">

            <h3>🏆 Achievements</h3>

            <button onclick="ownerAchievements()">
                Unlock All
            </button>

            <button onclick="ownerResetAchievements()">
                Reset Achievements
            </button>

        </div>

        <div class="owner-control">

            <h3>🧪 Debug</h3>

            <button onclick="ownerFullInventory()">
                Max Inventory
            </button>

            <button onclick="ownerResetGame()">
                Reset Profile
            </button>

            <button onclick="ownerExport()">
                Export Save
            </button>

        </div>

    `;

}


function ownerCoins() {

    const p = getProfile();

    if (!p)
        return;

    const amount =
        Number(
            prompt(
                "Coins to add:"
            )
        );

    if (!isNaN(amount)) {

        p.coins += amount;

        saveData();

        updateHeader();

        toast(
            "Coins added."
        );

    }

}


function ownerXP() {

    const p = getProfile();

    if (!p)
        return;

    const amount =
        Number(
            prompt(
                "XP to add:"
            )
        );

    if (!isNaN(amount)) {

        addXP(amount);

        saveData();

        updateHeader();

        toast(
            "XP added."
        );

    }

}


function ownerLevel() {

    const p = getProfile();

    if (!p)
        return;

    const level =
        Number(
            prompt(
                "Set Level:"
            )
        );

    if (
        !isNaN(level) &&
        level >= 1
    ) {

        p.level = level;

        p.xp =
            Math.pow(
                level-1,
                2
            ) * 100;

        saveData();

        updateHeader();

        toast(
            "Level changed."
        );

    }

}


function ownerGiveItem() {

    const p = getProfile();

    if (!p)
        return;

    const item =
        prompt(
            "Item name:\n" +
            shopItems
                .map(i=>i.name)
                .join(", ")
        );

    if (!item)
        return;

    p.inventory[item] =
        (p.inventory[item] || 0) + 10;

    saveData();

    toast(
        "Items added."
    );

}


function ownerGiveChest() {

    const p = getProfile();

    if (!p)
        return;

    const type =
        prompt(
            "Chest type:\n" +
            Object.keys(
                chestData
            ).join(", ")
        );

    if (
        !chestData[type]
    )
        return;

    p.chests[type] += 5;

    saveData();

    toast(
        "Chests added."
    );

}


function ownerGiveSkin() {

    const p = getProfile();

    if (!p)
        return;

    skins.forEach(
        s => p.skins[s.name] = true
    );

    saveData();

    renderShop();

    toast(
        "All skins unlocked."
    );

}


function ownerBoss(rarity) {

    const boss =
        bosses.find(
            b => b.rarity === rarity
        );

    if (!boss)
        return;

    bossGame = {

        boss:boss,

        hp:boss.hp,

        maxHp:boss.hp,

        question:0,

        totalQuestions:boss.questions,

        correct:0,

        locked:false

    };

    showScreen(
        "bossScreen"
    );

    nextBossQuestion();

}


function ownerAchievements() {

    const p = getProfile();

    if (!p)
        return;

    p.achievements =
        achievements.map(
            a => a.id
        );

    saveData();

    renderAchievements();

    toast(
        "All achievements unlocked."
    );

}


function ownerResetAchievements() {

    const p = getProfile();

    if (!p)
        return;

    p.achievements = [];

    saveData();

    renderAchievements();

    toast(
        "Achievements reset."
    );

}


function ownerFullInventory() {

    const p = getProfile();

    if (!p)
        return;

    shopItems.forEach(
        i => {
            p.inventory[i.name] = 99;
        }
    );

    Object.keys(
        p.chests
    ).forEach(
        c => p.chests[c] = 99
    );

    saveData();

    renderInventory();

    toast(
        "Inventory maximized."
    );

}


function ownerResetGame() {

    if (
        !confirm(
            "Reset current profile?"
        )
    )
        return;

    const p = getProfile();

    if (!p)
        return;

    const name = p.name;

    Object.assign(
        p,
        defaultProfile(name)
    );

    saveData();

    refreshAll();

    toast(
        "Profile reset."
    );

}


function ownerExport() {

    const data =
        JSON.stringify(
            profiles,
            null,
            2
        );

    prompt(
        "COPY SAVE DATA:",
        data
    );

}


// ============================================================
// KEYBOARD
// OWNER = O
// ============================================================

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key.toLowerCase() === "o"
        ) {

            toggleOwnerPanel();

        }

    }
);


// ============================================================
// DAILY FIX:
// Make nextQuestion route to Daily when necessary.
// ============================================================

const _nextQuestion =
    nextQuestion;

nextQuestion =
    function() {

        if (
            game.mode === "daily"
        ) {

            nextDailyQuestion();

            return;

        }

        _nextQuestion();

    };


// ============================================================
// INITIALIZE
// ============================================================

loadData();

profiles.forEach(
    ensureProfileData
);

if (
    profiles.length &&
    !currentProfile
)
    currentProfile =
        profiles[0].name;

selectedProfile =
    currentProfile;

saveData();

refreshAll();

showScreen(
    "homeScreen"
);

console.log(
    "🌏 Asia Country Guessing Game v3.0 loaded!"
);
