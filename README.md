# InvestMaster-FE

Este é o frontend da aplicação InvestMaster, construído com **Angular 18** para oferecer uma interface de usuário moderna e reativa. O projeto é projetado para fornecer uma experiência rica e interativa para gerenciamento e visualização de dados, utilizando um conjunto robusto de bibliotecas para componentes de UI, visualização de dados e manipulação de formulários.

---

## Principais Tecnologias e Funcionalidades

* **Angular 18**: A base da aplicação, garantindo uma estrutura escalável e de alta performance.
* **Angular Material & CDK**: Componentes de interface de usuário prontos para uso e ferramentas de desenvolvimento de UI, proporcionando um design coeso e responsivo.
* **DataTables (com `angular-datatables`)**: Para a exibição e manipulação avançada de dados tabulares, incluindo funcionalidades como paginação, ordenação e busca em tempo real.
* **Visualização de Dados (Apache ECharts)**: Integração com **ECharts** (via `ngx-echarts`) para a criação de gráficos interativos e diversos, como treemaps, barras, linhas e mais, permitindo a análise visual de informações.
* **Bootstrap 5**: Um framework CSS popular para um layout responsivo e estilização de componentes básicos.
* **Manipulação de Formulários**: Utiliza **Angular Forms** para gerenciamento robusto de formulários, complementado por **`ngx-mask`** para formatação de inputs e **`ng-select2-component`** para caixas de seleção avançadas.
* **Alertas e Notificações**: Integração com **SweetAlert2** para alertas e pop-ups personalizáveis, melhorando a experiência do usuário.
* **jQuery**: Utilizado como uma dependência de suporte para algumas bibliotecas, como o DataTables.

---

## Como Iniciar o Projeto

Para configurar e rodar o projeto localmente, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd invest-master-fe
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    O aplicativo estará disponível em `http://localhost:4200/`.
