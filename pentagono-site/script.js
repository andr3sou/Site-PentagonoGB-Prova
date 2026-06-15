
// PRODUTOS DA LOJA

const produtosLoja = [
    { id: 1, nome: "Produto 1", preco: 7 },
    { id: 2, nome: "Produto 2", preco: 3 },
    { id: 3, nome: "Produto 3", preco: 8 },
    { id: 4, nome: "Produto 4", preco: 2009 }
];

// Vetor pra aramazenar os produto
let produtosCarrinho = [];


// BOTÕES DO CATÁLOGO


// Seleciona todos os botões dos produtos

const btnProduto1 = document.getElementById("btnProduto1");
const btnProduto2 = document.getElementById("btnProduto2");
const btnProduto3 = document.getElementById("btnProduto3");
const btnProduto4 = document.getElementById("btnProduto4");

btnProduto1.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[0]);
});

btnProduto2.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[1]);
});

btnProduto3.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[2]);
});

btnProduto4.addEventListener("click", function(){
    adicionarAoCarrinho(produtosLoja[3]);
});


// ADICIONAR AO CARRINHO


function adicionarAoCarrinho(produto) {

    // Procura se o produto já existe no carrinho
    const itemExiste = produtosCarrinho.find(
        item => item.id === produto.id
    );

    
    if (itemExiste) {

        itemExiste.quantidade++;

    } else {
        
        produtosCarrinho.push({
            ...produto,
            quantidade: 1
        });

    }

   renderizarCarrinho();
}



// MOSTRAR CARRINHO NA TELA


function renderizarCarrinho() {


    const listaCarrinho = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");


    listaCarrinho.innerHTML = "";

    let valorTotal = 0;

    // Percorre todos os produtos do carrinho
    produtosCarrinho.forEach(produto => {

        
        valorTotal += produto.preco * produto.quantidade;


        const item = document.createElement("div");

        item.classList.add("item-carrinho");

        item.innerHTML = `
            <span>
                ${produto.nome}
                
                (x${produto.quantidade})
            </span>

            <div>

                R$ ${(produto.preco * produto.quantidade)}

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

       
        listaCarrinho.appendChild(item);

    });

    // Mostra o valor total
    total.textContent = `Total: R$ ${valorTotal}`;

}



// ALTERAR QUANTIDADE


function alterarQuantidade(id, valor) {

    produtosCarrinho = produtosCarrinho.map(produto => {

             if (produto.id === id) {

                produto.quantidade += valor;

            }

            return produto;

        }).filter(produto => produto.quantidade > 0);

    renderizarCarrinho();

}

