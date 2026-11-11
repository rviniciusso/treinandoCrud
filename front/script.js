const btnCarregar = document.getElementById("btn-load");
const containerItens = document.getElementById("container-itens");
const formItem = document.getElementById("cadastrar");
const btnCadastrar = document.getElementById("btn-cad");
const btnAtualizar = document.getElementById("btn-pes-att");
const btnExcluir = document.getElementById("btn-pes-del");
const containerItemDel = document.getElementById("container-itens-del");
const containerItemAtt = document.getElementById("container-itens-att");


btnCarregar.addEventListener("click", async (event) => {
    event.preventDefault();
    const filter = document.getElementById("filter").value;
    let url = "http://localhost:3001/item";

    if (filter) {
        url += '/' + encodeURIComponent(filter);
    }


    try {
        const response = await fetch(url);
        const todosChamados = await response.json();

        containerItens.innerHTML = "";

        const lista = Array.isArray(todosChamados) ? todosChamados : [todosChamados];

        lista.forEach(element => {
            containerItens.innerHTML += `
                <div class="item">
                    <div class="item-chamado">
                        <p><strong>ID:</strong> ${element.id}</p>
                        <p><strong>Nome:</strong> ${element.nome}</p>
                        <p><strong>Tipo:</strong> ${element.tipo}</p>
                        <p><strong>Marca:</strong> ${element.marca}</p>
                        <p><strong>Problema:</strong> ${element.problema}</p>
                        <p><strong>Status:</strong> ${element.status}</p>
                    </div>
                </div>`;
        });
        

    } catch (error) {
        console.error("Erro:", error);
        containerItens.innerHTML = `<p style="color: red;">Erro ao carregar chamados.</p>`;
        alert('Erro ao carregar');
    }

});

btnCadastrar.addEventListener("click", async (event) =>{
    event.preventDefault();
    let url = "http://localhost:3001/item";
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("categoria").value;
    const marca = document.getElementById("marca").value;
    const problema = document.getElementById("problema").value;
    const status = document.getElementById("status").value;
    if (!nome || !tipo || !marca || !problema || !status) {
        alert('Todos os campos são obrigatórios.');
        return;
    }else{
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
                nome: nome, 
                tipo: tipo, 
                marca: marca, 
                problema: problema, 
                status: status 
            })
    });


    if (response.status === 201) {
            alert('Produto cadastrado com sucesso!');

            const nome = document.getElementById("nome").value = '';
            const tipo = document.getElementById("categoria").value = '';
            const marca = document.getElementById("marca").value = '';
            const problema = document.getElementById("problema").value = '';

            return;
        }
}catch (error) {
    console.error('Erro na requisição:', error);
    alert('Não foi possível se conectar ao servidor.');
}}});

//==================================================================================================================

btnAtualizar.addEventListener("click", async (event) => {
    event.preventDefault();
    let id_att = document.getElementById("buscaAtt").value;
    if (!id_att) {
        alert('Por favor, insira um ID para buscar.');
        return;
    }
    try {
        const url = `http://localhost:3001/item/busca/` + encodeURIComponent(id_att);
        const response = await fetch(url);
        
        const todosChamados = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar item");
        }

        containerItemAtt.innerHTML = "";

        containerItemAtt.innerHTML += `
            <div class="item">
                <div class="item-chamado">
                <form id="atualizar">
                    <p><strong>ID:</strong> ${todosChamados.id}</p>
                    <p><strong>Nome:</strong> ${todosChamados.nome}</p>
                    <input type="text" id="nome-att">
                    <p><strong>Tipo:</strong> ${todosChamados.tipo}</p>
                    <input type="text" id="tipo-att">
                    <p><strong>Marca:</strong> ${todosChamados.marca}</p>
                    <input type="text" id="marca-att">
                    <p><strong>Problema:</strong> ${todosChamados.problema}</p>
                    <input type="text" id="problema-att">
                    <p><strong>Status:</strong> ${todosChamados.status}</p>
                    <select name="status" id="status-att">
                        <option value="Em análise">Em análise</option>
                        <option value="Em manutenção">Em manutenção</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>
                <div>
                    <button class="btn-atualizar" onclick="atualizarItem(${todosChamados.id})">Atualizar</button>
                </div>
                </form>
            </div>`;
        
    } catch (error) {
        alert(`Falha na busca: ${error.message}`);
    }
});

//==================================================================================================================

btnExcluir.addEventListener("click", async (event) => {
    event.preventDefault();
    let id_del = document.getElementById("buscaDel").value;
    try {
        const url = `http://localhost:3001/item/busca/` + encodeURIComponent(id_del);
        const response = await fetch(url);
        const todosChamados = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar item");
        }

       containerItemDel.innerHTML = "";

        containerItemDel.innerHTML += `
            <div class="item">
                <div class="item-chamado">
                    <p><strong>ID:</strong> ${todosChamados.id}</p>
                    <p><strong>Nome:</strong> ${todosChamados.nome}</p>
                    <p><strong>Tipo:</strong> ${todosChamados.tipo}</p>
                    <p><strong>Marca:</strong> ${todosChamados.marca}</p>
                    <p><strong>Problema:</strong> ${todosChamados.problema}</p>
                    <p><strong>Status:</strong> ${todosChamados.status}</p>
                </div>
                <div>
                    <button class="btn-excluir" onclick="deletarItem(${todosChamados.id})">Excluir</button>
                </div>
            </div>`;
        
    } catch (error) {
        alert(`Falha na busca: ${error.message}`);
    }
});


async function atualizarItem(id) {
    const dadosAtualizados = {
        nome: document.getElementById("nome-att").value,
        tipo: document.getElementById("tipo-att").value,
        marca: document.getElementById("marca-att").value,
        problema: document.getElementById("problema-att").value,
        status: document.getElementById("status-att").value
    };

    try {
        const response = await fetch(`http://localhost:3001/item/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao atualizar item.");
        }

        alert("Item atualizado com sucesso!");
    } catch (error) {
        alert(`Erro na atualização: ${error.message}`);
    }
};

async function deletarItem(id) {
    if (!confirm("Tem certeza que deseja apagar este item permanentemente?")) return;

    try {
        const response = await fetch(`http://localhost:3001/item/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao deletar o item.");
        }

        alert("Item excluído com sucesso!");
        containerItemDel.innerHTML = "Pequise um chamado para excluir";
        document.getElementById("buscaDel").value = "";
    } catch (error) {
        alert(`Erro ao excluir: ${error.message}`);
    }
};