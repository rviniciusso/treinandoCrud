const supabase = require('../data/supabase.js');

async function listarItem() {
    return await supabase.from("cadastros").select("*");
}

async function filtrarItens(termo) {
    return await supabase
        .from("cadastros")
        .select("*")
        .or(`nome.ilike."%${termo}%",marca.ilike."%${termo}%",tipo.ilike."%${termo}%",status.ilike."%${termo}%"`);
}

async function buscarPorId(id) {
    return await supabase
        .from("cadastros")
        .select("*")
        .eq("id", id);
}

async function cadastrarItem(cadastros) {
    return await supabase.from("cadastros").insert([cadastros]).select();
}

async function atualizarItem(id, dados) {
    return await supabase
        .from("cadastros")
        .update(dados)
        .eq("id", id)
        .select();
}
async function deletarItem(id) {
    return await supabase.from("cadastros").delete().eq("id", id).select();
}

module.exports = {
    listarItem,
    filtrarItens,
    buscarPorId,
    cadastrarItem,
    atualizarItem,
    deletarItem
}