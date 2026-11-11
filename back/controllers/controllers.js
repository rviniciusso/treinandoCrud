const {listarItem, filtrarItens, buscarPorId, cadastrarItem, atualizarItem, deletarItem} = require('../services/services.js');

async function listar(req, res) {
    try {
        const {data} = await listarItem();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function buscar(req, res) {
    try {
        const { termo } = req.params;
        const { data, error } = await filtrarItens(termo);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data || []);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function buscarId(req, res) {
    try {
        const { id } = req.params;
        const { data, error } = await buscarPorId(id);

        if (error) return res.status(400).json({ error: error.message });
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Item não encontrado." });
        }
        return res.status(200).json(data[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function cadastrar(req, res) {
    try{
        const {data, error} = await cadastrarItem(req.body);
        if (error) {
            console.error("Erro do Supabase:", error);
            return res.status(400).json({ error: error.message });
        }
        return res.status(201).json(data);
    }catch (error) {
        console.error("Erro no servidor", error);
        return res.status(500).json({ error: error.message});
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const dadosRecebidos = req.body;

        const dadosFiltrados = {};
        Object.keys(dadosRecebidos).forEach((key) => {
            const valor = dadosRecebidos[key];
            if (valor !== undefined && valor !== null && valor.toString().trim() !== "") {
                dadosFiltrados[key] = valor;
            }
        });

        if (Object.keys(dadosFiltrados).length === 0) {
            return res.status(400).json({ error: "Nenhum campo válido foi fornecido para atualização." });
        }

        const { data, error } = await atualizarItem(id, dadosFiltrados);

        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function deletar(req, res) {
    try {
        const {id} = req.params;
        const {data, error} = await deletarItem(id);

        if (error) {
            console.error("Erro do Supabase ao deletar:", error);
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json(data);
    }catch (error) {
        console.error("Erro interno no servidor:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listar,
    buscar,
    buscarId,
    cadastrar,
    atualizar,
    deletar
};