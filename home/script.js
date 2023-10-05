async function fetchPartyData() {
  try {
    const response = await fetch("http://localhost:3000/party"); // Substitua pela URL da sua API
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

  // Elemento da tabela onde você vai adicionar as linhas
  var tableBody = document.querySelector("tbody");

  // Função para preencher a tabela
  function preencherTabela() {
    // Limpar o conteúdo da tabela
    tableBody.innerHTML = "";

    // Obter o número máximo de linhas entre atrações e barracas de comida
    var maxRows = Math.max(atracoes.length, barracas_comida.length);

    // Preencher a tabela com os dados
    for (var i = 0; i < maxRows; i++) {
      var newRow = document.createElement("tr");

      // Preencher coluna de atrações
      var atracaoCell = document.createElement("td");
      atracaoCell.textContent = i < atracoes.length ? atracoes[i] : "";
      newRow.appendChild(atracaoCell);

      // Preencher coluna de barracas de comida
      var comidaCell = document.createElement("td");
      comidaCell.textContent =
        i < barracas_comida.length ? barracas_comida[i] : "";
      newRow.appendChild(comidaCell);

      tableBody.appendChild(newRow);
    }
  }

  // Chame a função para preencher a tabela
  preencherTabela();
});
