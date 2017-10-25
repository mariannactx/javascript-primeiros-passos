var saudacao = "Olar!";

window.addEventListener("load", function () {

    abas = document.getElementsByClassName("aba");

    //troca de abas
    var btnAbas = document.getElementsByClassName("btn-aba");
    for (a = 0; a < btnAbas.length; a++) {
        btnAbas[a].addEventListener("click", trocaAba);
    }

    chat = document.getElementById("chat");

    //prepara adicao de saudacao
    document.getElementById("input-add-saudacao").addEventListener("keydown", addSaudacao);

    //prepara busca por idioma
    document.getElementById("btn-busca-idioma").addEventListener("click", buscaIdioma);
});

//troca de abas com o clique
function trocaAba(e) {
    console.log(e);

    var abaSelecionada = e.target.getAttribute("name");

    for (a = 0; a < abas.length; a++) {
        abas[a].style.zIndex = 0;
    }

    document.getElementById(abaSelecionada).style.zIndex = 1;
}

//IDIOMAS E SAUDACOES
var idiomas = ["en", "es", "fr", "pt"];

var idiomaSaudacao = {
    "pt": "Oi",
    "en": "Hi",
    "es": "Hola",
    "fr": "Salut"
};

// SAUDACAO ALEATORIA
//mostra saudacao aleatoria
function saudacaoAleatoria() {
    var aleatorio = Math.floor((Math.random() * idiomas.length) + 0);

    moverBaloes();

    chat.innerHTML += "<p class='balao' style='bottom: 10px; '>" + idiomaSaudacao[idiomas[aleatorio]] + "</p>";

    console.log(aleatorio, idiomas[aleatorio], "alert(idiomaSaudacao[" + idiomas[aleatorio] + "])");
}

// BUSCAR SAUDACAO
//busca saudacao de acordo com o idioma digitado
function buscaIdioma() {
    var idioma = document.getElementById("input-busca-idioma").value;

    if (idioma != "") {

        if (idiomas.indexOf(idioma) >= 0) {
            
            var balao = criarBalao(idiomaSaudacao[idioma]);
        
        } else {
            
            var balao = criarBalao("Idioma \"" + idioma + "\" não encontrado :(");
        }

        moverBaloes();
        chat.appendChild(balao);
    }
}

// ADICIONAR SAUDACAO

//foca no input de digitar saudacao
function inputSaudacaoFocus(e) {
        var char = event.which || event.keyCode;
        console.log(char);
        if (char == "13") {
            document.getElementById("input-add-saudacao").focus();
        }
    }

//adiciona nova saudacao
function addSaudacao(e) {
    var char = event.which || event.keyCode;
    var addIdiomaInput = document.getElementById("input-add-sigla");
    var addSaudacaoInput = document.getElementById("input-add-saudacao");

    if (char == "13" && addIdiomaInput.value != "" && addSaudacaoInput.value != "") {
        idiomaSaudacao[addIdiomaInput.value] = addSaudacaoInput.value;
        idiomas.push(addIdiomaInput.value);
        console.log(idiomaSaudacao);

        var balao = criarBalao("Saudacao adicionada: " + addSaudacaoInput.value + " (" + addIdiomaInput.value + ")");
                                 
        moverBaloes();

        chat.appendChild(balao);

        addIdiomaInput.value = "";
        addSaudacaoInput.value = "";
    }
}

//cria balao de fala com a resposta
function criarBalao(conteudo){
    var novoBalao = document.createElement("p");
        novoBalao.setAttribute("class", "balao");
        novoBalao.style.bottom = "10px";
        novoBalao.innerHTML = conteudo;
    
    return novoBalao;
}

//move baloes para cima 
function moverBaloes() {
    var baloes = document.getElementsByClassName("balao");

    for (b = 0; b < baloes.length; b++) {
        var novoBottom = parseFloat(baloes[b].style.bottom) + 55;
        baloes[b].style.bottom = novoBottom + "px";
        if(novoBottom >= 340){ removerBalao(baloes[b]); }
    }
}

function removerBalao(balao){
    setTimeout(function(){ chat.removeChild(balao); }, 1000);
}
