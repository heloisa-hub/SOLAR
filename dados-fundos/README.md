# Como atualizar os dados dos fundos todo mês

1. Crie uma pasta com o mês novo, formato `AAAA-MM`:
   `dados-fundos/relatorios/2026-07/`

2. Coloque os 4 PDFs do mês nessa pasta (os nomes de arquivo podem variar
   um pouco — o script procura pelo trecho do nome definido em
   `manifest.json` → `arquivoContem`, ex: "Puglia", "VIALOC").

3. Rode:
   ```
   python dados-fundos/parse_relatorios.py 2026-07
   ```

4. O script regrava `js/funds-data.js` sozinho e mostra na tela o que
   encontrou. Se aparecer `[!]` (aviso), leia com atenção — geralmente é
   uma classe de cota muito nova que ainda não tem todos os períodos
   (normal), mas pode ser sinal de que o layout do relatório mudou.

5. Abra o site (`index.html`) e confira se os números batem com o PDF
   antes de considerar publicado.

## Se um fundo novo entrar na família Solar

Adicione uma entrada nova em `manifest.json` com: slug, nome, CNPJ,
template (`"singulare"` para o formato Demonstrativo Mensal, `"solar-br"`
para o formato Fram Capital), classes de cota esperadas (com rating e
benchmark, que quase nunca mudam), descrição e estratégia. O parser
cuida de puxar os números a partir da próxima vez que rodar.

## Se o layout de um relatório mudar

O parser vai avisar com `[!]` em vez de gravar um número errado.
Se isso acontecer, chame alguém pra ajustar as expressões regulares em
`parse_relatorios.py` — elas foram desenhadas pros 2 formatos que a
Solar usa hoje (Singulare e Fram Capital), não são um leitor genérico
de PDF.

## Por que não é "tempo real"

Os relatórios em si só saem uma vez por mês — não existe uma API do
administrador (Singulare/Q.I. Tech) pra puxar isso ao vivo. Esse script
automatiza a parte chata (reler o PDF e digitar os números certos), mas
o site só fica tão atualizado quanto o relatório mais recente que
alguém colocou na pasta.
