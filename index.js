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