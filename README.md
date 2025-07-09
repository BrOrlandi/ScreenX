# ScreenX

O ScreenX é uma ferramenta de linha de comando (CLI) construída com Node.js e Puppeteer que permite automatizar interações com páginas web. Você pode abrir URLs, tirar screenshots, injetar scripts, preencher formulários e muito mais. É uma ferramenta versátil tanto para automação de tarefas por humanos quanto por agentes de IA.

## Instalação

Para utilizar o ScreenX, você precisa ter o Node.js instalado. Depois, basta clonar o repositório e instalar as dependências.

```bash
# Clone o repositório (substitua pela URL correta quando disponível)
git clone https://github.com/seu-usuario/screenx.git

# Navegue até o diretório do projeto
cd screenx

# Instale as dependências
npm install
```

## Como Usar

O comando base é simples. Você pode executá-lo diretamente com `node index.js` ou, após uma instalação global (`npm install -g .`), apenas com `screenx`.

```bash
node index.js [options] <url>
```

### Exemplos de Uso

**1. Screenshot Simples**

Tira um screenshot de uma página e salva em um arquivo.

```bash
node index.js --screenshot google.png https://google.com
```

**2. Simulação de Formulário (Busca no Google)**

Preenche um termo de busca no Google, pressiona Enter e tira um screenshot da página de resultados.

```bash
node index.js --screenshot resultados.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Inteligência Artificial"}, {"action":"press", "key":"Enter"}]' https://www.google.com
```

**3. Interação Humana (Resolver CAPTCHA)**

Caso encontre um CAPTCHA, use o modo `--human`. O script irá pausar e exibir um botão de "Clique para continuar" na página, dando a você tempo para resolver o desafio antes de prosseguir.

```bash
node index.js --screenshot resultados-human.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Inteligência Artificial"}, {"action":"press", "key":"Enter"}]' --human https://www.google.com
```

## Parâmetros Disponíveis

| Parâmetro | Descrição |
|---|---|
| `<url>` | **Obrigatório.** URL da página a ser aberta (inclusive `localhost`). |
| `--screenshot <path>` | Caminho onde o screenshot será salvo. |
| `--fullpage` | Captura a página inteira, rolando-a automaticamente. |
| `--scroll <px>` | Rola a página em X pixels antes de qualquer outra ação. |
| `--resolution <WxH>` | Define a resolução do navegador (padrão: `1280x720`). |
| `--inject-js <script>` | Código JavaScript (em formato de string) a ser executado na página. |
| `--inject-js-file <path>` | Caminho para um arquivo `.js` com código a ser injetado. |
| `--simulate-form <json>` | Preenche campos e executa ações com base em um array JSON. |
| `--headless` | Executa o navegador em modo "headless", sem janela gráfica. |
| `--human` | Aguarda o clique do usuário em um botão flutuante antes de continuar. |
| `--delay <ms>` | Aguarda um tempo (em milissegundos) antes de prosseguir com as ações. |
| `--timeout <ms>` | Define o tempo máximo de execução para o carregamento da página. |
| `--output <json|text>` | Define o formato da saída (padrão: `text`). |
| `--verbose` | Exibe logs detalhados de cada etapa da execução. |
| `-h, --help` | Mostra a ajuda do CLI. |
| `-v, --version` | Exibe a versão do ScreenX. |

