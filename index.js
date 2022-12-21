const puppeteer = require('puppeteer');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = "https://pokemon.fandom.com/pt-br/wiki/Pok%C3%A9dex_Nacional"; // url da página solicitada

(async () => {
    const browser = 
      await puppeteer.launch({ headless: true }); // busca os dados da página
    const page = 
      await browser.newPage();
        await page.goto(url); // busca a url da página
  
    const data = await page.evaluate(() => {
      const nome = 
        Array.from(document.querySelectorAll('td')) // coleta todas as tags td onde obtem as informaçoes dos tipos do pokemon


      return nome.map(td => td.innerText) // retorna um array com os tipos das tabelas 
    });

    rl.question("Qual pokemon você deseja pesquisar? ", function(busca) { // procura o pokemon que voce deseja saber 

      for(let i = 0; i < data.length; i++){
        if(data[i] == busca){ // seleciona o tipo do pokemon que você solicitou

            console.log(
              `O Pokemon ${busca} é do tipo${data[i+1]} `
              )
            return;
        }
    }
    
  rl.close(); // fecha o terminal 
  }); 

  await page.waitForTimeout(3000); // tempo de busca da informaçao solicitada 
  await browser.close();
})();