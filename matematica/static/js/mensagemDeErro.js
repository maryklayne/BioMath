/**
 * Validar as entradas de conjuntos.
 * Adicionando uma DIV para quando na barra lateral, informando qual o erro.
 */

function erroInput(texto){
    var html = $("<div />",{
        class: "erroInput",
        text: texto
    });
    $("#lateral").append(html);
}

