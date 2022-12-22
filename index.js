const puppeteer = require("puppeteer");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = "https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional"; // url da página solicitada

( async () => {
  const navegador = await puppeteer.launch({ headless: true }); // busca os dados da página

  const pagina = await navegador.newPage();
    await pagina.goto(url); // busca url da página

  const dados = await pagina.evaluate(() => {
    const tipagem = Array.from(document.querySelectorAll("td")); // coleta todas as tags td, onde obtem as informaçoes dos tipos do pokemon

    return tipagem.map((td) => td.innerText); // retorna um array com os tipos das tabelas

  });

  rl.question("Qual pokemon você deseja pesquisar na sua EletricDex? ", function (pesquisar) {
    // procura o pokemon que voce deseja saber

    pesquisar = pesquisar.toLowerCase();

      const firstLetter = pesquisar.charAt(0);
    
      const firstLetterCap = firstLetter.toUpperCase();

      const remainingLetters = pesquisar.slice(1);

      const pesquisarCap = firstLetterCap + remainingLetters;

    for (let y = 0; y < dados.length; y++) {
      if (dados[y] == pesquisarCap) { 
      // realiza a busca do tipo do pokemon que foi solicitado 

        console.log(`O Pokemón pesquisado ${pesquisarCap} é do tipo${dados[y + 1]}`);
        return;
      }
    }

    rl.close(); // fecha o terminal
  });

  await pagina.waitForTimeout(3000); // tempo de busca da informaçao solicitada
  await navegador.close(); // fecha o navegador
})();
