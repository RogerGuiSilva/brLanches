const CHAVE_CARRINHO = 'brlanches_carrinho'

function obterCarrinho() {
  const dados = localStorage.getItem(CHAVE_CARRINHO)
  return dados ? JSON.parse(dados) : []
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho))
}

function adicionarAoCarrinho(produto) {
  const carrinho = obterCarrinho()
  const existente = carrinho.find(item => item.id === produto.id)
  if (existente) {
    existente.quantidade += 1
  } else {
    carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, quantidade: 1 })
  }
  salvarCarrinho(carrinho)
  atualizarBadgeCarrinho()
}

function atualizarBadgeCarrinho() {
  const badge = document.getElementById('badge-carrinho')
  if (!badge) return
  const carrinho = obterCarrinho()
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0)
  badge.textContent = total
  badge.style.display = total > 0 ? 'inline' : 'none'
}

function limparCarrinho() {
  localStorage.removeItem(CHAVE_CARRINHO)
  atualizarBadgeCarrinho()
}

document.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho)
