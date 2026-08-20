// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// SHOP SYSTEM
// ============================================================


// ============================================================
// SHOP DATABASE
// ============================================================

const shopItems = [

    {
        id: "hints",

        icon: "💡",

        name: "Hint",

        description:
            "Remove two incorrect answers.",

        price: 100,

        type: "consumable"
    },


    {
        id: "extraLives",

        icon: "❤️",

        name: "Extra Life",

        description:
            "Start the next game with +1 Life.",

        price: 250,

        type: "consumable"
    },


    {
        id: "doubleXP",

        icon: "✨",

        name: "Double XP",

        description:
            "Double XP from one correct answer.",

        price: 500,

        type: "consumable"
    },


    {
        id: "scoreBoost",

        icon: "📈",

        name: "Score Boost",

        description:
            "Increase one score reward by 25%.",

        price: 500,

        type: "consumable"
    },


    {
        id: "secondChance",

        icon: "🔄",

        name: "Second Chance",

        description:
            "Prevent one Life from being lost.",

        price: 750,

        type: "consumable"
    },


    {
        id: "luckyAnswer",

        icon: "🍀",

        name: "Lucky Answer",

        description:
            "Turn one wrong answer into a correct answer.",

        price: 1500,

        type: "consumable"
    }

];


// ============================================================
// GET SHOP ITEM
// ============================================================

function getShopItem(id) {

    return shopItems.find(
        item => item.id === id
    );

}


// ============================================================
// GET ITEM COUNT
// ============================================================

function getItemCount(
    profile,
    item
) {

    if (!profile)
        return 0;


    if (
        typeof profile[item.id] !== "number"
    ) {

        profile[item.id] = 0;

    }


    return profile[item.id];

}


// ============================================================
// CAN BUY
// ============================================================

function canBuyItem(
    item
) {

    const profile =
        getProfile();


    if (!profile)
        return false;


    return profile.coins >= item.price;

}


// ============================================================
// BUY ITEM
// ============================================================

function buyShopItem(
    id
) {

    const profile =
        getProfile();


    if (!profile) {

        toast(
            "Create/select a profile first."
        );

        return;

    }


    const item =
        getShopItem(id);


    if (!item) {

        console.error(
            "Shop item not found:",
            id
        );

        return;

    }


    if (
        profile.coins <
        item.price
    ) {

        toast(
            "❌ Not enough Coins."
        );

        return;

    }


    profile.coins -=
        item.price;


    if (
        typeof profile[item.id] !==
        "number"
    ) {

        profile[item.id] = 0;

    }


    profile[item.id]++;


    save();


    renderShop();


    toast(
        `🛒 Purchased ${item.name}!`
    );

}


// ============================================================
// LEGACY BUY FUNCTION
// ============================================================
//
// Giữ lại buyItem() để các nút cũ trong HTML
// vẫn hoạt động trong quá trình chuyển sang V2.0.
//

function buyItem(
    item,
    price
) {

    const shopItem =
        getShopItem(item);


    if (!shopItem) {

        console.error(
            "Unknown shop item:",
            item
        );

        return;

    }


    // Nếu HTML cũ truyền price,
    // ưu tiên giá trong database.

    buyShopItem(
        shopItem.id
    );

}


// ============================================================
// RENDER SHOP
// ============================================================

function renderShop() {

    const container =
        document.getElementById(
            "shopList"
        );


    if (!container)
        return;


    const profile =
        getProfile();


    if (!profile) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>👤 No Profile</h3>

                <p>
                    Create or select a profile
                    before using the Shop.
                </p>

            </div>

        `;

        updateShopBalance();

        return;

    }


    container.innerHTML = "";


    shopItems.forEach(
        item => {

            const count =
                getItemCount(
                    profile,
                    item
                );


            const affordable =
                profile.coins >=
                item.price;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "shop-item-v2";


            card.innerHTML = `

                <div class="shop-item-icon">

                    ${item.icon}

                </div>


                <div class="shop-item-info">

                    <h3>
                        ${escapeHTML(
                            item.name
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.description
                        )}
                    </p>

                    <div class="shop-item-stock">

                        Owned:
                        <strong>
                            ${count}
                        </strong>

                    </div>

                </div>


                <div class="shop-item-buy">

                    <div class="shop-price">

                        🪙 ${item.price}

                    </div>


                    <button
                        class="shop-buy-button"
                        ${affordable ? "" : "disabled"}
                        onclick="buyShopItem('${item.id}')">

                        ${affordable
                            ? "Buy"
                            : "Not Enough"}

                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    updateShopBalance();

}


// ============================================================
// UPDATE SHOP BALANCE
// ============================================================

function updateShopBalance() {

    const element =
        document.getElementById(
            "shopCoins"
        );


    if (!element)
        return;


    const profile =
        getProfile();


    element.textContent =
        profile
        ? profile.coins
        : 0;

}


// ============================================================
// OPEN SHOP
// ============================================================

function openShop() {

    const profile =
        getProfile();


    if (!profile) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    renderShop();


    showScreen(
        "shopScreen"
    );

}


// ============================================================
// SHOP INITIALIZATION
// ============================================================

function initializeShop() {

    renderShop();

}
