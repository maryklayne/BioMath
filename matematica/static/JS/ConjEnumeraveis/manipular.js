/** 
 * Manipulação de conjuntos (criar, deletar, etc).
 */


/**
 * Funcao auxiliar: adiciona o conjunto no dicionário CONJUNTOS
 * @param {string} chave Nome do conjunto
 * @param {array} elementos Elementos do conjunto
 * @return {string} Nome do conjunto
 * */
function criaConjJS(chave,elementos){
    try {
       elementos = ordenarConjRecursivamente("{"+elementos.join()+"}", 0, false);
    } catch(e) {
       invalidInput();
    }
    
    conjuntos[chave] = quebrarString(elementos);
    return chave;
}

/**
 * Funcao auxiliar: remover repetidos do conjunto.
 *@param {array} conjunto
 *@return {array} conjunto sem repetição
 *@example 
 *  entrada: {1,2,3,1}
 *  saida: {1,2,3}
 **/
function removerRepetidos(conjunto){
    var conjSemRepeticao = [];
    
    for (var i = 0; i < conjunto.length; i++) {
        if (!contido(conjunto[i],conjSemRepeticao)) {
            conjSemRepeticao.push(conjunto[i]); 
        }      
    }    
    return conjSemRepeticao;
}
/**
 * Cria uma div em cima do conjunto em ação.
 * Serve para mostrar a cardinalidade e igualdade.
 * @param {string} operacao
 * @param {string} id
 * @param {string|número} text
 * @returns {none}
 */
function criaHtmlVisualizacao(operacao,id, text){
    var html = $("<div />",{
        id: id+operacao,
        class: operacao +" divDeVisualizacao",
        text: text
    });
    $(".box-10").append(html);
}

/**
 * Funcao auxiliar: mostra o conjunto criado no HTML.
 * @param {string} chave
 * @param {string} nome
 */
function criaConjHtml(chave, nome){ /*DEIXAR BONITO------------------------------------------------------------------*/
    var htmlConj = $("<div />",{
        id: chave,
        class: "conjunto draggable droppable"
    });
    
    var htmlText = $("<div />",{
        id: "textConj",
        text: nome
    });
    
    $(".box-10").append(htmlConj);
    $('#'+chave).append(htmlText);   
    
    cssConj(chave);
    responConj(chave);      
    init();
}
/*
 * Css dinâminco para o conjunto
 * Para garantir o tamanho e cores randomicas
 */
function cssConj(chave){
    $('#'+chave).css({"height":$('#'+chave).width()+30,
                        "width":$('#'+chave).width()+30,
                        "background-color":"rgb("+Math.floor((Math.random() * 200) + 50)+","+
                                Math.floor((Math.random() * 200) + 50)+","+
                                Math.floor((Math.random() * 200) + 50)+")"});//circulo 50-200;
}

/**
 * Funcao auxiliar: Se a tela não for menor que 500px transladar para direita.
 * obs.: Serve para o conjunto não ficar abaixo da barra lateral
 * @param {string} chave ID do conjunto
 */
function responConj(chave){
    var mq = window.matchMedia('(min-width: 500px)');
    if(mq.matches) {
        $('#'+chave).css({"left":"600px"});
    }    
}

/**
 * Deleta conjunto pela lixeira.
 * */
function delConj(){
    $( ".lixeira" ).droppable({
        accept: ".conjunto",
        tolerance: "touch",
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var chave = ui.draggable.attr("id");
            delete conjuntos[chave];
            $("#"+chave).remove();
            delHtmlVisualizacao("cardinalidade","eventoEmCadeia",chave);
            delHtmlVisualizacao("igualdade","eventoEmCadeia",chave);
            delHtmlPopover();            
        }
    });
}

/**
 * Chama a tela de operações/relações entre conjuntos.
 * */
function criaConjComOperacao(){
    $( ".droppable" ).droppable({
        accept: ".conjunto",
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            chave1 = ui.draggable.attr("id"); //Resolver isso da váriavel global depois 
            chave2 = $(this).attr("id"); //Resolver isso da váriavel global depois

            telaOperações(); //Escolhe a operação e cria o conjunto;
        }
    });
}