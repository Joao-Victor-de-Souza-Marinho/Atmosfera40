document.addEventListener("DOMContentLoaded", () => {

    const menu = document.getElementById("menuLateral");
    const botao = document.getElementById("btnToggle");

    if (!menu || !botao) return;

    botao.addEventListener("click", () => {

        const recolhido = menu.classList.toggle("recolhido");

        botao.title = recolhido
            ? "Expandir menu"
            : "Recolher menu";

    });

});