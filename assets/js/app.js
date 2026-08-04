console.log("========== APP STARTING ==========");

// =============================
// DOM ELEMENTS
// =============================

const instrumentSelect = document.getElementById("instrument");
const tradeType = document.getElementById("tradeType");

const balanceInput = document.getElementById("balance");
const riskInput = document.getElementById("risk");

const entryInput = document.getElementById("entry");
const stopLossInput = document.getElementById("stopLoss");
const takeProfitInput = document.getElementById("takeProfit");

const calculateBtn = document.getElementById("calculateBtn");

const message = document.getElementById("message");

const riskAmountDisplay = document.getElementById("riskAmount");
const lotSizeDisplay = document.getElementById("lotSize");
const slPipsDisplay = document.getElementById("slPips");
const rrDisplay = document.getElementById("rr");

console.log("Button:", calculateBtn);
console.log("Instrument Select:", instrumentSelect);
console.log("Instruments Object:", instruments);


// =============================
// LOAD INSTRUMENTS
// =============================

function loadInstruments() {

    console.log("Loading instruments...");

    instrumentSelect.innerHTML = "";

    for (const key in instruments) {

        console.log("Adding:", key);

        const option = document.createElement("option");

        option.value = key;
        option.textContent = instruments[key].name;

        instrumentSelect.appendChild(option);

    }

}

loadInstruments();


// =============================
// EVENTS
// =============================

calculateBtn.addEventListener("click", () => {

    console.log("Calculate Button Clicked!");

    calculateTrade();

});

balanceInput.addEventListener("input", calculateTrade);
riskInput.addEventListener("input", calculateTrade);
entryInput.addEventListener("input", calculateTrade);
stopLossInput.addEventListener("input", calculateTrade);
takeProfitInput.addEventListener("input", calculateTrade);

instrumentSelect.addEventListener("change", calculateTrade);
tradeType.addEventListener("change", calculateTrade);


// =============================
// MESSAGE
// =============================

function showError(text) {

    console.log("ERROR:", text);

    message.classList.remove("d-none");
    message.textContent = text;

}

function clearError() {

    message.classList.add("d-none");
    message.textContent = "";

}


// =============================
// CALCULATOR
// =============================

function calculateTrade() {

    console.log("calculateTrade() called");

    clearError();

    const balance = parseFloat(balanceInput.value);
    const riskPercent = parseFloat(riskInput.value);
    const entry = parseFloat(entryInput.value);
    const stopLoss = parseFloat(stopLossInput.value);
    const takeProfit = parseFloat(takeProfitInput.value);

    console.log({
        balance,
        riskPercent,
        entry,
        stopLoss,
        takeProfit
    });

    if (
        isNaN(balance) ||
        isNaN(riskPercent) ||
        isNaN(entry) ||
        isNaN(stopLoss) ||
        isNaN(takeProfit)
    ) {

        console.log("Missing input...");

        riskAmountDisplay.textContent = "$0.00";
        lotSizeDisplay.textContent = "0.00";
        slPipsDisplay.textContent = "0 pips";
        rrDisplay.textContent = "0 : 0";

        return;
    }

    const instrument = instruments[instrumentSelect.value];

    console.log("Selected Instrument:", instrument);

    const riskAmount = balance * (riskPercent / 100);

    const stopDistance = Math.abs(entry - stopLoss);

    const takeProfitDistance = Math.abs(takeProfit - entry);

    const slPips = stopDistance / instrument.pipSize;

    const tpPips = takeProfitDistance / instrument.pipSize;

    const rr = tpPips / slPips;

    const lotSize =
        riskAmount /
        (stopDistance * instrument.contractSize);

    console.log({
        riskAmount,
        stopDistance,
        slPips,
        tpPips,
        rr,
        lotSize
    });

    riskAmountDisplay.textContent = "$" + riskAmount.toFixed(2);
    lotSizeDisplay.textContent = lotSize.toFixed(2) + " Lots";
    slPipsDisplay.textContent = slPips.toFixed(1) + " pips";
    rrDisplay.textContent = "1 : " + rr.toFixed(2);

    console.log("Calculation Complete");
}

console.log("========== APP READY ==========");