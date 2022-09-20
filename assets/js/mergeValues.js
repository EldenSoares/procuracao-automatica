const data = document.querySelectorAll("input[type=text]")
const generate = document.querySelector(`[data-action="data-procuracao"]`)
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

// adiciona dados do cliente e poderes
generate.addEventListener('click', () => {

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

})

const urlData = new URLSearchParams(location.search)
const objetoEspecificoContent = urlData.get('objeto')
if(objetoEspecificoContent != "" || objetoEspecificoContent != null){
    objetoEspecifico.value = objetoEspecificoContent
}

const hoje = document.getElementById("hoje")
const option = {
    year: 'numeric',
    month: ('long' || 'short' || 'numeric'),
    day: 'numeric'
}

// data atual
hoje.innerText = `${new Date().toLocaleDateString('pt-br', option)}.`
