const locais = [
  "uma Escola",
  "um Mercado",
  "um Estabelecimento do McDonald's",
  "um Estabelecimento do BurgerKing",
  "um Estabelecimento do Walmart",
  "em um Estúdio da Rede Globo",
  " um Estúdio da Record TV",
  "um Estúdio do SBT",
  "um Estúdio da Band",
  "uma Floricultura",
  "uma Lanchonete",
  "um Bar",
  "uma Papelaria",
  "um Estabelecimento de Fisioterapia",
  "um Cinema",
  "um Escritório Topógrafo",
];

function escolherlocal() {
  const escolha = Math.floor(Math.random() * 16);
  return locais[escolha];
}

module.exports = escolherlocal;
