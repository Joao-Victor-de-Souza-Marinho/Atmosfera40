const API_URL = "http://localhost:8080";

async function carregarDispositivos() {
    const lista = document.getElementById("listaDispositivos");
    if (!lista) return;

    try {
        const [respostaDispositivos, respostaRegistros] = await Promise.all([
            fetch(`${API_URL}/dispositivos`),
            fetch(`${API_URL}/registros`)
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
                if (!acumulador[idChave] || (registro.id && registro.id > acumulador[idChave].id)) {
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
                    <div><span class="status-badge">${dispositivo.status || "Ativo"}</span></div>
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

document.addEventListener("DOMContentLoaded", () => {
    carregarDispositivos();
    setInterval(carregarDispositivos, 10000);
});