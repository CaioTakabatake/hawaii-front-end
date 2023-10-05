async function fetchPartyData() {
  try {
    const response = await fetch("http://localhost:3000/party");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados da API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os dados da API:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetchPartyData();
  const { name, data, horario, valor, atracoes, barracas_comida } = result;
  document.getElementById("name").textContent = name;
  document.getElementById("data").textContent = data.data;
  document.getElementById("horario").textContent = horario;
  document.getElementById("valor").textContent = valor;

  var tableBody = document.querySelector("tbody");

  function preencherTabela() {
    tableBody.innerHTML = "";

    var maxRows = Math.max(atracoes.length, barracas_comida.length);

    for (var i = 0; i < maxRows; i++) {
      var newRow = document.createElement("tr");

      var atracaoCell = document.createElement("td");
      atracaoCell.textContent = i < atracoes.length ? atracoes[i] : "";
      newRow.appendChild(atracaoCell);

      var comidaCell = document.createElement("td");
      comidaCell.textContent =
        i < barracas_comida.length ? barracas_comida[i] : "";
      newRow.appendChild(comidaCell);

      tableBody.appendChild(newRow);
    }
  }

  preencherTabela();
});
