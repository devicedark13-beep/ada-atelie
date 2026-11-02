# Ada Ateliê

Protótipo da loja Ad Ateliê, no mesmo tipo de site que [personalizados.com.br](https://www.personalizados.com.br/): catálogo, categorias, busca, índice A–Z e pedido de orçamento. É a loja de um ateliê só.

Os textos do site são originais. Nomes, preços e fotos dos produtos vieram do catálogo do WhatsApp da Ad Ateliê.

Enquanto o Supabase não está configurado, o site usa o catálogo de `lib/catalog.json`. Os orçamentos ficam na pasta `data` do seu computador. Depois que o banco entra, o site lê as tabelas e grava os pedidos lá.

## O que cada endereço faz

| Endereço | Função |
| --- | --- |
| `/` | Início, com os produtos do ateliê |
| `/categorias` | Lista de categorias |
| `/produtos` | Catálogo com filtro |
| `/produtos/canecas-tematicas` | Ficha do produto |
| `/empresas` | Página do ateliê |
| `/empresas/ada-atelie` | Contato do ateliê |
| `/busca?q=caneca` | Busca de produtos |
| `/a-z` | Índice alfabético |
| `/orcamento` | Pedido de orçamento, sem cadastro |
| `/anuncie` | Cadastro de fornecedor |

## Passo 1 — Ver o site no seu computador

Abra o PowerShell na pasta do projeto:

```powershell
cd "C:\Users\gabriel\Desktop\Nova pasta\ada-atelie"
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para parar o servidor, use `Ctrl+C` nessa janela.

## Passo 2 — Criar o banco no Supabase

1. Crie uma conta em [supabase.com](https://supabase.com).
2. Clique em **New project**. Escolha um nome, uma senha do banco e a região mais próxima (por exemplo, São Paulo). Espere o projeto ficar pronto.
3. No menu lateral, abra **SQL Editor** e clique em **New query**.
4. Abra o arquivo `supabase/schema.sql` deste projeto, copie tudo, cole no editor e clique em **Run**. Isso cria as tabelas e as regras de acesso.
5. Abra uma query nova, cole o arquivo `supabase/seed.sql` e clique em **Run**. Isso enche o catálogo.
6. Confira em **Table Editor** se existem linhas em `categories`, `companies` e `products`.
7. Vá em **Project Settings → API**.
   - Copie a **Project URL**.
   - Copie a chave **anon public**. Essa chave pode ficar no site. As regras do `schema.sql` impedem que ela apague produtos ou leia os orçamentos dos clientes.
   - Não copie a chave **service_role** para o site. Ela ignora as regras.
8. Na pasta do projeto, copie `.env.example` para um arquivo chamado `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

9. Pare o `npm run dev` e inicie de novo. O rodapé deve dizer que o banco está conectado, e a home deve dizer que a lista vem do Supabase.
10. Envie um orçamento de teste. No Supabase, abra a tabela `quotes`. A linha nova aparece ali. A tabela `supplier_leads` recebe os cadastros da página Anuncie.

Para mudar um preço ou um texto, edite a linha em **Table Editor**. Atualize o site no navegador.

Se você alterar `lib/catalog.json` e quiser gerar o `seed.sql` de novo:

```powershell
node scripts/build-seed.mjs
```

## Passo 3 — Guardar o código no GitHub

1. Crie uma conta em [github.com](https://github.com).
2. Clique em **New repository**. Nome sugerido: `ada-atelie`. Deixe o repositório vazio: não marque README, .gitignore nem licença, porque este projeto já tem esses arquivos.
3. No PowerShell, dentro da pasta `ada-atelie`:

```powershell
git add .
git commit -m "Cria o protótipo do portal Ada Ateliê."
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ada-atelie.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu usuário do GitHub. Na primeira vez, o Windows pede login. Use o navegador quando ele abrir.

O arquivo `.env.local` não entra no GitHub. A chave fica só na sua máquina e, no próximo passo, na Vercel.

## Passo 4 — Publicar na Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) com o mesmo login do GitHub.
2. Clique em **Add New… → Project**.
3. Escolha o repositório `ada-atelie` e clique em **Import**. O framework Next.js é detectado sozinho. Não mude o comando de build.
4. Antes de publicar, abra **Environment Variables** e crie as duas variáveis, com os mesmos valores do `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique em **Deploy**. No fim, a Vercel mostra um endereço como `https://ada-atelie.vercel.app`.
6. Abra esse endereço, envie um orçamento e confira a tabela `quotes` no Supabase.

Quando você der `git push` de novo na branch `main`, a Vercel publica a versão nova sozinha.

Se você mudar uma variável na Vercel, abra o projeto, vá em **Deployments** e clique em **Redeploy** no último deploy. As variáveis `NEXT_PUBLIC_` entram no site na hora da publicação.

## Se algo quebrar

| O que acontece | O que fazer |
| --- | --- |
| O rodapé continua falando em catálogo local | O `.env.local` está na pasta `ada-atelie`, com os dois nomes exatos, e o `npm run dev` foi reiniciado. |
| O orçamento diz que não salvou no Supabase | Rode o `schema.sql` de novo. Sem a política de inserção, o banco recusa o pedido. |
| A home não mostra os produtos do banco | A tabela `products` precisa ter pelo menos uma linha. Rode o `seed.sql`. |
| O `git push` pede senha e recusa | No GitHub, use **Settings → Developer settings → Personal access tokens** ou o login pelo navegador do Git Credential Manager. |
| A Vercel publica, mas o banco não conecta | As duas variáveis estão no projeto da Vercel e você fez um novo deploy depois de salvá-las. |
