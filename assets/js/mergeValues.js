const data = document.querySelectorAll("input[type=text]")
const generate = document.querySelector(`[data-action="data-procuracao"]`)
const deleteAllData = document.querySelector('button[type=reset]')
const nome = document.getElementById("nome")
const nacionalidade = document.getElementById("nacionalidade")
const estadoCivil = document.getElementById("estadoCivil")
const profissao = document.getElementById("profissao")
const rg = document.getElementById("rg")
const cpf = document.getElementById("cpf")
const enderecoEletronico = document.getElementById("enderecoEletronico")
const endereco = document.getElementById("endereco")
const objetoEspecifico = document.getElementById("objetoEspecifico")
const poderes = document.getElementById("powerList").querySelectorAll("input[type=checkbox]")
let poderesProcuracao = document.getElementById("poderesProcuracao")

const clientObj = {}

const urlData = new URLSearchParams(location.search)
const objetoEspecificoContent = urlData.get('objeto')
if (objetoEspecificoContent != "" || objetoEspecificoContent != null) {
    objetoEspecifico.value = objetoEspecificoContent
}

if (localStorage.getItem('procuracaoAdJudicia') != null) {
    const dataUsuario = JSON.parse(localStorage.getItem('procuracaoAdJudicia'))

    dataUsuario.forEach((el) => {
        if (Object.keys(el) == 'objetoEspecifico') {
            const textArea = document.querySelector('textarea')
            textArea.innerText = Object.values(el)
        }
        document.querySelector(`[id=${Object.keys(el)}]`).value = Object.values(el)
    })
}


const hoje = document.getElementById("hoje")
const option = {
    year: 'numeric',
    month: ('long' || 'short' || 'numeric'),
    day: 'numeric'
}

// data atual
hoje.innerText = `${new Date().toLocaleDateString('pt-br', option)}.`


function deleteDataLocalStorage() {
    localStorage.clear('procuracaoAdJudicia')
}

deleteAllData.addEventListener('click', () => deleteDataLocalStorage())

// adiciona dados do cliente e poderes
generate.addEventListener('click', () => {

    const arrayDeDados = Array.from(document.querySelectorAll('input[type=text]'))
    arrayDeDados.push(document.querySelector('textarea'))

    //converte os dados em array de objetos
    const objData = arrayDeDados.map(({
        value,
        id
    }) => {
        return {
            [id]: value
        }
    })

    //remove os itens para fazer o update dos dados
    if (localStorage.getItem('procuracaoAdJudicia') != null) {
        deleteDataLocalStorage()
    }

    //salva todos os dados do formulário no navegador do usuário
    localStorage.setItem('procuracaoAdJudicia', JSON.stringify(objData))

    //verifica se todos os poderes estão marcados
    poderesProcuracao.innerText = toogleBox.checked == true ? "" : "conferindo-lhe ainda, os poderes especiais para "

    document.getElementById("cliente").innerText = `${nome.value.toUpperCase()}, ${nacionalidade.value}, ${estadoCivil.value}, ${profissao.value}, portador da cédula de identidade nº ${rg.value}, inscrito devidamente no CPF nº ${cpf.value}, endereço eletrônico ${enderecoEletronico.value}, residente e domiciliado à ${endereco.value}.`

    document.getElementById("objeto").innerText = `${objetoEspecifico.value}`

    document.getElementById("assinatura").innerText = tags[0].classList.contains('d-none') == false ? "rogado" : `${nome.value}`

    tags[0].classList.contains('d-none') == true ?
        document.querySelector("body > div > form > div.data-step.data-procuracao > div.text-center.pb-4")
        .classList.add('pt-3') : ''

    poderes.forEach(el => {
        if (el.checked) {
            poderesProcuracao.innerText += `${el.dataset.value}, `
        }
    })

    clientObj.nome = nome.value
    clientObj.nacionalidade = nacionalidade.value
    clientObj["estado-civil"] = estadoCivil.value
    clientObj.profissao = profissao.value
    clientObj["documento-pessoal"] = rg.value
    clientObj.cpf = cpf.value
    clientObj.endereco = endereco.value
    clientObj.email = enderecoEletronico.value
    clientObj.telefone = telefone.value

    clientBody = new FormData()
    for (const key in clientObj) {
       clientBody.append(key, clientObj[key])
    }

    fetch('https://script.google.com/macros/s/AKfycbzdSM8Xlpwknt_d4bYxBEZgRUXc2Ol-79AmxEAZUw9zbU1AOcSMjiPhoiGC0z1eyXc/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: FormData
        })
        .then(resp => resp.json())
        .then(debug => console.log(debug))
        .catch(error => console.log(error))

})
