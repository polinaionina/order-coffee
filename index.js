let countDrinks = 1;
document.querySelector('.add-button').addEventListener('click', () => {
    countDrinks += 1;

    const beverage = document.querySelector('.beverage').cloneNode(true);
    beverage.querySelector('.beverage-count').textContent = `Напиток №${countDrinks}`;
    beverage.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.name = `milk-${countDrinks}`;
        radio.checked = radio.value === 'usual';
    });

    beverage.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    const addButtonDiv = document.querySelector('.add-button').parentElement;
    addButtonDiv.before(beverage);
    beverage.appendChild(createCloseBtn());
})

let fieldSets = document.querySelectorAll('fieldset');

function createCloseBtn() {
    const btn = document.createElement('div');
    btn.className = 'close-btn';
    btn.textContent = '\u2717';
    btn.addEventListener('click', () => {
        btn.parentElement.remove();
    });
    return btn;
}

for (const fieldSet of fieldSets) {
    fieldSet.appendChild(createCloseBtn());
}

const overlay = document.querySelector('.overlay');
document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    overlay.classList.remove('hidden');
})

document.querySelector('.modal-close').addEventListener('click', () => {
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    overlay.classList.add('hidden');
  }
});

function getDrinkWord(n) {
    const abs = Math.abs(n) % 100;
    const mod10 = abs % 10;
    if (abs >= 11 && abs <= 19) return 'напитков';
    if (mod10 === 1) return 'напиток';
    if (mod10 >= 2 && mod10 <= 4) return 'напитка';
    return 'напитков';
}

document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();
    const count = document.querySelectorAll('fieldset').length;
    document.querySelector('.modal p').textContent = `Вы заказали ${count} ${getDrinkWord(count)}`;
    overlay.classList.remove('hidden');
});
