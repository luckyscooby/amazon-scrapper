# Amazon Scrapper

Este projeto é um scrapper simples para obter informações sobre produtos na Amazon, incluindo título, avaliação, número de reviews e imagem. O projeto utiliza Node.js com Express, Axios para realizar requisições HTTP e JSDOM para parsear o HTML da Amazon.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Passo a Passo para Configuração

### 1. Criar a pasta do projeto

Primeiro, crie uma pasta onde o seu projeto será armazenado. Abra o terminal e execute os seguintes comandos:

```bash
mkdir amazon-scraper
cd amazon-scraper
```

### 2. Inicializar o projeto com npm

Dentro da pasta do projeto, inicialize um novo projeto Node.js usando o npm:

```bash
npm init -y
```

Isso criará um arquivo package.json com as configurações padrão.

### 3. Instalar as dependências

O projeto utiliza algumas bibliotecas externas que devem ser instaladas. Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install express axios jsdom cors
```

* ```express```: Framework para criar o servidor web.

* ```axios```: Para fazer requisições HTTP.

* ```jsdom```: Para manipular o HTML retornado da Amazon.

* ```cors```: Para permitir requisições de origens diferentes (Cross-Origin Resource Sharing).

### 4. Criar o arquivo principal do servidor (back-end)

Crie um arquivo chamado ```server.js``` na pasta do projeto e cole o código fornecido neste repositório.

### 5. Executar o servidor

Agora que o código está pronto, inicie o servidor com o comando:

```bash
node server.js
```

Isso iniciará o servidor na porta ```3000```. Você verá no terminal a seguinte mensagem:

```Server running at http://localhost:3000```

### 6. Configure o frontend

```bash
mkdir frontend
cd frontend
```

Dentro da pasta frontend, inicialize o Vite:

```bash
npm create vite@latest .
```

Quando solicitado, escolha o template *vanilla* (para um projeto simples com JavaScript).

Dentro da pasta frontend, instale as dependências:

```bash
npm install
```

Crie um arquivo chamado ```index.html``` na pasta frontend e cole o código fornecido neste repositório.

Execute o comando para iniciar o servidor Vite:

```bash
npm run dev
```
O servidor do frontend estará disponível em ```http://localhost:5173``` por padrão. Acesse no navegador e teste digitando uma palavra-chave para ver os resultados de scraping.

### 7. Testar a API

Você pode testar a API diretamente no navegador ou usando uma ferramenta como o Postman. A URL da API será:

```http://localhost:3000/api/scrape?keyword=seuKeywordAqui```

Substitua seuKeywordAqui pela palavra-chave que você deseja pesquisar, como livros, eletrônicos, etc. A resposta será uma lista de produtos da Amazon que correspondem à palavra-chave.

### 8. Conclusão

Agora você tem um projeto completo usando *npm* para o backend e o frontend:

```Backend```: API com Express que realiza o scraping dos resultados da Amazon.

```Frontend```: Interface simples com HTML, CSS e JavaScript (usando Vite).
