// ==========================================
// Populate Instrument Dropdown
// ==========================================

const instrumentSelect = document.getElementById("instrument");

for (const key in instruments) {

    const option = document.createElement("option");

    option.value = key;
    option.textContent = instruments[key].name;

    instrumentSelect.appendChild(option);

}

// ==========================================
// Live Event Listeners
// ==========================================

document.getElementById("balance").addEventListener("input", calculateTrade);
document.getElementById("risk").addEventListener("input", calculateTrade);
document.getElementById("entry").addEventListener("input", calculateTrade);
document.getElementById("stopLoss").addEventListener("input", calculateTrade);
document.getElementById("takeProfit").addEventListener("input", calculateTrade);
document.getElementById("instrument").addEventListener("change", calculateTrade);

// ==========================================
// Main Function
// ==========================================

function calculateTrade() {

    const balance = parseFloat(document.getElementById("balance").value);
    const risk = parseFloat(document.getElementById("risk").value);
    const entry = parseFloat(document.getElementById("entry").value);
    const stopLoss = parseFloat(document.getElementById("stopLoss").value);

    const takeProfitText = document.getElementById("takeProfit").value;
    const takeProfit = parseFloat(takeProfitText);

    // ==========================================
    // Reset if required fields are missing
    // ==========================================

    if (
        isNaN(balance) ||
        isNaN(risk) ||
        isNaN(entry) ||
        isNaN(stopLoss)
    ) {

        document.getElementById("riskAmount").textContent = "$0.00";
        document.getElementById("lotSize").textContent = "0.00 Lots";
        document.getElementById("slPips").textContent = "0 pips";
        document.getElementById("rr").textContent = "--";

        return;

    }

    // Prevent division by zero

    if (entry === stopLoss) {

        document.getElementById("riskAmount").textContent = "$0.00";
        document.getElementById("lotSize").textContent = "0.00 Lots";
        document.getElementById("slPips").textContent = "0 pips";
        document.getElementById("rr").textContent = "--";

        return;

    }

    // ==========================================
    // Instrument
    // ==========================================

    const instrument = instruments[instrumentSelect.value];

    // ==========================================
    // Calculations
    // ==========================================

    const riskAmount = balance * (risk / 100);

    const stopDistance = Math.abs(entry - stopLoss);

    const stopLossPips = stopDistance / instrument.pipSize;

    const lotSize =
        riskAmount /
        (stopDistance * instrument.contractSize);

    // ==========================================
    // Display Results
    // ==========================================

    document.getElementById("riskAmount").textContent =
        "$" + riskAmount.toFixed(2);

    document.getElementById("lotSize").textContent =
        lotSize.toFixed(2) + " Lots";

    document.getElementById("slPips").textContent =
        stopLossPips.toFixed(1) + " pips";

    // ==========================================
    // Risk : Reward (Optional)
    // ==========================================

    if (!isNaN(takeProfit)) {

        const takeProfitDistance = Math.abs(takeProfit - entry);

        const takeProfitPips =
            takeProfitDistance / instrument.pipSize;

        const riskReward =
            takeProfitPips / stopLossPips;

        document.getElementById("rr").textContent =
            "1 : " + riskReward.toFixed(2);

    } else {

        document.getElementById("rr").textContent = "--";

    }

}

// Run once on page load

calculateTrade();