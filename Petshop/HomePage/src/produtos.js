document.addEventListener("DOMContentLoaded", function() {
const botoesComprar = document.querySelectorAll(".produto button");
const body = document.querySelector("body");

    botoesComprar.forEach(botao => {
    botao.addEventListener("click", function() {
    mostrarMensagem("Seu produto foi adicionado no carrinho! 🛒");
});
});

    function mostrarMensagem(texto) {
    let mensagem = document.createElement("div");
    mensagem.textContent = texto;

    mensagem.style.position = "fixed"; 
    mensagem.style.left = "50%"; 
    mensagem.style.transform = "translateX(-50%)"; 
    mensagem.style.backgroundColor = "white";
    mensagem.style.color = "#011638";
    mensagem.style.padding = "20px";
    mensagem.style.borderRadius = "30px";
    mensagem.style.fontSize = "15px";
    mensagem.style.fontWeight = "arial";
    mensagem.style.zIndex = "3000";
    mensagem.style.boxShadow = "0px -2px 10px rgba(0, 0, 0, 0.1)"; 
        
    const mensagensExistentes = document.querySelectorAll(".recado");
    const distanciaEntreMensagens = 10; 

        
    if (mensagensExistentes.length > 0) {
    const ultimaMensagem = mensagensExistentes[mensagensExistentes.length - 1];
    const ultimaMensagemBottom = parseInt(getComputedStyle(ultimaMensagem).bottom);
    mensagem.style.bottom = `${ultimaMensagemBottom + ultimaMensagem.offsetHeight + distanciaEntreMensagens}px`;
    } else {
    mensagem.style.bottom = "0px"; 
    }
 
    mensagem.classList.add("recado");

    body.appendChild(mensagem);

        
    setTimeout(() => {
    mensagem.remove();
    }, 3000);
    }
});