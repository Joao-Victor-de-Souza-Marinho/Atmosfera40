const API_URL = "http://localhost:8080";

async function carregarDispositivos() {
    const lista = document.getElementById("listaDispositivos");
    if (!lista) return;

    try {
        const [respostaDispositivos, respostaRegistros] = await Promise.all([
            fetch(`${API_URL}/dispositivos`),
            fetch(`${API_URL}/registros/historico`)
        ]);

        if (!respostaDispositivos.ok || !respostaRegistros.ok) {
            throw new Error("Falha ao buscar dados do backend.");
        }

        const listaDispositivos = await respostaDispositivos.json();
        const listaRegistros = await respostaRegistros.json();

        if (!listaDispositivos || listaDispositivos.length === 0) {
            lista.innerHTML = `
                <div class="dispositivo">
                    <span>Nenhum dispositivo cadastrado no banco.</span>
                    <span>--</span><span>--</span><span>--</span><span>--</span>
                </div>
            `;
            return;
        }


        // Mapeia a última medição para cada dispositivo
        const ultimosRegistrosPorDispositivo = listaRegistros.reduce((acumulador, registro) => {

            const idDisp = registro.idDispositivo;

            if (idDisp !== undefined && idDisp !== null) {

                const idChave = String(idDisp);

                const dataAtual = new Date(registro.dataHora).getTime();

                const dataAnterior = acumulador[idChave]
                    ? new Date(acumulador[idChave].dataHora).getTime()
                    : -Infinity;

                if (dataAtual > dataAnterior) {
                    acumulador[idChave] = registro;
                }
            }

            return acumulador;

        }, {});


        lista.innerHTML = listaDispositivos.map(dispositivo => {
            const idDoDispositivo = String(dispositivo.id || dispositivo.idDispositivo);
            const ultimaMedicao = ultimosRegistrosPorDispositivo[idDoDispositivo];

            const sinalWifi = (ultimaMedicao && ultimaMedicao.intensidadeWifi !== null && ultimaMedicao.intensidadeWifi !== undefined)
                ? `${ultimaMedicao.intensidadeWifi} dBm`
                : "-- dBm";

            const dadoAltitude = (ultimaMedicao && ultimaMedicao.altitude !== null && ultimaMedicao.altitude !== undefined)
                ? `${ultimaMedicao.altitude} m`
                : "-- m";

            return `
                <div class="dispositivo">
                    <span>${dispositivo.nomeDispositivo || dispositivo.nome || "Sem nome"}</span>
                    <span>${dispositivo.localizacao || "--"}</span>
                    <span>${sinalWifi}</span>
                    <span>${dadoAltitude}</span>
                    <div><span class="status-badge">${ultimaMedicao ? "Com leitura" : "Sem leitura"}</span></div>
                </div>
            `;
        }).join("");

    } catch (erro) {
        console.error("Erro ao carregar dispositivos: ", erro);
        lista.innerHTML = `
            <div class="dispositivo">
                <span style="color: #ef4444;">Não foi possível carregar os dispositivos.</span>
                <span>--</span><span>--</span><span>--</span><span>Erro</span>
            </div>
        `;
    }
}
async function carregarTabelaDispositivos() {
    try {
        const respostaDispositivos = await fetch(`${API_URL}/dispositivos`);
        const respostaRegistros = await fetch(`${API_URL}/registros/historico`);

        if (!respostaDispositivos.ok || !respostaRegistros.ok) {
            throw new Error("Erro ao buscar dados dos dispositivos.");
        }

        const dispositivos = await respostaDispositivos.json();
        const registros = await respostaRegistros.json();

        const tabela = document.getElementById("tabelaDispositivos");
        const total = document.getElementById("totalDispositivos");

        if (!tabela || !total) return;

        total.textContent = dispositivos.length;
        tabela.innerHTML = "";

        dispositivos.forEach(dispositivo => {
            const ultimoRegistro = registros
                .filter(registro =>
                    String(registro.idDispositivo) === String(dispositivo.id)
                )
                .reduce((maisRecente, registro) => {

                    if (!maisRecente) return registro;

                    const dataAtual = new Date(registro.dataHora).getTime();
                    const dataAnterior = new Date(maisRecente.dataHora).getTime();

                    return dataAtual > dataAnterior ? registro : maisRecente;

                }, null);

            const linha = document.createElement("tr");

            const valores = [
                dispositivo.id,
                dispositivo.nomeDispositivo,
                dispositivo.localizacao || "--",
                ultimoRegistro
                    ? `${ultimoRegistro.temperatura} °C`
                    : "--",
                ultimoRegistro
                    ? `${ultimoRegistro.intensidadeWifi} dBm`
                    : "--",
                ultimoRegistro
                    ? new Date(ultimoRegistro.dataHora).toLocaleString("pt-BR")
                    : "--"
            ];

            valores.forEach(valor => {
                const celula = document.createElement("td");
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro na tabela de dispositivos:", erro);
    }
}


//Carrega os atuadores
async function carregarTabelaAtuadores() {
    try {
        const resposta = await fetch(`${API_URL}/atuadores`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar atuadores.");
        }

        const atuadores = await resposta.json();

        const tabela = document.getElementById("tabelaAtuadores");
        const total = document.getElementById("totalAtuadores");

        total.textContent = atuadores.length;
        tabela.innerHTML = "";

        atuadores.forEach(atuador => {
            const linha = document.createElement("tr");

            const dispositivo = atuador.dispositivos;

            const valores = [
                atuador.id,
                atuador.nomeAtuador,
                dispositivo?.nomeDispositivo || "--",
                atuador.statusAtual ? "Ativo" : "Inativo"
            ];

            valores.forEach(valor => {
                const celula = document.createElement("td");
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const celulaAcao = document.createElement("td");
            const botao = document.createElement("button");

            botao.textContent = atuador.statusAtual
                ? "Desligar"
                : "Ligar";

            botao.dataset.id = atuador.id;
            botao.dataset.ativo = String(!atuador.statusAtual);
            botao.className = "botao-atuador";

            celulaAcao.appendChild(botao);
            linha.appendChild(celulaAcao);
            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar atuadores:", erro);
    }
}


document.getElementById("tabelaAtuadores").addEventListener("click", async event => {
    const botao = event.target.closest(".botao-atuador");

    if (!botao) return;

    botao.disabled = true;

    try {
        const id = botao.dataset.id;
        const ativo = botao.dataset.ativo;

        const resposta = await fetch(
            `${API_URL}/atuadores/${id}/status?ativo=${ativo}`,
            { method: "PUT" }
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível alterar o status.");
        }

        await carregarTabelaAtuadores();

    } catch (erro) {
        console.error("Erro ao alterar atuador:", erro);
        alert("Não foi possível alterar o status do atuador.");
        botao.disabled = false;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    carregarDispositivos();
    carregarTabelaAtuadores();
    carregarTabelaDispositivos();
    setInterval(() => {
        carregarDispositivos();
        carregarTabelaDispositivos();
        carregarTabelaAtuadores();
    }, 10000);
});