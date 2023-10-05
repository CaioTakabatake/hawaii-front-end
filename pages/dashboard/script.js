function addRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");

  const newRow = document.createElement("tr");

  const cell1 = document.createElement("td");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Digite o valor";
  cell1.appendChild(input);

  const cell2 = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.addEventListener("click", () => {
    removeRow(newRow);
  });
  cell2.appendChild(removeButton);

  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  tbody.appendChild(newRow);
}

function removeRow(row) {
  row.parentNode.removeChild(row);
}

document.getElementById("addAttractionButton").addEventListener("click", () => {
  addRow("attractionsTable");
});

document.getElementById("addFoodStallButton").addEventListener("click", () => {
  addRow("foodStallsTable");
});

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

async function fillAttractionsTable(data) {
  const attractionsTable = document
    .getElementById("attractionsTable")
    .getElementsByTagName("tbody")[0];

  data.atracoes.forEach((attraction) => {
    const row = attractionsTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = `<input type="text" value="${attraction}">`;
    const cell2 = row.insertCell(1);
    cell2.innerHTML =
      '<button onclick="removeRow(this.parentNode.parentNode)">Remover</button>';
  });
}

async function fillFoodStallsTable(data) {
  const foodStallsTable = document
    .getElementById("foodStallsTable")
    .getElementsByTagName("tbody")[0];

  data.barracas_comida.forEach((foodStall) => {
    const row = foodStallsTable.insertRow(-1);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = `<input type="text" value="${foodStall}">`;
    const cell2 = row.insertCell(1);
    cell2.innerHTML =
      '<button onclick="removeRow(this.parentNode.parentNode)">Remover</button>';
  });
}

async function fillData() {
  const data = await fetchPartyData();
  fillAttractionsTable(data);
  fillFoodStallsTable(data);
  const { name, local, horario, valor } = data;
  document.getElementById("name").value = name;
  document.getElementById("local").value = local;
  document.getElementById("data").value = data.data;
  document.getElementById("horario").value = horario;
  document.getElementById("valor").value = valor;
}

document.addEventListener("DOMContentLoaded", () => {
  fillData();
  const dashboardForm = document.getElementById("dashboardForm");

  dashboardForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(dashboardForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const attractionsTable = document.getElementById("attractionsTable");
    const foodStallsTable = document.getElementById("foodStallsTable");

    const attractionsData = [];
    const foodStallsData = [];

    for (const row of attractionsTable.querySelectorAll("tbody tr")) {
      const attractionName = row.querySelector("td input").value;
      attractionsData.push(attractionName);
    }

    for (const row of foodStallsTable.querySelectorAll("tbody tr")) {
      const foodStallName = row.querySelector("td input").value;
      foodStallsData.push(foodStallName);
    }

    const partyData = {
      name: formDataObject.name,
      local: formDataObject.local,
      data: formDataObject.data,
      horario: formDataObject.horario,
      valor: formDataObject.valor,
      atracoes: attractionsData,
      barracas_comida: foodStallsData,
    };

    try {
      const response = await fetch("http://localhost:3000/party", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partyData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar os dados da festa.");
      }

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  });
});
