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