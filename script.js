let mensagens = [];
console.log(axios.get("https://mock-api.driven.com.br/api/v6/uol/messages"));
let usuarioInicial;
entrarNaSala();
function entrarNaSala(){
    usuarioInicial = prompt('Qual o seu nome?');
    const obj = {name:usuarioInicial};
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', obj);
    promise.then(userArrived);
    promise.catch(userNotArrived);
    manterlogado(obj);
}
function manterlogado(usuario){
    setTimeout((manterconexao),5000,usuario);
}
function manterconexao(usuario){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
    promise.then(conexaoEstavel);
    promise.catch(conexaoInstavel);
    manterlogado(usuario);
    
}
function enviarMensagem(){
    let mensagem = document.querySelector('input');
    let objMensagem = {
        from: usuarioInicial,
        to: "Todos",
        text: mensagem.value,
        type: "message"
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",objMensagem);
    promise.then(mensagemEnviada);
    promise.catch(mensagemFalha);
    mensagem.value = '';
    pegarMensagens();
}
function mensagemEnviada(resposta){
    console.log('mensagem enviada com sucesso');
    console.log(resposta);
}
function mensagemFalha(resposta){
    console.log('mensagem falhou');
    console.log(resposta);
}
function conexaoEstavel(resposta){
    console.log('conexao estavel');
    console.log(resposta);
}
function conexaoInstavel(resposta){
    console.log('conexao instavel');
    console.log(resposta);
}
function userArrived(resposta){
    console.log("usuario logado");
    console.log(resposta);
}
function userNotArrived(resposta){
    console.log('usuario nao logado');
    console.log(resposta);
}

function exibirMensagens(){
    const listaMensagens = document.querySelector('.mensagens');
    listaMensagens.innerHTML = '';
    for(let cont=0; cont<mensagens.length; cont++){
    if(mensagens[cont].type === 'message'){
        let template =`
        <li class="tipoMensagem">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbsppara&nbsp<span style="font-weight:700">${mensagens[cont].to}</span>: ${mensagens[cont].text}
        </li>`;
        listaMensagens.innerHTML = listaMensagens.innerHTML + template;
        }
    else if(mensagens[cont].type === 'private_message'){
        let template =`
        <li class="tipoMensagemPrivada">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbspreservadamente&nbsppara&nbsp<span style="font-weight:700">${mensagens[cont].to}</span>: ${mensagens[cont].text}
        </li>`;
        listaMensagens.innerHTML = listaMensagens.innerHTML + template;
    }
    else if(mensagens[cont].type === 'status'){
        let template =`
        <li class="tipoStatus">
            <span style="color:#AAAAAA">(${mensagens[cont].time})</span>&nbsp<span style="font-weight:700">${mensagens[cont].from}</span>&nbsp${mensagens[cont].text}
        </li>`;
        listaMensagens.innerHTML = listaMensagens.innerHTML + template;
    }
    }
}
pegarMensagens();
function pegarMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(messagesArrived);
    promise.catch(messagesNotArrived);
    setTimeout((pegarMensagens),3000);  
}
function messagesArrived(resposta){
    console.log('deu bom');
    console.log(resposta);
    mensagens = resposta.data;
    exibirMensagens();
}
function messagesNotArrived(resposta){
    console.log('deu ruim');
    console.log(resposta);
}