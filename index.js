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
