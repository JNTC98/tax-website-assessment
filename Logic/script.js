// Simple script to switch between the topic panels.
const panels = Array.from(document.querySelectorAll('.switcher-panel'));
const buttons = Array.from(document.querySelectorAll('.switcher-btn'));
const navButtons = Array.from(document.querySelectorAll('[data-nav]'));

if (panels.length && buttons.length) {
    let activeIndex = 0;

    // Show the selected panel and update the active button.
    function updatePanel(index) {
        activeIndex = (index + panels.length) % panels.length;

        panels.forEach((panel, panelIndex) => {
            panel.classList.toggle('active', panelIndex === activeIndex);
        });

        buttons.forEach((button, buttonIndex) => {
            const isActive = buttonIndex === activeIndex;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', String(isActive));
        });
    }

    // Switch panels when a topic button is clicked.
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetPanel = document.getElementById(button.dataset.panel);
            const targetIndex = panels.indexOf(targetPanel);
            if (targetIndex >= 0) {
                updatePanel(targetIndex);
            }
        });
    });

    // Move to the next or previous panel.
    navButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const direction = button.dataset.nav === 'next' ? 1 : -1;
            updatePanel(activeIndex + direction);
        });
    });

    updatePanel(0);
}

// calculator
const calculatorForm = document.querySelector('.calculator-form');
const calculateButton = document.getElementById('calculate-btn');
const subtotalValue = document.getElementById('subtotal-value');
const gstValue = document.getElementById('gst-value');
const importValue = document.getElementById('import-value');
const totalValue = document.getElementById('total-value');

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function resetResults() {
    if (subtotalValue) subtotalValue.textContent = '$0.00';
    if (gstValue) gstValue.textContent = '$0.00';
    if (importValue) importValue.textContent = '$0.00';
    if (totalValue) totalValue.textContent = '$0.00';
}

if (calculatorForm && calculateButton) {
    calculateButton.addEventListener('click', () => {
        const revenue = Number(document.getElementById('item-price').value) || 0;
        const gstRate = Number(document.getElementById('gst-rate').value) || 0;
        const importRate = Number(document.getElementById('import-rate').value) || 0;

        const subtotal = revenue;
        const gst = revenue * (gstRate / 100);
        const importTax = revenue * (importRate / 100);
        const total = subtotal + gst + importTax;

        subtotalValue.textContent = formatCurrency(subtotal);
        gstValue.textContent = formatCurrency(gst);
        importValue.textContent = formatCurrency(importTax);
        totalValue.textContent = formatCurrency(total);
    });

    calculatorForm.addEventListener('reset', () => {
        resetResults();
    });
}