import { program } from 'commander';

export function parseCliArgs() {
  program
    .name('screenx')
    .description('CLI para abrir uma URL no navegador e executar ações como screenshot, injeção de JS e simulação de preenchimento de formulário.')
    .argument('<url>', 'URL a ser aberta')
    .option('--screenshot <path>', 'Caminho do arquivo para salvar screenshot')
    .option('--screenshot-on <start|confirm>', 'Quando tirar o screenshot (default: start)')
    .option('--fullpage', 'Captura a página inteira com scroll automático')
    .option('--scroll <px>', 'Faz scroll de X pixels antes da captura', parseInt)
    .option('--resolution <WxH>', 'Resolução da janela (ex: 1280x720)', '1280x720')
    .option('--inject-js <script>', 'Código JS como string a ser executado')
    .option('--inject-js-file <path>', 'Caminho para arquivo JS a ser injetado')
    .option('--simulate-form <json>', 'JSON com instruções para preencher campos do formulário')
    .option('--headless', 'Executa em modo headless')
    .option('--human', 'Aguarda interação humana com botão de confirmação')
    .option('--delay <ms>', 'Delay em milissegundos antes de ações', parseInt)
    .option('--timeout <ms>', 'Tempo máximo de execução em ms', parseInt)
    .option('--output <json|text>', 'Formato da saída (default: text)', 'text')
    .option('--verbose', 'Habilita logs detalhados')
    .parse();

  const options = program.opts();
  const url = program.args[0];

  return { options, url };
}
