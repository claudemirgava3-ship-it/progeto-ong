export function salvarCadastro(dadosCadastro) {
    localStorage.setItem(
        "cadastroONG",
        JSON.stringify(dadosCadastro)
    );
}

export function recuperarCadastro() {
    const dadosSalvos = localStorage.getItem("cadastroONG");

    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    }

    return null;
}