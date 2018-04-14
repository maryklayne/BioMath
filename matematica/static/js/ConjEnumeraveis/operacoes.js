/**
 * Implementação das operações.
 * Não se preocupar com elementos repetidos, dado que, eles são retirados quando o conjunto é criado.
 */


/**
 * Operação de União
 * @param {array} conj1
 * @param {array} conj2
 * @return {array} com a operação
 * */
function opUniao(conj1, conj2) {
    var uniao = conj1.concat(conj2);    
    return uniao;
}

/**
 * Operação de Interseção
 * @param {array} conj1 
 * @param {array} conj2 
 * @return {array} com a operação
 * */
function opIntersecao(conj1, conj2) {
    var inter = [];
    for (var i = 0; i < conj1.length; i++) {
        if (contido(conj1[i], conj2)) {
            inter.push(conj1[i]);
        }
    }
    return inter;
}

/**
 * Operação de Diferença entre conjuntos
 * @param {array} conj1 
 * @param {array} conj2 
 * @return {array} com a operação
 * */
function opDif(conj1, conj2) {
    var dif = [];
    for (var i = 0; i < conj1.length; i++) {
        if (!contido(conj1[i], conj2)) {
            dif.push(conj1[i]);
        }
    }
    return dif;
}

/**
 * Operação de Diferença Simetrica entre conjuntos
 * @param {array} conj1 
 * @param {array} conj2 
 * @return {array} com a operação
 * */
function opDifSimetrica(conj1, conj2) {
    var difSim = opUniao(opDif(conj1, conj2), opDif(conj2, conj1));
    return difSim;
}

/**
 * Operação de Produto Cartesiano entre conjuntos
 * @param {array} conj1 
 * @param {array} conj2 
 * @return {array} com a operação
 * */
function opProdutoCartesiano(conj1, conj2) {
    var prodCar = [];
    for (var i = 0; i < conj1.length; i++) {
        for (var j = 0; j < conj2.length; j++) {
            prodCar.push('('+conj1[i]+','+conj2[j]+')');
            
        }
    }
    return prodCar;
}

/**
 * Checa se dois conjuntos são iguais
 * @param {array} conj1 
 * @param {array} conj2 
 * @return {bool} com o resultado
 * */
function opIgualdade(conj1, conj2){
    if (conj1.length !== conj2.length){
        return false;
    } else {
        for (var i = 0; i < conj1.length; i++) {
            if (!contido(conj1[i], conj2)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Calcula a cardinalidade
 * @param {array} conj1
 * @return {int} tamanho
 * */
function opCardinalidade(conj1){
    return conj1.length;
}

/**
 * Função auxiliar: Ver se o elemento já pertence ao conjunto
 * Ex: 1 pertence a {2,1}
 * @param {string} elemento
 * @param {array} conjunto
 * @returns {bool} pertence ou não pertence
 */
function contido(elemento,conjunto){            
    for(var i = 0; i < conjunto.length; i++){
        if (elemento === conjunto[i]) {
            return true;
        }              
    }
    return false;
}

/**
 * Gera o conjunto potência
 * @param {array} conj
 * @return {array} resultado
 * */
function opConjuntoPotencia(conj){
    var potencia = [];
    var tamanho;
    var size = conj.length;
    
    if(size === 0)
        return concatConjPotencia([""]);
    //else if (size >= 14) //Muito grande
        //return [];    
    
    for (var i = 0, tamanho = Math.pow(2, size); i < tamanho; i++) {
      var conjunto = [];
      var j = size - 1;

      do {
        if ((i & (1 << j)) !== 0) {
          conjunto.push(conj[j]);
        }
      } while (j--);

      potencia.push(conjunto);
    }
    
    return concatConjPotencia(potencia);
}

/**
 * Função auxiliar: Serve apenas para concatenar o conjunto potência.
 * @param {array} conjP Conjunto Potência
 * @return {array} Conjunto Potência concatenado
 * @example
 *    entrada: ,1,2,2,1,3,3,1,3,2,3,2,1
 *    saída: {},{1},{2},{2,1},{3},{3,1},{3,2},{3,2,1}
 * */
function concatConjPotencia(conjP){
    var array = [];
    for (var i = 0; i < conjP.length; i++) {
        array.push("{"+conjP[i]+"}");
    }
    return array;
}