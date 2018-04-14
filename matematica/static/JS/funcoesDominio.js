var mensagem = ''

function mostrar(num){
    $('#campo'+num).removeClass('esconder');
    $('#label'+num).removeClass('esconder');
    $('#ajuda'+num).removeClass('esconder');
    $('#myModal'+num).removeClass('esconder');
    $('#desistir'+num).removeClass('esconder');
    $('#botao'+num).removeClass('esconder');
}

function esconde(num, controle){
    var controle = controle;
    var lista = ['myModal', 'desistir', 'botao', 'ajuda', 'campo','label', 'div'];

    if ((controle == false) && (num > 1)) {
        for (var i = 2; i < 10 ; i++){
            for (var j = 0 ; j < 6 ; j++){
                $('#'+lista[j]+i).addClass('esconder').attr('disabled',false).val('');
            }
            $('#div'+i).removeClass('has-error').removeClass('has-success');
        }
    }else{
        mostrar(parseInt(num)+1);
        $('#div'+num).removeClass('has-error').addClass('has-success');
        $('#campo'+num).prop('disabled',true);
        for (var i = 0 ; i < 4 ; i++){
            $('#'+lista[i]+num).addClass('esconder');
        }
    }
}

function funcaoCalcResposta(id){
    if (id==2){
        return $.parseJSON(mensagem).Delta;
    }else if (id==3){
        return $.parseJSON(mensagem).primeiroX;
    }else if (id==4){
        return $.parseJSON(mensagem).segundoX;
    }
}

$(document).ready(function(){
    var modifica = '';
    var resposta = '';
    var id = '';
    var campo = '';

    $('#botaoEnviarFuncao').click(function(){
		reset();
    	var url = $(this).data('url')
    	var token = $(this).data('token')
    	enviarDado('#campo1',url, token);
    });

    $('.btn-func').click(function(){
        id = $(this).attr('id');
        id = id.slice(5,6);
        campo = $('#campo'+id).val();
    	resposta = funcaoCalcResposta(id);

        if ($(this).attr('id') != 'botaoEnviarFuncao'){
            if (campo==resposta){
                $("#div"+id).removeClass('has-error').addClass('has-sucess');
                $("#alertErro").attr('style', "visibility: none; display:none;");
                esconde(id, true);
            }else{
                $("#div"+id).removeClass('has-sucess').addClass('has-error');
                $("#alertErro").attr('style', "visibility: none; display:block;");
            }
    	}
    });
        $('.btn-des').click(function(){
            id = $(this).attr('id');
            id = id.slice(8,9);
            campo = '#campo'+id;
            resposta = funcaoCalcResposta(id);
            $(campo).val(resposta);
            esconde(id, true);
    });
});

function reset(){
    esconde(2, false);
}

function enviarDado(id_txt, url, token){
    var botao = $(this)
    var texto = $(id_txt).val();
    var $request=$.ajax({
        method: "POST",
        url: url,
        data: {csrfmiddlewaretoken:token,funcao:texto},
        mimeType:"JSON"
    });
    $request.success(function (msg){
        mostrar(2);
        mensagem = msg;
    });
    $request.fail(function( jqXHR, textStatus ) {
        reset();
        alert('erro');
    });
}