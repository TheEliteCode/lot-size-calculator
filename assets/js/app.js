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


// =============================
// LOAD INSTRUMENTS
// =============================

function loadInstruments(){

    instrumentSelect.innerHTML="";

    for(const key in instruments){

        const option=document.createElement("option");

        option.value=key;
        option.textContent=instruments[key].name;

        instrumentSelect.appendChild(option);

    }

}

loadInstruments();


// =============================
// EVENTS
// =============================

calculateBtn.addEventListener("click", calculateTrade);

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

function showError(text){

    message.classList.remove("d-none");
    message.textContent=text;

}

function clearError(){

    message.classList.add("d-none");
    message.textContent="";

}


// =============================
// CALCULATOR
// =============================

function calculateTrade(){

    clearError();

    const balance=parseFloat(balanceInput.value);
    const riskPercent=parseFloat(riskInput.value);

    const entry=parseFloat(entryInput.value);
    const stopLoss=parseFloat(stopLossInput.value);
    const takeProfit=parseFloat(takeProfitInput.value);

    if(

        isNaN(balance) ||

        isNaN(riskPercent) ||

        isNaN(entry) ||

        isNaN(stopLoss) ||

        isNaN(takeProfit)

    ){

        riskAmountDisplay.textContent="$0.00";
        lotSizeDisplay.textContent="0.00";
        slPipsDisplay.textContent="0 pips";
        rrDisplay.textContent="0 : 0";

        return;

    }

    const instrument=instruments[instrumentSelect.value];

    const riskAmount=balance*(riskPercent/100);

    const stopDistance=Math.abs(entry-stopLoss);

    const takeProfitDistance=Math.abs(takeProfit-entry);

    const slPips=stopDistance/instrument.pipSize;

    const tpPips=takeProfitDistance/instrument.pipSize;

    const rr=tpPips/slPips;

    const lotSize=

        riskAmount/

        (stopDistance*instrument.contractSize);

    riskAmountDisplay.textContent="$"+riskAmount.toFixed(2);

    lotSizeDisplay.textContent=lotSize.toFixed(2)+" Lots";

    slPipsDisplay.textContent=slPips.toFixed(1)+" pips";

    rrDisplay.textContent="1 : "+rr.toFixed(2);

}