const puppeteer = require("puppeteer");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = "https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional"; // url da página solicitada

(async () => {
  const navegador = await puppeteer.launch({ headless: true }); // busca os dados da página

  const pagina = await navegador.newPage();
    await pagina.goto(url); // busca url da página

  const data = await pagina.evaluate(() => {
    const nome = Array.from(document.querySelectorAll("td")); // coleta todas as tags td, onde obtem as informaçoes dos tipos do pokemon

    return nome.map((td) => td.innerText); // retorna um array com os tipos das tabelas
  });

  rl.question("Qual pokemon você deseja pesquisar na sua EletricDex? ", function (pesquisar) {
    // procura o pokemon que voce deseja saber

    pesquisar = pesquisar.toLowerCase();

    const firstLetter = pesquisar.charAt(0);
    
    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = pesquisar.slice(1);

    const pesquisarCap = firstLetterCap + remainingLetters;

    for (let i = 0; i < data.length; i++) {
      if (data[i] == pesquisarCap) {
        // seleciona o tipo do pokemon que você solicitou

        console.log(`O Pokemón pesquisado ${pesquisarCap} é do tipo${data[i + 1]}`);
        return;
      }
    }

    rl.close(); // fecha o terminal
  });

  await pagina.waitForTimeout(3000); // tempo de busca da informaçao solicitada
  await navegador.close(); // fecha o navegador
})();
