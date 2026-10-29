
const API_URL = "http://localhost:8080";
const ID_DISPOSITIVO = 1;
const canvasGrafico1 = document.getElementById('grafico1').getContext('2d');

// Gráfico
let grafico1 = new Chart(canvasGrafico1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Temperatura (°C)', data: [], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', fill: true, tension: 0.3 },
            { label: 'Umidade (%)', data: [], borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)', fill: true, tension: 0.3 }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#748078' } } },
        scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' } } }
    }
});

// Atualiza os indicadores
async function carregarIndicadores() {
    try {
        const resposta = await fetch(`${API_URL}/registros/ultimo`);
        if (!resposta.ok) return;

        const dados = await resposta.json();

        document.getElementById("temperatura").textContent =
            dados.temperatura + " °C";

        document.getElementById("umidade").textContent =
            dados.umidade + " %";

        document.getElementById("pressao").textContent =
            dados.pressao + " hPa";

        document.getElementById("luminosidade").textContent =
            dados.luminosidade + " lux";

    } catch (erro) {
        console.log("Erro ao carregar indicadores:", erro);
    }
}

// Mostra o histórico das últimas 24 horas
async function carregarHistorico() {
    const elementoStatus = document.getElementById('statusSimulação') || document.body;

    try {
        const resposta = await fetch(
            `${API_URL}/registros/dispositivo/${ID_DISPOSITIVO}/historico`
        );

        if (!resposta.ok) throw new Error("Erro ao buscar histórico");

        const registros = await resposta.json();
        const ontem = Date.now() - 24 * 60 * 60 * 1000;

        const recentes = registros
            .filter(registro => {
                const data = new Date(registro.dataHora).getTime();
                return data >= ontem && data <= Date.now();
            })
            .sort((a, b) =>
                new Date(a.dataHora) - new Date(b.dataHora)
            )
            .slice(-20);

        if (recentes.length === 0) {
            grafico.textContent =
                "Ainda não há medições nas últimas 24 horas.";
            return;
        }

        const labels = recentes.map(r => new Date(r.dataHora).toLocaleTimeString("pt-BR"));
        const dadosTemperatura = recentes.map(r => r.temperatura);
        const dadosUmidade = recentes.map(r => r.umidade);

        grafico1.data.labels = labels;
        grafico1.data.datasets[0].data = dadosTemperatura;
        grafico1.data.datasets[1].data = dadosUmidade;
        grafico1.update();

    } catch (erro) {
        console.log("Erro ao carregar histórico:", erro);
        grafico.textContent = "Não foi possível carregar o histórico.";
    }
}

// Lista os dispositivos cadastrados no banco
async function carregarDispositivos() {
    const lista = document.getElementById("listaDispositivos");

    try {
        const resposta = await fetch(`${API_URL}/dispositivos`);
        if (!resposta.ok) throw new Error("Erro ao buscar dispositivos");

        const dispositivos = await resposta.json();

        if (dispositivos.length === 0) {
            lista.textContent = "Nenhum dispositivo cadastrado.";
            return;
        }

        lista.innerHTML = dispositivos.map(dispositivo => `
            <div class="dispositivo">
                <span>${dispositivo.nomeDispositivo}</span>
                <span>${dispositivo.localizacao || "--"}</span>
                <span>Cadastrado</span>
            </div>
        `).join("");

    } catch (erro) {
        console.log("Erro ao carregar dispositivos:", erro);
        lista.textContent = "Não foi possível carregar os dispositivos.";
    }
}

// Executa ao abrir a página
function atualizarDashboard() {
    carregarIndicadores();
    carregarHistorico();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarDashboard();
    carregarDispositivos();

    // Atualiza indicadores e histórico a cada 5 segundos
    setInterval(atualizarDashboard, 5000);
});