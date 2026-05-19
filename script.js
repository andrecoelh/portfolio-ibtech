const body = document.body;
const descricao = document.querySelector(".descricao");
const cards = document.querySelectorAll(".card");


const textoOriginal =
"Estudante de Ciência de Dados e IA no IBMEC-BH, interessado na interseção entre dados, tecnologia e finanças.";

descricao.textContent = "";

let index = 0;

function typeWriter() {

    if(index < textoOriginal.length){

        descricao.textContent += textoOriginal.charAt(index);

        index++;

        setTimeout(typeWriter, 35);
    }
}

typeWriter();


const botaoTema = document.createElement("button");

botaoTema.classList.add("botao-tema");

body.appendChild(botaoTema);


const temaSalvo = localStorage.getItem("tema");

const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(temaSalvo === "claro"){

    body.classList.add("tema-claro");

}else if(temaSalvo === "escuro"){

    body.classList.remove("tema-claro");

}else{

    if(!prefereEscuro){

        body.classList.add("tema-claro");
    }
}


function atualizarBotao(){

    if(body.classList.contains("tema-claro")){

        botaoTema.textContent = "🌙";

    }else{

        botaoTema.textContent = "☀️";
    }
}

atualizarBotao();


botaoTema.addEventListener("click", () => {

    body.classList.toggle("tema-claro");

    if(body.classList.contains("tema-claro")){

        localStorage.setItem("tema", "claro");

    }else{

        localStorage.setItem("tema", "escuro");
    }

    atualizarBotao();
});



const emailElemento = document.querySelector(".email");

const botaoCopiar = document.createElement("button");

botaoCopiar.textContent = "Copiar e-mail";

botaoCopiar.classList.add("botao");

emailElemento.insertAdjacentElement("afterend", botaoCopiar);


botaoCopiar.addEventListener("click", async () => {

    try{

        await navigator.clipboard.writeText("moldre@outlook.com");

        botaoCopiar.textContent = "Copiado!";

        setTimeout(() => {

            botaoCopiar.textContent = "Copiar e-mail";

        }, 2000);

    }catch(error){

        botaoCopiar.textContent = "Erro ao copiar";
    }
});



const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("mostrar");
        }
    });

}, {
    threshold: 0.15
});


cards.forEach((card) => {

    observer.observe(card);
});

// =========================
// TERMINAL MODE
// =========================

const overlay = document.querySelector(".terminal-overlay");

const terminalInput = document.querySelector(".terminal-input");

const terminalOutput = document.querySelector(".terminal-output");


// abrir terminal
document.addEventListener("keydown", (event) => {

    if(event.ctrlKey && event.key.toLowerCase() === "k"){

        event.preventDefault();

        overlay.classList.add("ativo");

        terminalInput.focus();
    }

    // fechar
    if(event.key === "Escape"){

        overlay.classList.remove("ativo");
    }
});


// comandos
terminalInput.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){

        const comando = terminalInput.value.toLowerCase().trim();

        let resposta = "";

        switch(comando){

    case "help":

        resposta =
        `
        Available commands:<br><br>

        whoami<br>
        skills<br>
        projects<br>
        vision<br>
        music<br>
        contact<br>
        clear
        `;

        break;


    case "whoami":

        resposta =
        `
        André Coelho — Data Science & AI student
        focused on finance, systems and technology.
        `;

        break;


    case "skills":

        resposta =
        `
        Python, Data Analysis, Automation,
        Risk Management, Artificial Intelligence.
        `;

        break;


    case "projects":

        resposta =
        `
        Currently building my portfolio and
        exploring financial risk systems.
        `;

        break;


    case "vision":

        resposta =
        `
        Turning data into systems that solve
        real-world problems.
        `;

        break;


    case "music":

        resposta =
        `
        Radiohead, ambient soundscapes and
        late night coding sessions.
        `;

        break;


    case "contact":

        resposta =
        `
        moldre@outlook.com
        `;

        break;


    case "clear":

        terminalOutput.innerHTML = "";

        terminalInput.value = "";

        return;


    default:

        resposta =
        `
        Command not recognized.
        Type "help" to see available commands.
        `;
}

terminalOutput.innerHTML += `
            <p class="comando">> ${comando}</p>
            <p>${resposta}</p>
            <br>
        `;

        terminalInput.value = "";
    }
});