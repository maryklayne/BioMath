/**
 * Evento utilizado, como condição necessária, para mover o conjunto, segurando a tecla ctrl.
 * */
function eventosTeclado(){
    $(document).unbind( "keydown" );
    $(document).keydown(function (e){
        if(e.which === 17){ //apertou o Ctrl:Arrasta o original
            arrastarConjunto();
        }
    });
    
    $(document).unbind( "keyup" );
    $(document).keyup(function (e){
        if(e.which === 17){ //soltou o Ctrl:Arrasta o clone (default)
            arrastarClone();
        }
    });
}

/**
 * Mover Conjuntos usando a tecla ctrl.
 * Juntamente com a função eventosTeclado().
 * */
function arrastarConjunto(){
    $(".draggable").unbind( "draggable" );    
    var conjunto = $( ".draggable" ).draggable({
        helper: "original",
        containment: ".box-10",
        cursor: "move",
        opacity: "0.5",
        start: function( event, ui ) {
            delHtmlVisualizacao("cardinalidade","eventoEmCadeia",$(this).attr("id"));
            delHtmlVisualizacao("igualdade","eventoEmCadeia",$(this).attr("id"));
        }
    });    
}

/**
 * Mover clone, para realizar as operações.
 * Quando tecla ctrl está up.
 * */
function arrastarClone(){
    $(".draggable").unbind( "draggable" ); 
    $(".draggable" )
        .draggable({
            helper: "clone"
    });
}

/**
 * Movimentação da lixeira.
 * */
function moverLixeira(){
    $(".lixeira").unbind( "draggable" ); 
    $(".lixeira" ).draggable({
        containment: ".box-10",
        cursor: "move"
    });
}

/**
 * Mostrar conjunto com Click.
 * */
function dbClick(){
    $(".conjunto").attr("data-toggle", "popover");
    
    $('[data-toggle="popover"]').popover({
        placement : 'top',
        content: function (){
            var indice = $(this).attr('id');
            var elementos = conjuntos[indice];
            return "{"+elementos+"}";
        },
        title: "Elementos",
        trigger: "click"
    });
}

/**
 * Deletar popover do conjunto.
 */
function delHtmlPopover(){
    $(".popover").remove();
}

/**
 * Deletar a div de visualização que foi criada.
 * @param {string} operacao O que quer remover
 * @param {string} e Se deseja remover com click ou automaticamente
 * @param {string} id Da onde remover
 * @returns {undefined}
 */
function delHtmlVisualizacao(operacao,e,id){    
    if (e === "click"){ //com um click.
        $("."+operacao).unbind( "click" );
        $("."+operacao).click(function() {
            $(this).remove();
        }); 
    /*Para evitar que a cardinalidade continue na tela,
     *caso o conjunto seja excluído*/
    } else if (e === "eventoEmCadeia") {
        $("#"+id+operacao).remove();
    }    
}