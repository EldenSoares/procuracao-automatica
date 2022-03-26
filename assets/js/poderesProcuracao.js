const ulList = document.getElementById('powerList');
const powerList = document.querySelectorAll('.list-group-item');
const checkboxes = document.querySelectorAll('input');
const toogleBtn = document.querySelector("#labelToggle")
const toogleBox = document.getElementById('toggle');
const formChecks = document.querySelectorAll(".form-check")
const procRogo = document.getElementById('procuracaoRogo');

const powers = [
    'receber citação',
    'confessar',
    'reconhecer a procedência do pedido',
    'transigir',
    'desistir',
    'renunciar ao direito sobre o qual se funda a ação',
    'receber',
    'dar quitação',
    'firmar compromisso',
    'assinar declaração de hipossuficiência econômica',
    'receber alvarás, RPV e Precatórios'
];
const tooglePowers = () => {
    function toogle(bool) {
        ulList.querySelectorAll('input').forEach(el => {
            if (el.checked == bool) {
                el.click()
            }
        })
    }
    if (toogleBox.checked == true) {
        //marcar tudo
        toogle(true)
    } else {
        //desmarcar tudo
        toogle(false)
    }

}

const toggleClass = (el) => {
    if (el.classList.contains('btn-danger')) {
        el.classList.remove('btn-danger');
        el.classList.add('btn-success');
    }
    else {
        el.classList.remove('btn-success');
        el.classList.add('btn-danger');
    }
}

const camelize = str => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const createPowers = powers => {
    //create div element to append power
    const divPower = document.createElement('div');
    divPower.classList.add('form-check');
    divPower.draggable = true;

    //create input element to append power
    const inputPower = document.createElement('input');
    inputPower.type = 'checkbox';
    inputPower.classList.add('form-check-input');
    inputPower.setAttribute("value", camelize(powers));
    inputPower.setAttribute("name", camelize(powers));
    inputPower.setAttribute("data-value", powers);
    inputPower.setAttribute("checked", "checked");

    //create label element to append power
    const labelDescription = document.createElement('label');
    labelDescription.classList.add('form-check-label');
    labelDescription.setAttribute("for", camelize(powers));
    labelDescription.innerText = powers;

    //create button element to append power
    const itemList = document.createElement('li');
    itemList.classList.add('list-group-item', 'pt-0', 'pb-0');

    const powerList = document.querySelector('#powerList');

    //append elements
    itemList.append(divPower)
    divPower.append(inputPower, labelDescription)
    powerList.appendChild(itemList);
}

powers.forEach(power => createPowers(power));

toogleBtn.addEventListener('click', () => {
    if (toogleBox.checked) {
        toogleBox.checked = false;
        toogleBtn.innerText = "Desmarcar tudo";
    } else {
        toogleBtn.innerText = "Marcar tudo";
        toogleBox.checked = true;
    }
    tooglePowers();
    toggleClass(toogleBtn)
});

ulList.addEventListener('change', e => {
    if (e.target.checked == false) {
        document.querySelector(`label[for="${e.target.value}"]`).style.textDecoration = 'line-through';
    } else {
        document.querySelector(`label[for="${e.target.value}"]`).style.textDecoration = 'none';
    }
})

const labelRogo = document.querySelector("label[for='procuracaoRogo']")
const tags = document.querySelectorAll(".pessoaAnalfabeta")

procRogo.addEventListener('change', e => {
    if (e.target.checked == true) {
        labelRogo.innerText = "Cliente não Alfabetizado"
        tags.forEach(element => element.classList.remove("d-none"));
    } else {
        labelRogo.innerText = "Cliente Alfabetizado"
    }
})