
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarCarrinho(nome, preco, imagem) {
    const produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    mostrarCarrinho();
}

function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
    mostrarCarrinho();
}

function alterarQuantidade(nome, valor) {
    const produto = carrinho.find(item => item.nome === nome);

    if (!produto) return;

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {
        removerProduto(nome);
        return;
    }

    salvarCarrinho();
    mostrarCarrinho();
}

function esvaziarCarrinho() {
    carrinho = [];
    salvarCarrinho();
    mostrarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function mostrarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;

        lista.innerHTML += `
            <div class="produto-carrinho">
                <img src="${produto.imagem}" width="70">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>

                <button onclick="alterarQuantidade('${produto.nome}', -1)">-</button>
                ${produto.quantidade}
                <button onclick="alterarQuantidade('${produto.nome}', 1)">+</button>

                <button onclick="removerProduto('${produto.nome}')">
                    Remover
                </button>
            </div>
        `;
    });

    totalElemento.textContent = "R$ " + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", mostrarCarrinho);
