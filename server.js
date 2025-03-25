// Importa as dependências necessárias para o servidor
const express = require('express'); // Express é um framework para construir servidores web
const axios = require('axios'); // Axios é usado para fazer requisições HTTP
const { JSDOM } = require('jsdom'); // JSDOM é usado para manipular o HTML recebido
const cors = require('cors'); // CORS permite controle sobre as origens permitidas para acessar o servidor

const app = express(); // Cria uma instância do servidor Express
const port = 3000; // Define a porta onde o servidor vai rodar

// Middleware que permite CORS para todas as origens (pode ser restrito mais tarde para origens específicas)
app.use(cors());

// Função para fazer o scraping dos dados da Amazon
async function scrapeAmazon(keyword) {
    try {
        // Monta a URL de pesquisa no site da Amazon usando a palavra-chave fornecida
        const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
        
        // Faz a requisição GET para a URL da Amazon
        const response = await axios.get(url);

        // Cria uma instância do JSDOM a partir do HTML retornado
        const dom = new JSDOM(response.data);
        const document = dom.window.document; // Acessa o objeto "document" da página retornada

        const products = []; // Array onde os produtos encontrados serão armazenados
        // Seleciona todos os elementos que representam produtos na página
        const productElements = document.querySelectorAll('.s-main-slot .s-result-item');

        // Caso não haja produtos encontrados, exibe mensagem no console
        if (productElements.length === 0) {
            console.log('Nenhum produto encontrado para a palavra-chave:', keyword);
        }

        // Itera sobre os elementos de produto encontrados
        productElements.forEach(item => {
            // Extraí o título do produto (caso exista)
            const title = item.querySelector('h2 span') ? item.querySelector('h2 span').textContent.trim() : 'No title';
            // Extraí a avaliação do produto (caso exista)
            const rating = item.querySelector('.a-icon-alt') ? item.querySelector('.a-icon-alt').textContent.trim() : 'No rating';
            // Extraí o número de reviews do produto (caso exista)
            const reviews = item.querySelector('.s-underline-text') ? item.querySelector('.s-underline-text').textContent.trim() : 'No reviews';
            // Extraí a URL da imagem do produto (caso exista)
            const image = item.querySelector('.s-image') ? item.querySelector('.s-image').src : 'No image';

            // Adiciona o produto extraído ao array de produtos
            products.push({
                title,
                rating,
                reviews,
                image,
            });
        });

        // Retorna os produtos encontrados
        return products;
    } catch (error) {
        // Em caso de erro no processo de scraping, exibe o erro no console
        console.error('Erro no scraping:', error);
        // Lança um erro genérico
        throw new Error('Erro ao fazer scraping');
    }
}

// Rota de scraping da API que será acessada pelos clientes
app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword; // Obtém a palavra-chave da query string

    // Caso não tenha sido fornecida uma palavra-chave, retorna erro 400
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        // Chama a função de scraping e espera os dados
        const data = await scrapeAmazon(keyword);
        // Retorna os produtos encontrados em formato JSON
        res.json(data);
    } catch (error) {
        // Em caso de erro no scraping, exibe o erro no console e retorna um erro 500
        console.error(error);
        res.status(500).json({ error: 'Error scraping data' });
    }
});

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
