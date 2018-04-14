/**
 * Inicializar o que é necessário após o carregamento da página.
 */


$(function() {
    eventosTeclado();  
    addConjunto();
    moverLixeira();
    desabilitarBtDireito();    
});

/**
 * Inicializa funcionalidades importantes.
 * */
function init(){
    criaConjComOperacao(); //cada conjunto pode receber outro;
    delConj(); //Lixeira conseguir deletar conjuntos
    arrastarConjunto(); //pode mover o conjunto;
    arrastarClone(); //realiza a movimentação do clone;
    dbClick(); //Mostrar o conjunto
}

/**
 * Impedir que o menu de contexto padrão, do navegador, apareça ao clicar com o botão direito do mouse.
 * */
function desabilitarBtDireito(){
    menuContexto();$(document).bind("contextmenu",function(e){
        return false;
    });   
}
