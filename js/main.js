import { salvarCadastro, recuperarCadastro } from "./storage.js";
import { validarFormulario } from "./validacao.js";

document.addEventListener("DOMContentLoaded", () => {

    const conteudoPrincipal = document.querySelector("main");
    const dentroDaPastaHTML = window.location.pathname.includes("/html/");
    const caminhoImagens = dentroDaPastaHTML ? "../imagens/" : "imagens/";

    // =====================================================
    // DADOS DOS PROJETOS SOCIAIS
    // =====================================================

    const projetosSociais = [
        {
            titulo: "Voluntariado",
            descricao:
                "Participe de campanhas solidárias, eventos comunitários e ações de arrecadação.",
            imagem: caminhoImagens + "voluntariado.webp",
            alt: "Voluntários participando de uma ação social"
        },
        {
            titulo: "Campanhas de Doação",
            descricao:
                "Ajude nossos projetos com doações de alimentos, roupas e outras contribuições.",
            imagem: caminhoImagens + "doacoes.webp",
            alt: "Doações destinadas aos projetos sociais da ONG"
        }
    ];

    // =====================================================
    // CRIAÇÃO DOS CARDS
    // =====================================================

    const cardsProjetos = projetosSociais.map((projeto) => {
        return `
            <section class="card">
                <h2>${projeto.titulo}</h2>

                <p>${projeto.descricao}</p>

                <img
                    src="${projeto.imagem}"
                    alt="${projeto.alt}">
            </section>
        `;
    }).join("");

    // =====================================================
    // CONTEÚDO DAS PÁGINAS DA SPA
    // =====================================================

    const rotas = {

        inicio: `
            <section id="apresentacao">
                <h2>Quem Somos</h2>

                <p>
                    A ONG Transformando Vidas é uma organização dedicada
                    ao desenvolvimento de projetos sociais e ações solidárias.
                    Nosso objetivo é contribuir para a melhoria da qualidade
                    de vida das pessoas e fortalecer a comunidade.
                </p>

                <img
                    src="${caminhoImagens}voluntariado.webp"
                    alt="Voluntários participando de uma ação social">
            </section>

            <section id="contato">
                <h2>Entre em Contato</h2>

                <address>
                    <p>E-mail: contato@ongtransformandovidas.org</p>
                    <p>Telefone: (11) 99999-9999</p>
                    <p>
                        Endereço:
                        Rua da Solidariedade, 100 - São Paulo - SP
                    </p>
                </address>
            </section>
        `,

        projetos: `
            <section id="apresentacao">
                <h2>Conheça nossos projetos</h2>

                <p>
                    A ONG Transformando Vidas desenvolve projetos sociais
                    com o objetivo de ajudar a comunidade e incentivar
                    a participação de voluntários.
                </p>
            </section>

            ${cardsProjetos}

            <section id="participacao">
                <h2>Participe</h2>

                <p>
                    Quer contribuir com nossos projetos?
                    Faça seu cadastro e participe das nossas ações.
                </p>

                <a
                    href="cadastro.html"
                    data-page="cadastro">
                    Quero participar
                </a>
            </section>
        `,

        cadastro: `
            <section id="cadastro">

                <h2>Faça parte da nossa ONG</h2>

                <p>
                    Preencha o formulário abaixo para participar
                    das nossas ações e projetos sociais.
                </p>

                <form id="formCadastro" novalidate>

                    <fieldset>

                        <legend>Dados pessoais</legend>

                        <label for="nome">
                            Nome completo:
                        </label>

                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            autocomplete="name"
                            required>

                        <br>

                        <label for="cpf">
                            CPF:
                        </label>

                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="000.000.000-00"
                            pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                            inputmode="numeric"
                            required>

                        <br>

                        <label for="email">
                            E-mail:
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            autocomplete="email"
                            required>

                        <br>

                        <label for="telefone">
                            Telefone:
                        </label>

                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}"
                            autocomplete="tel"
                            inputmode="tel"
                            required>

                    </fieldset>

                    <fieldset>

                        <legend>Endereço</legend>

                        <label for="cep">
                            CEP:
                        </label>

                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            placeholder="00000-000"
                            pattern="[0-9]{5}-[0-9]{3}"
                            autocomplete="postal-code"
                            inputmode="numeric"
                            required>

                        <br><br>

                        <label for="endereco">
                            Endereço:
                        </label>

                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            autocomplete="street-address"
                            required>

                    </fieldset>

                    <fieldset id="voluntariado">

                        <legend>
                            Forma de participação
                        </legend>

                        <label for="participacao">
                            Como deseja colaborar?
                        </label>

                        <select
                            id="participacao"
                            name="participacao"
                            required>

                            <option value="">
                                Selecione
                            </option>

                            <option value="voluntario">
                                Voluntariado
                            </option>

                            <option value="doador">
                                Doação
                            </option>

                        </select>

                    </fieldset>

                    <br>

                    <button type="submit">
                        Enviar cadastro
                    </button>

                </form>

            </section>
        `
    };

    // =====================================================
    // RECUPERAÇÃO DO CADASTRO
    // =====================================================

    function preencherCadastro() {

        const formulario =
            document.getElementById("formCadastro");

        if (!formulario) {
            return;
        }

        const dadosCadastro =
            recuperarCadastro();

        if (dadosCadastro) {

            document.getElementById("nome").value =
                dadosCadastro.nome || "";

            document.getElementById("cpf").value =
                dadosCadastro.cpf || "";

            document.getElementById("email").value =
                dadosCadastro.email || "";

            document.getElementById("telefone").value =
                dadosCadastro.telefone || "";

            document.getElementById("cep").value =
                dadosCadastro.cep || "";

            document.getElementById("endereco").value =
                dadosCadastro.endereco || "";

            document.getElementById("participacao").value =
                dadosCadastro.participacao || "";
        }
    }

    // =====================================================
    // CARREGAMENTO DAS PÁGINAS
    // =====================================================

    function carregarPagina(pagina) {

    if (rotas[pagina]) {

        conteudoPrincipal.innerHTML =
            rotas[pagina];

        // Guarda qual página está aberta
        localStorage.setItem("paginaAtual", pagina);

        if (pagina === "cadastro") {
            preencherCadastro();
        }
    }
}

    // Recupera os dados quando cadastro.html
    // é aberto diretamente ou atualizado com F5.

    preencherCadastro();

    const paginaSalva =
    localStorage.getItem("paginaAtual");

if (paginaSalva && rotas[paginaSalva]) {
    carregarPagina(paginaSalva);
}

    // =====================================================
    // NAVEGAÇÃO SPA
    // =====================================================

    document.addEventListener("click", (event) => {

        const link =
            event.target.closest("[data-page]");

        if (link) {

            event.preventDefault();

            const pagina =
                link.dataset.page;

            carregarPagina(pagina);
        }
    });

    // =====================================================
    // VALIDAÇÃO E ENVIO DO FORMULÁRIO
    // =====================================================

    document.addEventListener("submit", (event) => {

        if (event.target.id === "formCadastro") {

            event.preventDefault();

            const formulario =
                event.target;

            if (validarFormulario(formulario)) {

                const dadosCadastro = {

                    nome:
                        document.getElementById("nome").value,

                    cpf:
                        document.getElementById("cpf").value,

                    email:
                        document.getElementById("email").value,

                    telefone:
                        document.getElementById("telefone").value,

                    cep:
                        document.getElementById("cep").value,

                    endereco:
                        document.getElementById("endereco").value,

                    participacao:
                        document.getElementById("participacao").value
                };

                salvarCadastro(dadosCadastro);

                Swal.fire({
                    title: "Sucesso!",
                    text: "Cadastro realizado com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK"
                });

            } else {

                alert(
                    "Por favor, preencha corretamente os campos destacados."
                );

                formulario.reportValidity();

                const primeiroCampoInvalido =
                    formulario.querySelector(":invalid");

                if (primeiroCampoInvalido) {
                    primeiroCampoInvalido.focus();
                }
            }
        }
    });

    // =====================================================
    // MODO DE ALTO CONTRASTE
    // =====================================================

    const botaoContraste =
        document.getElementById("alternarContraste");

    // Recupera a preferência salva anteriormente.
    const contrasteSalvo =
        localStorage.getItem("altoContraste");

    if (contrasteSalvo === "ativado") {

        document.body.classList.add(
            "alto-contraste"
        );

        if (botaoContraste) {
            botaoContraste.setAttribute(
                "aria-pressed",
                "true"
            );
        }
    }

    if (botaoContraste) {

        botaoContraste.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "alto-contraste"
                );

                const contrasteAtivado =
                    document.body.classList.contains(
                        "alto-contraste"
                    );

                botaoContraste.setAttribute(
                    "aria-pressed",
                    contrasteAtivado
                );

                if (contrasteAtivado) {

                    localStorage.setItem(
                        "altoContraste",
                        "ativado"
                    );

                } else {

                    localStorage.setItem(
                        "altoContraste",
                        "desativado"
                    );
                }
            }
        );
    }

});