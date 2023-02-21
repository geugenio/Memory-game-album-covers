const grid =document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const mensagemParabens = document.querySelector(".mensagem-parabens");

const cartas = [
    "bastard",
    "bastard2",
    "cherrybomb",
    "flower-boy",
    "goblin1",
    "goblin2",
    "igor1",
    "igor2",
    "wolf1",
    "wolf2"

];
const criarElemento = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let cartaPrimaria = "";
let cartaSecundaria = "";


const checarFim = () =>{
    const disabldeCards = document.querySelectorAll(".disabled-card")

    if(disabldeCards.length === 20) {
        clearInterval(this.loop);
        grid.classList.add("hide");
        mensagemParabens.classList.remove("hide");

    }
}
const checarCartas = () =>{
    const pCover = cartaPrimaria.getAttribute("data-cover");
    const sCover = cartaSecundaria.getAttribute("data-cover");

    if (pCover === sCover) {

        cartaPrimaria.firstChild.classList.add("disabled-card");
        cartaSecundaria.firstChild.classList.add("disabled-card");

        cartaPrimaria ="";
        cartaSecundaria=""; 

        checarFim();

    } else{
        setTimeout(()=>{

            cartaPrimaria.classList.remove("revelar");
            cartaSecundaria.classList.remove("revelar");

            cartaPrimaria ="";
            cartaSecundaria=""; 

        }, 500);

    }
}
const revelar = ({target}) =>{


    if(target.parentNode.className.includes("revelar")) {
        return;
    } else {
       
    }
    //Se ta vazia é pq é a primeira carta que está sendo clicada pelo jogador
    if(cartaPrimaria === ""){ 
        target.parentNode.classList.add("revelar");
        cartaPrimaria = target.parentNode;
    } else if(cartaSecundaria === "") {
        //A segunda também está vazia
        target.parentNode.classList.add("revelar");
        cartaSecundaria = target.parentNode;
        checarCartas();
    }


} 
const criarCarta = (cover) => {
    
    const card = criarElemento("div", "card");
    const front = criarElemento("div", "face front");
    const back = criarElemento("div", "face back");


    front.style.backgroundImage = `url('images/${cover}.png')`;
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revelar);
    card.setAttribute("data-cover", cover);
    return card;
}

const loadGame = () =>{

    const duplicar = [...cartas, ...cartas];
    
    const shufledArray = duplicar.sort(() =>Math.random() - 0.5);

    shufledArray.forEach((personagem) =>{

        const card = criarCarta(personagem);
        grid.appendChild(card);
        
    })
}

const iniciaContador = () =>{

    this.loop = setInterval(()=>{
        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;
    }, 1000);
}
window.onload = () =>{
    //executar só quando a janela carregar!

    spanPlayer.innerHTML = localStorage.getItem("player");
    iniciaContador();
    loadGame();
}




