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
})

let fieldSets = document.querySelectorAll('fieldset');

const closeBtn = document.createElement('div');
closeBtn.id = 'close-btn';
closeBtn.textContent = '\u2717';

closeBtn.addEventListener('click', () => {
    const parent = closeBtn.parentElement;
    parent.remove();
})

for (const fieldSet of fieldSets) {
    fieldSet.appendChild(closeBtn);
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