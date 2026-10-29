
const API_URL = "http://localhost:8080";
const ID_DISPOSITIVO = 1;

let intervaloSimulacao = null;
let enviandoMedicao = false;

const botaoIniciar = document.getElementById("botaoIniciar");
const botaoParar = document.getElementById("botaoParar");
const statusSimulacao = document.getElementById("statusSimulacao");
const resultadoEnvio = document.getElementById("resultadoEnvio");

function numeroAleatorio(min, max, casas = 1) {
    const valor = Math.random() * (max - min) + min;
    return Number(valor.toFixed(casas));
}

function gerarMedicao() {
    return {
        idDispositivo: ID_DISPOSITIVO,
        temperatura: numeroAleatorio(20, 32),
        umidade: numeroAleatorio(40, 75),
        pressao: numeroAleatorio(1000, 1025),
        altitude: numeroAleatorio(700, 800),
        luminosidade: numeroAleatorio(100, 900),
        velocidadeVento: numeroAleatorio(0, 15),
        direcaoVento: Math.floor(Math.random() * 360),
        intensidadeWifi: Math.floor(Math.random() * 101)
    };
}

function mostrarMedicao(medicao) {
    document.getElementById("temperatura").textContent =
        `${medicao.temperatura.toLocaleString("pt-BR")} °C`;

    document.getElementById("umidade").textContent =
        `${medicao.umidade.toLocaleString("pt-BR")} %`;

    document.getElementById("pressao").textContent =
        `${medicao.pressao.toLocaleString("pt-BR")} hPa`;

    document.getElementById("luminosidade").textContent =
        `${medicao.luminosidade.toLocaleString("pt-BR")} lux`;
}

async function enviarMedicao() {
    if (enviandoMedicao) return;

    enviandoMedicao = true;

    try {
        const medicao = gerarMedicao();

        statusSimulacao.textContent = "Enviando medição...";

        const resposta = await fetch(`${API_URL}/registros`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicao)
        });

        const texto = await resposta.text();

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}: ${texto}`);
        }

        const registro = texto ? JSON.parse(texto) : medicao;

        mostrarMedicao(registro);

        resultadoEnvio.textContent = JSON.stringify(registro, null, 2);
        statusSimulacao.textContent =
            `Simulação ativa. Último envio: ${new Date().toLocaleTimeString("pt-BR")}`;

    } catch (erro) {
        console.error("Falha ao enviar medição:", erro);
        statusSimulacao.textContent =
            `Erro ao enviar medição: ${erro.message}`;

        pararSimulacao();
    } finally {
        enviandoMedicao = false;
    }
}

function iniciarSimulacao() {
    if (intervaloSimulacao !== null) return;

    botaoIniciar.disabled = true;
    botaoParar.disabled = false;
    statusSimulacao.textContent = "Iniciando simulação...";

    enviarMedicao();

    intervaloSimulacao = setInterval(enviarMedicao, 5000);
}

function pararSimulacao() {
    if (intervaloSimulacao !== null) {
        clearInterval(intervaloSimulacao);
        intervaloSimulacao = null;
    }

    botaoIniciar.disabled = false;
    botaoParar.disabled = true;
    statusSimulacao.textContent = "Simulação parada.";
}

botaoIniciar.addEventListener("click", iniciarSimulacao);
botaoParar.addEventListener("click", pararSimulacao);