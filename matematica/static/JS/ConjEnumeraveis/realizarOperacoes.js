/**
 * Realizar as operações de/entre conjuntos.
 * Chama as funções apropriadas.
 * @alias Tela Operações
 */
function telaOperações() {
    var opcoes = { 
        buttons: {
            "∪": uniaoClick,
            "∩": intersecaoClick,
            "-": difClick,
            "Δ": difSimetricaClick,
            "×": produtoCartesianoClick,
            "=": igualdadeClick
        }
    };
    $("#operacoes").dialog({
        modal: true,
        title: "Escolha uma relação ou operação:",
        dialogClass: "alert",
        resizable: true,
        width: 420
    },opcoes);
        
    tooltipsDialog();
}

/**
 * ToolTips para os botões de operações
 */
function tooltipsDialog(){    
    $('button').eq(1).attr('title', 'União');
    $('button').eq(2).attr('title', 'Intersecção');
    $('button').eq(3).attr('title', 'Diferença');
    $('button').eq(4).attr('title', 'Diferença Simétrica');
    $('button').eq(5).attr('title', 'Produto Cartesiano');
    $('button').eq(6).attr('title', 'Igualdade');
    $('button').eq(7).attr('title', 'PERTENCE');
}

/**
 *Funcoes auxiliares: Operações
 */
function uniaoClick() {
    var conjunto = opUniao(conjuntos[chave1], conjuntos[chave2]);
    var chave = criaConjJS(chave1+"∪"+chave2, conjunto);   
    
    criaConjHtml(chave, chave);
    $(this).dialog("close");
}

function intersecaoClick() {
    var conjunto = opIntersecao(conjuntos[chave1], conjuntos[chave2]);
    var chave = criaConjJS(chave1+"∩"+chave2, conjunto);
    
    criaConjHtml(chave, chave);
    $(this).dialog("close");
}

function difClick() {
    var conjunto = opDif(conjuntos[chave1], conjuntos[chave2]);
    var chave =  criaConjJS(chave1+"-"+chave2, conjunto);
    
    criaConjHtml(chave, chave);
    $(this).dialog("close");
}

function difSimetricaClick() {
    var conjunto = opDifSimetrica(conjuntos[chave1], conjuntos[chave2]);
    var chave =  criaConjJS(chave1+"Δ"+chave2, conjunto);    
    
    criaConjHtml(chave, chave);
    $(this).dialog("close");
}

function produtoCartesianoClick() {
    var conjunto = opProdutoCartesiano(conjuntos[chave1], conjuntos[chave2]);
    var chave =  criaConjJS(chave1+"×"+chave2, conjunto);    
    
    criaConjHtml(chave, chave);
    $(this).dialog("close");
}

function conjuntoPotenciaClick() { 
    var conjunto = opConjuntoPotencia(conjuntos[chave1]);
    var chave =  criaConjJS("P\u2329"+chave1+"\u232A", conjunto);//\u2329 é o Unicode Code Point
    
    criaConjHtml(chave, chave);
}

function cardinalidadeClick() {
    delHtmlVisualizacao("igualdade","eventoEmCadeia",chave1);
    delHtmlVisualizacao("cardinalidade","eventoEmCadeia",chave1);      
    var cardinalidade = opCardinalidade(conjuntos[chave1]);    
    var posX = $("#"+chave1).offset().left;
    var posY = $("#"+chave1).offset().top;
    
    criaHtmlVisualizacao("cardinalidade",chave1,cardinalidade);
    $("#"+chave1+"cardinalidade").css({"left":posX,
                             "top":posY});  
    
    delHtmlVisualizacao("cardinalidade","click",chave1); //ativar função de deletar cardinalidade
}

function igualdadeClick() {
    delHtmlVisualizacao("igualdade","eventoEmCadeia",chave1);    
    var igual = opIgualdade(conjuntos[chave1], conjuntos[chave2]);    
    var posX = $("#"+chave1).offset().left;
    var posY = $("#"+chave1).offset().top;
    var text = igual?"É igual à ":"É diferente de ";
    
    criaHtmlVisualizacao("igualdade", chave1, text+chave2);
    
    $("#"+chave1+"igualdade").css({"left":posX,
                                   "top":posY});    
    delHtmlVisualizacao("igualdade","click",chave1);
    $(this).dialog("close");
}