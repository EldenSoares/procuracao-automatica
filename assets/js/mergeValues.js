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

// dados populados
// nome.value = "heráclito thiago de castro santos"
// nacionalidade.value = "brasileiro"
// estadoCivil.value = "casado"
// profissao.value = "programador"
// rg.value = "123456789 SSP/RJ, expedida em 21/03/2006"
// cpf.value = "12345678900"
// enderecoEletronico.value = "ht.adv@outlook.com"
// endereco.value = "Rua das flores, nº 123 - Centro - São Paulo - SP, CEP: 01234-567"
objetoEspecifico.value = "Ação de Alvará"

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

const hoje = document.getElementById("hoje")
const option = {
    year: 'numeric',
    month: ('long' || 'short' || 'numeric'),
    day: 'numeric'
}

// data atual
hoje.innerText = `${new Date().toLocaleDateString('pt-br', option)}.`
