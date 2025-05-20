class Contato {
    constructor(nome, telefone, email) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }

    toString() {
        return `Nome: ${this.nome}\nTelefone: ${this.telefone}\nEmail: ${this.email}`;
    }
}

const agenda = [];

function adicionarContato() {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !telefone || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novoContato = new Contato(nome, telefone, email);
    agenda.push(novoContato);
    limparCampos();
    atualizarLista();
    mostrarSecao('lista');
}

function atualizarLista() {
    const lista = document.getElementById("listaContatos");
    lista.innerHTML = "";

    agenda.forEach((contato, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <div id="info-${index}">
          <strong>${contato.nome}</strong><br/>
          Telefone: ${contato.telefone}<br/>
          Email: ${contato.email}
          <br/>
          <button onclick="editarContato(${index})">Editar</button>
          <button onclick="excluirContato(${index})">Excluir</button>
        </div>
      `;

        lista.appendChild(li);
    });
}

function excluirContato(index) {
    if (confirm(`Deseja realmente excluir o contato: ${agenda[index].nome}?`)) {
        agenda.splice(index, 1);
        atualizarLista();
    }
}

function editarContato(index) {
    const contato = agenda[index];
    const div = document.getElementById(`info-${index}`);

    div.innerHTML = `
      <input type="text" id="edit-nome-${index}" value="${contato.nome}" autocomplete="off" />
      <input type="text" id="edit-telefone-${index}" value="${contato.telefone}" autocomplete="off" />
      <input type="email" id="edit-email-${index}" value="${contato.email}" autocomplete="off" />
      <br/>
      <button onclick="salvarContato(${index})">Salvar</button>
      <button onclick="atualizarLista()">Cancelar</button>
    `;
}

function salvarContato(index) {
    const nome = document.getElementById(`edit-nome-${index}`).value.trim();
    const telefone = document.getElementById(`edit-telefone-${index}`).value.trim();
    const email = document.getElementById(`edit-email-${index}`).value.trim();

    if (!nome || !telefone || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    agenda[index].nome = nome;
    agenda[index].telefone = telefone;
    agenda[index].email = email;

    atualizarLista();
}

function procurarContato() {
    const nomeBusca = document.getElementById("busca").value.trim().toLowerCase();
    const resultado = document.getElementById("resultadoBusca");
    resultado.style.display = "none";
    resultado.innerHTML = "";

    if (!nomeBusca) return;

    const contato = agenda.find(c => c.nome.toLowerCase() === nomeBusca);
    if (contato) {
        resultado.innerText = `Contato encontrado:\n${contato.toString()}`;
        resultado.style.display = "block";
    } else {
        resultado.innerText = "Contato não encontrado.";
        resultado.style.display = "block";
    }
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
}

function mostrarSecao(id) {
    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativa');
    });
    document.getElementById(id).classList.add('ativa');

    if (id === "lista") {
        atualizarLista();
    }
}
