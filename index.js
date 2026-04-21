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
    initTextarea(beverage);
});

function createCloseBtn() {
    const btn = document.createElement('div');
    btn.className = 'close-btn';
    btn.textContent = '\u2717';
    btn.addEventListener('click', () => {
        btn.parentElement.remove();
    });
    return btn;
}

document.querySelectorAll('fieldset').forEach(fieldSet => {
    fieldSet.appendChild(createCloseBtn());
});

const drinkNames = {
    espresso: 'Эспрессо',
    capuccino: 'Капучино',
    cacao: 'Какао',
};

const milkNames = {
    usual: 'обычное',
    'no-fat': 'обезжиренное',
    soy: 'соевое',
    coconut: 'кокосовое',
};

const optionNames = {
    'whipped cream': 'взбитые сливки',
    marshmallow: 'зефирки',
    chocolate: 'шоколад',
    cinnamon: 'корица',
};

function getDrinkWord(n) {
    const abs = Math.abs(n) % 100;
    const mod10 = abs % 10;
    if (abs >= 11 && abs <= 19) return 'напитков';
    if (mod10 === 1) return 'напиток';
    if (mod10 >= 2 && mod10 <= 4) return 'напитка';
    return 'напитков';
}

const overlay = document.querySelector('.overlay');

document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    const count = document.querySelectorAll('fieldset').length;
    document.querySelector('.modal p').textContent = `Вы заказали ${count} ${getDrinkWord(count)}`;

    const table = document.querySelector('.ready_table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Напиток</th>
                <th>Молоко</th>
                <th>Дополнительно</th>
                <th>Пожелание</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');

    document.querySelectorAll('.beverage').forEach(fieldset => {
        const selectValue = fieldset.querySelector('select').value;
        const drink = drinkNames[selectValue] || selectValue;

        const milkRadio = fieldset.querySelector('input[type="radio"]:checked');
        const milk = milkRadio ? (milkNames[milkRadio.value] || milkRadio.value) : '—';

        const checkedOptions = [...fieldset.querySelectorAll('input[type="checkbox"]:checked')]
            .map(cb => optionNames[cb.value] || cb.value);
        const options = checkedOptions.length ? checkedOptions.join(', ') : '—';

        const note = fieldset.querySelector('textarea')?.value || '—';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${drink}</td>
            <td>${milk}</td>
            <td>${options}</td>
            <td>${note}</td>
        `;
        
        tbody.appendChild(tr);
    });

    overlay.classList.remove('hidden');
});

document.querySelector('.modal-close').addEventListener('click', () => {
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.add('hidden');
    }
});

document.querySelector('.order-btn').addEventListener('click', () => {
    const timeInput = document.querySelector('.order-time');
    const value = timeInput.value;

    if (!value) return;

    const now = new Date();
    const [hours, minutes] = value.split(':').map(Number);

    const selected = new Date();
    selected.setHours(hours, minutes, 0, 0);

    if (selected < now) {
        timeInput.style.border = '2px solid red';
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
        return;
    }

    timeInput.style.border = '';
    overlay.classList.add('hidden');
});

const urgentWords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];

function initTextarea(fieldset) {
    const textarea = fieldset.querySelector('textarea');
    const preview = fieldset.querySelector('.note-preview');

    textarea.addEventListener('input', () => {
        const text = textarea.value;

        preview.textContent = '';

        let currentIndex = 0;
        const regex = new RegExp(`(${urgentWords.join('|')})`, 'gi');

        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > currentIndex) {
                preview.appendChild(
                    document.createTextNode(text.slice(currentIndex, match.index))
                );
            }

            const bold = document.createElement('b');
            bold.textContent = match[0];
            preview.appendChild(bold);

            currentIndex = regex.lastIndex;
        }

        if (currentIndex < text.length) {
            preview.appendChild(
                document.createTextNode(text.slice(currentIndex))
            );
        }
    });
}


let fieldSets = document.querySelectorAll('fieldset');

for (const fieldSet of fieldSets) {
    fieldSet.appendChild(createCloseBtn());
    initTextarea(fieldSet);
}
