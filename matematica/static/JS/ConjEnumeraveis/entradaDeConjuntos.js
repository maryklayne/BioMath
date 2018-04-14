/** 
 *Entrada de conjuntos e tratamento dela.
 *@example
 *  Recebe uma string do tipo {{1,2},{2}} e transforma em um array [{1,2},{2}].
 */

/**
 * Uma função que recebe um conjunto {string} e retorna esse conjunto {array} 
 * sem repetições (caso haja) e ordenado recursivamente (para simplificar algumas operações).
 * @param {string} elementos
 * @returns {string}
 * 
 * @example
 *   recebeu a string {{{1,3,2},{1,4,3},{1,2,3}},{{1,3,2},{1,2,3},{1,4,3}},{{1,2,5},{1,2,3},{1,2,9}}} (conjunto com 3 "elementos"). 
 *   deve retornar uma string {{{1,2,3},{1,2,5},{1,2,9}},{{1,2,3},{1,3,4}}} (uma string com 2 elementos e ordenado).
 */
function ordenarConjRecursivamente(elementos){
    if (/^(\w+|\(.*\))$/ig.test(elementos)) { //caso base
        return elementos;
    } else if (/^{.*}$/ig.test(elementos)) {
        var tupla = quebrarString(elementos);
        for (var i = 0; i < tupla.length; i++) {
            tupla[i] = ordenarConjRecursivamente(tupla[i]);                                  
        }
        tupla.sort();        
        tupla = removerRepetidos(tupla);
        
        return "{"+ tupla.join() +"}";
    } else {
        invalidInput();
    }
}

/**
 * Funcao auxiliar: Converte a entrada (string) em um Array.
 * @param {string} elementos Uma entrada do tipo {x,x,x,x}, onde x tambem pode ser um conjunto.
 * @return {array} entrada transformada em um array.
 *  */
function quebrarString(elementos) {
    var pilha = [];
    var array = [];
    var elemento = '';  
    var pop; //Elemento retornado da pilha

    elementos = elementos.substring(1,elementos.length-1);   
 
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i] === ',' && pilha.length === 0) {
            array.push(elemento);
            elemento = '';            
        } else {
            elemento += elementos[i];
            
            if (elementos[i] === '{') {
                pilha.push('{');
            } else if (elementos[i] === '}') {
                pop = pilha.pop();
                if (pop !== '{'){// reseta, caso não seja o correto, evita {)
                    pilha.push(pop);
                }
            }else if (elementos[i] === '(') {
                pilha.push('(');
            } else if (elementos[i] === ')') {
                pop = pilha.pop();
                if (pop !== '('){// reseta, caso não seja o correto, evita (}
                    pilha.push(pop);
                }
            }
        }        
    }
    
    if (elemento !== ''){ //Evitar adicionar o vazio no array, causando erros no length
        array.push(elemento); //Para add o ultimo
    }

    return array;
}

/**
 * Função auxiliar: Ver se chave já está contida no dicionário.
 * @param {string} chave Nome do conjunto
 * @param {array associativo} dicionario Referencia do array
 * @return {bool} 
 */
function keyRepetida(chave, dicionario){
    for (var key in dicionario){
        if (key === chave){
            return true;
        }
    }
    return false;
}

/**
 * Função auxiliar: Colorir o input error.
 * @param {string} remover ID que tem que remover o colorido do alerta 
 * @param {string} adicionar ID que tem que adicionar o colorido do alerta
 */
function colorirInput(remover, adicionar){
    $(".erroInput").remove();
    $(remover).removeClass("alert-danger");
    $(adicionar).addClass("alert-danger");
}



/**
 * Adiciona o conjunto pelo input.
 * */
function addConjunto(){ 
    $("#buildSet").click(function (){        
        adicionarConjunto();
    });
    $("#elemSet,#nameSet").keydown(function (e){
        if (e.keyCode === 13) {
            adicionarConjunto();
        }
    });
}

function adicionarConjunto(){
    var chave = $("#nameSet").val().toUpperCase(); 
        var elementos = $("#elemSet").val();        
         
        if (!/^\w+$/ig.test(chave)){
            colorirInput("#elemSet", "#nameSet");
            erroInput("O nome deve conter apenas letras e números.");
        } else if (keyRepetida(chave, conjuntos)) {
            colorirInput("#elemSet", "#nameSet");
            erroInput("Já existe um conjunto com o nome " +chave+ ".");
        } else if (!/^{.*}$/ig.test(elementos)) {
            colorirInput("#nameSet", "#elemSet");
            erroInput("Os elementos devem ser da forma {x,x,x...,x}, onde x é um conjunto, número ou letra.");
        } else {
            $("#nameSet, #elemSet").removeClass("alert-danger"); 
            $(".erroInput").remove();

            try {
                criaConjJS(chave,quebrarString(elementos));
                criaConjHtml(chave, chave); //id e nome iguais 
            } catch (e) {
                colorirInput("#nameSet", "#elemSet");
                erroInput("Os elementos devem ser da forma {x,x,x...,x}, onde x é um conjunto, número ou letra.");
            }
       }
}