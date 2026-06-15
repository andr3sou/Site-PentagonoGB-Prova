
// PRODUTOS DA LOJA

const produtosLoja = [
    { id: 1, nome: "Produto 1", preco: 50 },
    { id: 2, nome: "Produto 2", preco: 75 },
    { id: 3, nome: "Produto 3", preco: 100 },
    { id: 4, nome: "Produto 4", preco: 150 }
];

// aramazenar os produto
let produtosCarrinho = [];


// BOTÕES DO CATÁLOGO

// Seleciona todos os botões dos produtos
const botoes = document.querySelectorAll(".produto button");

// Adiciona evento de clique em cada botão
botoes.forEach((botao, index) => {

    botao.addEventListener("click", () => {

        // Adiciona ao carrinho o produto correspondente
        adicionarAoCarrinho(produtosLoja[index]);

    });

});



// ADICIONAR AO CARRINHO


function adicionarAoCarrinho(produto) {

    // Procura se o produto já existe no carrinho
    const itemExistente = produtosCarrinho.find(
        item => item.id === produto.id
    );

    // Se já existir, aumenta a quantidade
    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        // Caso contrário, adiciona um novo item
        produtosCarrinho.push({
            ...produto,
            quantidade: 1
        });

    }

    atualizarCarrinho();
}



// MOSTRAR CARRINHO NA TELA


function atualizarCarrinho() {

    // Elementos do HTML
    const listaCarrinho = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    // Limpa o conteúdo atual
    listaCarrinho.innerHTML = "";

    let valorTotal = 0;

    // Percorre todos os produtos do carrinho
    produtosCarrinho.forEach(produto => {

        // Soma ao valor total
        valorTotal += produto.preco * produto.quantidade;

        // Cria um item visual do carrinho
        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `
            <span>
                ${produto.nome}
                (x${produto.quantidade})
            </span>

            <div>

                R$ ${(produto.preco * produto.quantidade).toFixed(2)}

                <button onclick="alterarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="alterarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <button onclick="removerProduto(${produto.id})">
                    Remover
                </button>

            </div>
        `;

        // Adiciona o item na lista
        listaCarrinho.appendChild(item);

    });

    // Mostra o valor total
    total.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;

}



// ALTERAR QUANTIDADE


function alterarQuantidade(id, valor) {

    produtosCarrinho = produtosCarrinho

        .map(produto => {

            // Se encontrou o produto
            if (produto.id === id) {

                produto.quantidade += valor;

            }

            return produto;

        })

        // Remove produtos com quantidade 0
        .filter(produto => produto.quantidade > 0);

    atualizarCarrinho();

}



// REMOVER PRODUTO


function removerProduto(id) {

    produtosCarrinho = produtosCarrinho.filter(
        produto => produto.id !== id
    );

    atualizarCarrinho();

}



// BOTÃO LIMPAR CARRINHO


document
    .getElementById("limpar")
    .addEventListener("click", () => {

        // Esvazia o vetor
        produtosCarrinho = [];

        atualizarCarrinho();

        // Limpa mensagens
        document.getElementById("texto-comprar").textContent = "";

    });


// BOTÃO COMPRAR


document
    .getElementById("comprar")
    .addEventListener("click", () => {

        const mensagem =
            document.getElementById("texto-comprar");

        // Verifica se há produtos
        if (produtosCarrinho.length === 0) {

            mensagem.textContent =
                "Sem itens para comprar!";

            mensagem.style.color = "red";

            return;

        }

        // Esvazia o carrinho após a compra
        produtosCarrinho = [];

        atualizarCarrinho();

        mensagem.textContent =
            "Compra realizada com sucesso!";

        mensagem.style.color = "lime";

    });
