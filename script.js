const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const historyList = document.querySelector("#history");
const memoryState = document.querySelector("#memory-state");
const themeToggle = document.querySelector("#theme-toggle");
const currencyButtons = document.querySelectorAll("[data-currency]");

let currentValue = "0";
let storedValue = null;
let pendingOperation = null;
let waitingForOperand = false;
let memory = 0;
let lastExpression = "Ready when you are";
let currency = "none";

const symbols = { add: "+", subtract: "−", multiply: "×", divide: "÷" };
const currencySymbols = { USD: "$", EUR: "€", GBP: "£", JPY: "¥" };

function updateDisplay() {
	display.textContent = formatCurrency(currentValue);
	expression.textContent = lastExpression;
	memoryState.textContent = formatCurrency(memory);
}

function formatCurrency(value) {
	if (value === "Error" || currency === "none") return value;
	return `${currencySymbols[currency]}${value}`;
}

function formatNumber(value) {
	if (!Number.isFinite(value)) return "Error";
	return Number(value.toPrecision(12)).toString();
}

function inputNumber(number) {
	if (currentValue === "Error" || waitingForOperand) {
		currentValue = number;
		waitingForOperand = false;
	} else {
		currentValue = currentValue === "0" ? number : currentValue + number;
	}
	lastExpression = pendingOperation ? `${formatNumber(storedValue)} ${symbols[pendingOperation]}` : "Typing";
	updateDisplay();
}

function inputDecimal() {
	if (currentValue === "Error" || waitingForOperand) {
		currentValue = "0.";
		waitingForOperand = false;
	} else if (!currentValue.includes(".")) {
		currentValue += ".";
	}
	updateDisplay();
}

function calculate(first, second, operation) {
	if (operation === "add") return first + second;
	if (operation === "subtract") return first - second;
	if (operation === "multiply") return first * second;
	if (operation === "divide") return second === 0 ? NaN : first / second;
	return second;
}

function chooseOperation(operation) {
	const inputValue = Number(currentValue);
	if (Number.isNaN(inputValue)) return reset();
	if (pendingOperation && !waitingForOperand) {
		const result = calculate(storedValue, inputValue, pendingOperation);
		storedValue = result;
		currentValue = formatNumber(result);
	} else {
		storedValue = inputValue;
	}
	pendingOperation = operation;
	waitingForOperand = true;
	lastExpression = `${formatNumber(storedValue)} ${symbols[operation]}`;
	updateDisplay();
}

function equals() {
	if (!pendingOperation || storedValue === null) return;
	const secondValue = Number(currentValue);
	const firstValue = storedValue;
	const operation = pendingOperation;
	const result = calculate(firstValue, secondValue, operation);
	const resultText = formatNumber(result);
	lastExpression = `${formatNumber(firstValue)} ${symbols[operation]} ${formatNumber(secondValue)} =`;
	addHistory(lastExpression, formatCurrency(resultText));
	currentValue = resultText;
	storedValue = null;
	pendingOperation = null;
	waitingForOperand = true;
	updateDisplay();
}

function reset() {
	currentValue = "0";
	storedValue = null;
	pendingOperation = null;
	waitingForOperand = false;
	lastExpression = "Ready when you are";
	updateDisplay();
}

function backspace() {
	if (waitingForOperand || currentValue === "Error") return;
	currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
	if (currentValue === "-") currentValue = "0";
	updateDisplay();
}

function percent() {
	if (currentValue === "Error") return;
	currentValue = formatNumber(Number(currentValue) / 100);
	updateDisplay();
}

function addHistory(calculation, result) {
	const item = document.createElement("li");
	item.className = "history-item";
	item.innerHTML = `<span>${calculation}</span><strong>${result}</strong>`;
	historyList.prepend(item);
	while (historyList.children.length > 3) historyList.lastElementChild.remove();
}

document.querySelectorAll("[data-number]").forEach((button) => {
	button.addEventListener("click", () => inputNumber(button.dataset.number));
});

document.querySelectorAll("[data-operation]").forEach((button) => {
	button.addEventListener("click", () => chooseOperation(button.dataset.operation));
});

document.querySelector('[data-action="decimal"]').addEventListener("click", inputDecimal);
document.querySelector('[data-action="equals"]').addEventListener("click", equals);
document.querySelector('[data-action="clear"]').addEventListener("click", reset);
document.querySelector('[data-action="backspace"]').addEventListener("click", backspace);
document.querySelector('[data-action="percent"]').addEventListener("click", percent);
document.querySelector('[data-action="clear-history"]').addEventListener("click", () => { historyList.replaceChildren(); });

currencyButtons.forEach((button) => {
	button.addEventListener("click", () => {
		currency = button.dataset.currency;
		currencyButtons.forEach((option) => option.classList.toggle("is-active", option === button));
		updateDisplay();
	});
});

themeToggle.addEventListener("click", () => {
	document.documentElement.classList.toggle("light-mode");
	themeToggle.textContent = document.documentElement.classList.contains("light-mode") ? "☼" : "◐";
});

document.addEventListener("keydown", (event) => {
	if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
	else if (event.key === ".") inputDecimal();
	else if (event.key === "Enter" || event.key === "=") equals();
	else if (event.key === "Escape") reset();
	else if (event.key === "Backspace") backspace();
	else if (event.key === "%") percent();
	else if (["+", "-", "*", "/"].includes(event.key)) {
		const operation = { "+": "add", "-": "subtract", "*": "multiply", "/": "divide" }[event.key];
		chooseOperation(operation);
	} else return;
	event.preventDefault();
});

updateDisplay();
