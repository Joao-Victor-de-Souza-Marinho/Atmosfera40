const API_URL = "http://localhost:8080";
let idDispositivoSelecionado = 1;

// Inicializa o gráfico
const elementoCanvas = document.getElementById('grafico1');
let grafico1 = null;

if (elementoCanvas) {
    const canvasGrafico1 = elementoCanvas.getContext('2d');
    grafico1 = new Chart(canvasGrafico1, {
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

// Mostra o histórico das últimas 24 horas no gráfico
async function carregarHistorico() {
    if (!grafico1) return;

    try {
        const resposta = await fetch(`${API_URL}/registros/dispositivo/${idDispositivoSelecionado}/historico`);
        if (!resposta.ok) throw new Error("Erro ao buscar histórico");

        const registros = await resposta.json();
        const ontem = Date.now() - 24 * 60 * 60 * 1000;

        const recentes = registros
            .filter(registro => {
                const data = new Date(registro.dataHora).getTime();
                return data >= ontem && data <= Date.now();
            })
            .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora))
            .slice(-20);

        if (recentes.length === 0) {
            grafico1.data.labels = [];
            grafico1.data.datasets[0].data = [];
            grafico1.data.datasets[1].data = [];
            grafico1.update();
            return;
        }

        grafico1.data.labels = recentes.map(r => new Date(r.dataHora).toLocaleTimeString("pt-BR"));
        grafico1.data.datasets[0].data = recentes.map(r => r.temperatura);
        grafico1.data.datasets[1].data = recentes.map(r => r.umidade);
        grafico1.update();

    } catch (erro) {
        console.error("Erro ao carregar histórico:", erro);
    }
}

function atualizarDashboard() {
    carregarIndicadores();
    carregarHistorico();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarDashboard();;

    setInterval(atualizarDashboard, 5000);
});