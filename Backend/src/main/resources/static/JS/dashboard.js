
const API_URL = "http://localhost:8080";

// Inicializa o gráfico
const elementoCanvas = document.getElementById('grafico1');
let grafico1 = null;
let graficoLuminosidade = null;
let dispositivosDisponiveis = [];

if (elementoCanvas) {
    const canvasGrafico1 = elementoCanvas.getContext('2d');
    grafico1 = new Chart(canvasGrafico1, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: [],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Umidade (%)',
                    data: [],
                    borderColor: '#4ade80',
                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#748078'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}
// Inicializa o gráfico de luminosidade
const canvasLuminosidade = document.getElementById("graficoLuminosidade");

if (canvasLuminosidade) {
    graficoLuminosidade = new Chart(canvasLuminosidade.getContext("2d"), {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Luminosidade média (lux)",
                data: [],
                backgroundColor: "rgba(74, 160, 110, 0.65)",
                borderColor: "#2f855a",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Atualiza os indicadores
async function carregarIndicadores() {
    try {
        const resposta = await fetch(`${API_URL}/registros/ultimo`);
        if (!resposta.ok) return;

        const dados = await resposta.json();

        const elTemp = document.getElementById("temperatura");
        const elUmid = document.getElementById("umidade");
        const elPress = document.getElementById("pressao");
        const elLumi = document.getElementById("luminosidade");

        if (elTemp) elTemp.textContent = `${dados.temperatura ?? '--'} °C`;
        if (elUmid) elUmid.textContent = `${dados.umidade ?? '--'} %`;
        if (elPress) elPress.textContent = `${dados.pressao ?? '--'} hPa`;
        if (elLumi) elLumi.textContent = `${dados.luminosidade ?? '--'} lux`;

    } catch (erro) {
        console.error("Erro ao carregar indicadores:", erro);
    }
}

async function carregarOpcoesFiltros() {

    const filtroDispositivo = document.getElementById("filtroDispositivo");
    const filtroLocalizacao = document.getElementById("filtroLocalizacao");

    if (!filtroDispositivo || !filtroLocalizacao) return;

    try {

        const resposta = await fetch(`${API_URL}/dispositivos`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar dispositivos.");
        }

        dispositivosDisponiveis = await resposta.json();

        // Limpa as opções anteriores
        filtroDispositivo.innerHTML = '<option value="">Todos</option>';
        filtroLocalizacao.innerHTML = '<option value="">Todas</option>';

        const localizacoes = new Set();

        dispositivosDisponiveis.forEach(dispositivo => {

            const id = dispositivo.id;
            const nome = dispositivo.nomeDispositivo;

            // Adiciona o dispositivo ao seletor
            const opcao = document.createElement("option");

            opcao.value = id;
            opcao.textContent = nome;

            filtroDispositivo.appendChild(opcao);

            // Guarda as localizações sem repetir
            if (dispositivo.localizacao) {
                localizacoes.add(dispositivo.localizacao.trim());
            }

        });

        // Adiciona as localizações ao seletor
        [...localizacoes].sort().forEach(localizacao => {

            const opcao = document.createElement("option");

            opcao.value = localizacao;
            opcao.textContent = localizacao;

            filtroLocalizacao.appendChild(opcao);

        });

    } catch (erro) {

        console.error("Erro ao carregar opções dos filtros:", erro);

    }
}
// Agrupa a luminosidade pela localização dos dispositivos
function atualizarGraficoLuminosidade(registros) {

    if (!graficoLuminosidade) return;

    const agrupamento = new Map();

    registros.forEach(registro => {

        const dispositivo = dispositivosDisponiveis.find(
            item => String(item.id) === String(registro.idDispositivo)
        );

        const localizacao = dispositivo?.localizacao || "Sem localização";

        const valor = Number(registro.luminosidade);

        if (!Number.isFinite(valor)) return;

        const atual = agrupamento.get(localizacao) || {
            soma: 0,
            quantidade: 0
        };

        atual.soma += valor;
        atual.quantidade++;

        agrupamento.set(localizacao, atual);
    });

    const locais = [...agrupamento.keys()].sort();

    graficoLuminosidade.data.labels = locais;

    graficoLuminosidade.data.datasets[0].data = locais.map(local => {

        const dados = agrupamento.get(local);

        return Number((dados.soma / dados.quantidade).toFixed(1));

    });

    graficoLuminosidade.update();
}
// Atualiza a bússola com a última direção do vento
async function carregarBussola() {

    const agulha = document.getElementById("agulhaBussola");
    const textoDirecao = document.getElementById("direcaoVento");

    if (!agulha || !textoDirecao) return;

    try {

        const dispositivoId = document.getElementById("filtroDispositivo").value;

        const url = dispositivoId
            ? `${API_URL}/registros/dispositivo/${dispositivoId}/ultimo`
            : `${API_URL}/registros/ultimo`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar a direção do vento.");
        }

        const registro = await resposta.json();

        const direcao = registro.direcaoVento;

        if (direcao === null || direcao === undefined ||
            !Number.isFinite(Number(direcao))) {

            textoDirecao.textContent = "Direção indisponível";
            return;
        }

        // Normaliza o ângulo entre 0 e 359 graus
        const angulo = ((Number(direcao) % 360) + 360) % 360;

        // Converte os graus em uma direção cardeal
        const direcoes = [
            "Norte",
            "Nordeste",
            "Leste",
            "Sudeste",
            "Sul",
            "Sudoeste",
            "Oeste",
            "Noroeste"
        ];

        const indice = Math.round(angulo / 45) % 8;

        // Gira a agulha
        agulha.style.transform = `rotate(${angulo}deg)`;

        // Atualiza o texto
        textoDirecao.textContent =
            `${direcoes[indice]} (${angulo}°)`;

    } catch (erro) {

        console.error("Erro ao atualizar bússola:", erro);

        textoDirecao.textContent = "Erro ao carregar direção";
    }
}

// Carrega o histórico conforme os filtros selecionados
async function carregarHistorico() {

    if (!grafico1) return;

    try {

        const periodo = document.getElementById("filtroPeriodo").value;
        const dispositivoId = document.getElementById("filtroDispositivo").value;
        const localizacao = document.getElementById("filtroLocalizacao").value;

        // Monta os parâmetros da consulta
        const parametros = new URLSearchParams();

        parametros.set("periodo", periodo);

        if (dispositivoId) {
            parametros.set("dispositivoId", dispositivoId);
        }

        if (localizacao) {
            parametros.set("localizacao", localizacao);
        }

        // Consulta o endpoint de histórico filtrado
        const resposta = await fetch(
            `${API_URL}/registros/historico/filtrar?${parametros.toString()}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar histórico.");
        }

        const registros = await resposta.json();

        // Organiza as medições da mais antiga para a mais recente
        const ordenados = registros.sort((a, b) =>
            new Date(a.dataHora).getTime() -
            new Date(b.dataHora).getTime()
        );

        // Atualiza os horários no eixo horizontal
        grafico1.data.labels = ordenados.map(registro => {

            const data = new Date(registro.dataHora);

            if (periodo === "todos") {
                return data.toLocaleString("pt-BR");
            }

            return data.toLocaleTimeString("pt-BR");

        });

        // Atualiza temperatura
        grafico1.data.datasets[0].data =
            ordenados.map(registro => registro.temperatura);

        // Atualiza umidade
        grafico1.data.datasets[1].data =
            ordenados.map(registro => registro.umidade);

        grafico1.update();
        atualizarGraficoLuminosidade(ordenados);

    } catch (erro) {

        console.error("Erro ao carregar histórico:", erro);

    }
}

// NOVA FUNÇÃO: carrega a tabela de dispositivos


// Atualiza o dashboard
function atualizarDashboard() {
    carregarIndicadores();
    carregarHistorico();
    carregarBussola();
}

document.addEventListener("DOMContentLoaded", async () => {

    // Carrega as opções dos filtros
    await carregarOpcoesFiltros();

    // Detecta alterações nos seletores
    document.getElementById("filtroPeriodo")
        .addEventListener("change", carregarHistorico);

    document.getElementById("filtroDispositivo")
    .addEventListener("change", () => {
        carregarHistorico();
        carregarBussola();
    });

    document.getElementById("filtroLocalizacao")
        .addEventListener("change", carregarHistorico);

    // Carrega o dashboard
    atualizarDashboard();

    // Atualiza automaticamente a cada 5 segundos
    setInterval(atualizarDashboard, 5000);

});
