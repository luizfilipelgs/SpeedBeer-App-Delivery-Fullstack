# Boas vindas ao repositório do projeto Car-Shop
 # O que foi desenvolvido  👨‍💻 


  SpeedBeer é um projeto fullstack de uma plataforma de delivery de bebidas que visa oferecer para os empresarios do ramo uma plataforma de vendas online para aumentar o alcance de seus negócios e facilitar o processo de venda, assim como oferecer para os clientes uma ampla variedade de bebidas em um único app, permitindo que eles naveguem facilmente pelo catálogo, selecionem seus produtos favoritos e façam pedidos em poucos cliques, podendo visualizar o status do pedido a qualquer momento.

   ![Speed Beer Vídeo](/SpeedBeer-Vídeo.mp4)
 
  ---

# Tecnologias utilizadas <a name="tecnologias"></a>

- [**React**](https://legacy.reactjs.org/docs/getting-started.html)
- [**Material UI**](https://mui.com/)
- [**Node JS**](https://nodejs.org/pt-br/)
- [**Express**](https://expressjs.com/pt-br/)
- [**MySQL**](https://www.mysql.com/)
- [**Sequelize**](https://sequelize.org/)
- [**JWT**](https://jwt.io/)
- [**Mocha**](https://mochajs.org/)
- [**Chai**](https://www.chaijs.com)
- [**Sinon**](https://sinonjs.org/)
- [**Git**](https://git-scm.com/)
- [**Postman**](https://www.postman.com/downloads/)


# Orientações <a name="orientacoes"></a>


<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

</details>
<details>
  <summary>
    <strong>👷 Estruturação do projeto</strong>
  </summary><br>

  Para facilitar o entendimento, podemos dividir a aplicação em **4 fluxos principais**, **uma validação de status entre cliente e pessoa vendedora** e **cobertura de testes (`front-end` e `back-end`)**:

- **Fluxo Comum** que compreende:
  - (1) Tela de Login (`01login.test`);
  - (2) Tela de Registro (`02register.test`).

- **Fluxo do Cliente** que compreende: :
  - (3) Tela de Produtos (`03customer_products.test`);
  - (4) Tela de Checkout (`04customer_checkout.test`);
  - (5) Tela de Pedidos (`05customer_orders.test`);
  - (6) Tela de Detalhes do Pedido (`06customer_order_details.test`).

- **Fluxo da Pessoa Vendedora** que compreende:
  - (7) Tela de Pedidos (`07seller_orders.test`);
  - (8) Tela de Detalhes/Controle do Pedido (`08seller_order_details.test`).

- **Validação do Status do Pedido** que compreende:
  - (9) Teste de status (`09customer_seller_status_sync.test`);

- **Fluxo da Pessoa Administradora** que compreende:
  - (10) Tela de gerenciamento de usuários (`11admin_manage_users.test`).

- **Testes da aplicação** que compreende:
  - (11) Testes de cobertura (`12coverage_tests.test`).

- ⚠️ **Importante** ⚠️: a tela de login deve ser capaz de direcionar para a tela principal de cada pessoa usuária, sendo as páginas:
  - Do cliente: `/customer/products`,
  - Da pessoa vendedora:  `/seller/orders`,
  - Da pessoa administradora: `/admin/manage`

</details>
<details>
  <summary>
    <strong>🏦 Banco de dados e Sequelize</strong>
  </summary><br>

## Banco de dados

  Para o banco de dados, foi utilizado o ORM `Sequelize`, que fará interface com o `MySQL` com base no Diagrama ER a seguir:

  [Diagrama de ER](Diagrama-ER.png)

</details>

<details>
<summary><strong> 🔰 Iniciando o projeto e Comandos Úteis</strong></summary><br />

  1. Clone o repositório
  * `git clone git@github.com:luizfilipelgs/SpeedBeer-App-Delivery-Fullstack.git`

  2. Entre na pasta do repositório que você acabou de clonar:
  * `cd SpeedBeer-App-Delivery-Fullstack`

  3. Instalar as dependências e roda o Sequelize (Isso ja ira instalar tanto o front quanto o backend).
  * `npm run dev:prestart`

  * dev:prestart: A partir da raiz, esse comando faz o processo de instalação de dependências (npm i) nos dois projetos (./front-end e ./back-end) e roda o Sequelize no ./back-end (lembrar de configurar o .env no mesmo);

  4. Inicialize o servidor.
  * Dentro do projeto, vá para a pasta do back-end `cd back-end/`
  * Execute `npm run dev` para inicializar o servidor 
  * Aparecerá no terminal a mensagem `Api rodando na porta 3001`

  5. Inicialize a aplicação.
  * Dentro do projeto, vá para a pasta do Front-end `cd front-end/`
  * Execute `npm start` 
  * Uma aba será aberta em seu navegador com a aplicação rodando na porta 3000.

  6. Portas.
   - Porta Front-End - http://localhost:3000
   - Porta Back-End - http://localhost:3001

  7. Resetando Banco de Dados.
   
  * `npm run db:reset`
  * db:reset: Roda os scripts do Sequelize restaurando o banco de dados de desenvolvimento (final -dev). Utilize esse script caso ocorra algum problema no seu banco local;

  * `npm run db:reset:debug`
  * db:reset:debug: Roda os scripts do Sequelize restaurando o banco de dados de desenvolvimento (final -dev). Utilize esse script caso ocorra algum problema no seu banco local. Esse comando também é capaz de retornar informações detalhadas de erros (quando ocorrerem no processo);

</details>

<details>

## Testes Back-end 

  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  Para executar os testes localmente, basta executar na pasta de back-end o comando `npm run test:coverage`.

  Você verá a lista de testes aprovados e a tabela de cobertura deles.
  <br>
</details>

# REST API <a name="rest-api"></a>

  Para realização da documentação da API foi utilizando o `Postman`, ele é um API Client que facilita aos desenvolvedores criar, compartilhar, testar e documentar APIs. Isso é feito, permitindo aos usuários criar e salvar solicitações HTTP e HTTPs simples e complexas, bem como ler suas respostas.

  Para visualizar a documentação acesse: https://documenter.getpostman.com/view/26063649/2s93JutNXU
