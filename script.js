const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoPreco = document.getElementById("preco");
const campoCategoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");
const vazio = document.getElementById("vazio");
const lista = document.getElementById("lista");
const total = document.getElementById("total");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function avisar(texto, classe) {
  mensagem.textContent = texto;
  mensagem.className = classe;
}

function mostrarProdutos() {
  lista.innerHTML = "";
  let soma = 0;
  produtos.forEach(function (produto, posicao) {
    soma = soma + produto.preco;
    const linha = document.createElement("tr");
    linha.innerHTML = "<td></td><td></td><td></td>" +
      "<td><button class='btn-excluir'>Excluir</button></td>";

    linha.children[0].textContent = produto.nome;
    linha.children[1].textContent = produto.categoria;
    linha.children[2].textContent = "R$ " + produto.preco.toFixed(2);
   
    linha.querySelector("button").onclick = function () {
      produtos.splice(posicao, 1);
      salvar();
      mostrarProdutos();
      avisar("Produto excluído.", "sucesso");
    };
    lista.appendChild(linha);
  });
  vazio.hidden = produtos.length > 0; // esconde o aviso se há produtos
  total.textContent = "Total: R$ " + soma.toFixed(2);
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede a página de recarregar
  const nome = campoNome.value.trim();
  const preco = parseFloat(campoPreco.value);
  if (nome === "" || isNaN(preco) || preco < 0) {
    avisar("Preencha o nome e um preço válido.", "erro");
    return;
  }
  produtos.push({ nome: nome, preco: preco, categoria: campoCategoria.value });
  salvar();
  mostrarProdutos();
  formulario.reset(); // limpa os campos
  campoNome.focus(); // volta o cursor para o nome
  avisar("Produto cadastrado!", "sucesso");
});

mostrarProdutos();
