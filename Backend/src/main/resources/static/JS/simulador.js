
const API_URL = "http://localhost:8080";

let intervaloSimulacao = null;
let enviandoMedicoes = false;

const botaoIniciar = document.getElementById("botaoIniciar");
const botaoParar = document.getElementById("botaoParar");
const statusSimulacao = document.getElementById("statusSimulacao");
const resultadoEnvio = document.getElementById("resultadoEnvio");
const listaDispositivos = document.getElementById("listaDispositivos");

function numeroAleatorio(min, max, casas = 1) {
    const valor = Math.random() * (max - min) + min;
    return Number(valor.toFixed(casas));
}

// Agora recebe o ID do dispositivo
function gerarMedicao(idDispositivo) {
    return {
        idDispositivo: idDispositivo,
        temperatura: numeroAleatorio(20, 32),
        umidade: numeroAleatorio(40, 75),
        pressao: numeroAleatorio(1000, 1025),
        altitude: numeroAleatorio(700, 800),
        luminosidade: numeroAleatorio(100, 900),
        velocidadeVento: numeroAleatorio(0, 15),
        direcaoVento: Math.floor(Math.random() * 360),
        intensidadeWifi: Math.floor(Math.random() * 61) - 90
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

// Busca todos os dispositivos cadastrados
async function buscarDispositivos() {
    const resposta = await fetch(`${API_URL}/dispositivos`);

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os dispositivos.");
    }

    return await resposta.json();
}
async function mostrarDispositivos() {
    try {
        const dispositivos = await buscarDispositivos();

        if (dispositivos.length === 0) {
            listaDispositivos.textContent =
                "Nenhum dispositivo cadastrado.";
            return;
        }

        listaDispositivos.textContent =
            "Dispositivos: " +
            dispositivos.map(dispositivo =>
                `${dispositivo.nomeDispositivo} (ID ${dispositivo.id})`
            ).join(", ");

    } catch (erro) {
        listaDispositivos.textContent =
            "Erro ao carregar dispositivos.";
        console.error(erro);
    }
}
// Envia uma medição para cada dispositivo
async function enviarMedicoes() {
    if (enviandoMedicoes) return;

    enviandoMedicoes = true;

    try {
        statusSimulacao.textContent = "Buscando dispositivos...";

        const dispositivos = await buscarDispositivos();

        if (dispositivos.length === 0) {
            statusSimulacao.textContent =
                "Nenhum dispositivo cadastrado.";

            return;
        }

        const resultados = [];
        let sucessos = 0;
        let falhas = 0;

        // Percorre todos os dispositivos encontrados
        for (const dispositivo of dispositivos) {
            const medicao = gerarMedicao(dispositivo.id);

            try {
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

                sucessos++;

                resultados.push({
                    dispositivo: dispositivo.nomeDispositivo,
                    idDispositivo: dispositivo.id,
                    resultado: "Enviado",
                    registro: registro
                });

                // Mostra a última medição enviada na tela
                mostrarMedicao(medicao);

            } catch (erro) {
                falhas++;

                resultados.push({
                    dispositivo: dispositivo.nomeDispositivo,
                    idDispositivo: dispositivo.id,
                    resultado: "Falha",
                    erro: erro.message
                });

                console.error(
                    `Erro no dispositivo ${dispositivo.id}:`,
                    erro
                );
            }
        }

        resultadoEnvio.textContent =
            JSON.stringify(resultados, null, 2);

        statusSimulacao.textContent =
            `${sucessos} envio(s) realizado(s) e ${falhas} falha(s). ` +
            `Último ciclo: ${new Date().toLocaleTimeString("pt-BR")}`;

    } catch (erro) {
        console.error("Erro na simulação:", erro);

        statusSimulacao.textContent =
            `Erro: ${erro.message}`;

    } finally {
        enviandoMedicoes = false;
    }
}

function iniciarSimulacao() {
    if (intervaloSimulacao !== null) return;

    botaoIniciar.disabled = true;
    botaoParar.disabled = false;

    statusSimulacao.textContent = "Iniciando simulação...";

    enviarMedicoes();

    intervaloSimulacao = setInterval(enviarMedicoes, 5000);
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

mostrarDispositivos();