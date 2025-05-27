let listaEnderecos = [];

//função para buscar pelo cep
function buscarCep() {

    //testando a função
    console.log("buscando cep");

    //chamando pelo input, para poder pegar os dados dele
    const inputCep = document.getElementById('input_cep');

    //definindo o valor da variável 'valorCep' com o valor do nosso 'inputCep' (input)
    const valorCep = inputCep.value;

    //usando fetch para chamar pela API dos correios para o nosso site. 
    //o valor do input fica no final pois é assim que a API busca pelos dados daquele CEP informado
    //o link sem a alteração é: https://brasilapi.com.br/api/cep/v2/{cep} ,sendo '{cep}' a entrada do usuário que será validada
    fetch("https://brasilapi.com.br/api/cep/v2/" + valorCep)

        //'then' seria o "então": o que acontece depois de ser validado os dados do usuário. 
        .then((resposta) => { //esse "() => {}" define uma função anônima, ou seja, uma função sem nome
            //Nesse caso, está retornando convertendo o JSON dos dados do CEP e retornando pro usuário
            return resposta.json();
        })

        //esse 'then' será executado após o anterior, e ele está retornando os dados do json separadamente
        .then((json) => {
            document.getElementById('input_estado').value = json.state;
            document.getElementById('input_cidade').value = json.city;
            document.getElementById('input_bairro').value = json.neighborhood;
            document.getElementById('input_rua').value = json.street;
        });
}

function adicionarEndereco() {
    console.log("validando e salvando endereço");

    //chamando meus inputs
    const inputCep = document.getElementById('input_cep');
    const inputEstado = document.getElementById('input_estado');
    const inputCidade = document.getElementById('input_cidade');
    const inputBairro = document.getElementById('input_bairro');
    const inputRua = document.getElementById('input_rua');
    const inputNumero = document.getElementById('input_numero');


    //Verificando se está com valores no formulário
    //(não foi feito do CEP pois dá erro se não é informado nada, já que tá com a API vinculado)
    if (!inputEstado.value.trim()) {
        alert("Informe um ESTADO!");
        return;
    }
    if (!inputCidade.value.trim()) {
        alert("Informe uma CIDADE!");
        return;
    }
    if (!inputBairro.value.trim()) {
        alert("Informe um BAIRRO!");
        return;
    }
    if (!inputRua.value.trim()) {
        alert("Informe uma RUA!");
        return;
    }
    if (!inputNumero.value.trim()) {
        alert("Informe o NÚMERO!");
        return;
    }

    //verificar se aquele CEP já está cadastrado
    for(endereco of listaEnderecos){
        if(endereco.cep === inputCep.value.trim() && endereco.numero === inputNumero.value.trim()){
            alert("Esse endereço já está cadastrado!");
            return;
        }
    }

    //objeto de meu CEP
    const novoCEP = {
        cep: inputCep.value.trim(),
        estado: inputEstado.value.trim(),
        bairro: inputBairro.value.trim(),
        rua: inputRua.value.trim(),
        numero: inputNumero.value.trim()

    }

    //adicionando o CEP na minha lista
    listaEnderecos.push(novoCEP);
    salvarCep();
}

function salvarCep(){
    localStorage.setItem('listaCep', JSON.stringify(listaEnderecos));
}

function carregarCeps(){
    const armazenamento = localStorage.getItem('listaCep');

    //precisa ser JSON.parse, se não n pega
    listaEnderecos = armazenamento ? JSON.parse(armazenamento) : [];

    for(endereco of listaEnderecos){
        carregarCepsNaTela(endereco.cep, endereco.estado, endereco.bairro, endereco.rua, endereco.numero);
    }
}

function carregarCepsNaTela(cep, estado, bairro, rua, numero){

    //criando a nova linha
    const novaLinha = document.createElement('tr');
    
    //criando colunas
    const colunaCep = document.createElement('td');

    //puxando a tabela
    const tabelaEndereco = document.getElementById('tabela_endereco');

}

function configurarEventos() {
    carregarCeps();

    const botaoSalvar = document.getElementById('botao_salvar');
    const inputCep = document.getElementById('input_cep');

    inputCep.addEventListener('focusout', buscarCep);
    botaoSalvar.addEventListener('click', adicionarEndereco);
}

window.addEventListener('load', configurarEventos);