# Guia completo — do HubSpot ao deploy na Vercel

Manual passo a passo, sem assumir nada. Tempo total: ~45 min.

---

## Fase 1 — Configurar o HubSpot (15-20 min)

### 1.1. Entrar na conta

1. Abra https://app.hubspot.com no navegador.
2. Faça login com sua conta.
3. Você vai cair no **Dashboard** (página inicial).

### 1.2. Criar as 5 propriedades customizadas de contato

Propriedades são "campos extras" que aparecem no perfil de cada contato. Vamos criar 5 que a calculadora vai preencher.

**Navegação:**

1. No canto **superior direito**, clique no ícone de **engrenagem** (Configurações).
2. No menu lateral esquerdo que aparece, procure por **"Propriedades"** (em inglês: *Properties*).
3. No topo da tela vai ter um seletor **"Selecionar um objeto"** — escolha **"Propriedades de contato"**.
4. Clique no botão **"Criar propriedade"** (azul, canto superior direito).

**Crie a propriedade #1 — Área de atuação:**

Tela 1 ("Tipo básico"):
- **Objeto:** Contato (já vem selecionado)
- **Grupo:** "Informações do contato"
- **Rótulo:** `Área de atuação`
- Logo abaixo aparece "Nome interno" — clique no lápis e edite para: `area_atuacao`
- **Descrição** (opcional): "Área da saúde declarada na calculadora"
- Clique em **Avançar**.

Tela 2 ("Tipo de campo"):
- **Tipo de campo:** Lista suspensa de seleção (Dropdown select)
- **Opções:** adicione exatamente estas 4 opções (uma por linha):
  - `Médico`
  - `Cirurgião-dentista`
  - `Clínica / consultório`
  - `Outros (saúde)`
- Clique em **Criar**.

**Crie a propriedade #2 — Faturamento mensal:**

Repita o caminho: Configurações → Propriedades → Criar propriedade.

- **Rótulo:** `Faturamento mensal`
- **Nome interno:** `faturamento_mensal`
- **Tipo de campo:** Número
- **Formato do número:** Moeda
- **Moeda:** BRL (Real brasileiro)
- Clique em **Criar**.

**Crie a propriedade #3 — Regime tributário:**

- **Rótulo:** `Regime tributário`
- **Nome interno:** `regime_tributario`
- **Tipo de campo:** Lista suspensa de seleção
- **Opções:**
  - `Simples Nacional`
  - `Lucro Presumido`
- Clique em **Criar**.

**Crie a propriedade #4 — Economia mensal estimada:**

- **Rótulo:** `Economia mensal estimada`
- **Nome interno:** `economia_mensal_estimada`
- **Tipo de campo:** Número
- **Formato:** Moeda (BRL)
- Clique em **Criar**.

**Crie a propriedade #5 — Economia anual estimada:**

- **Rótulo:** `Economia anual estimada`
- **Nome interno:** `economia_anual_estimada`
- **Tipo de campo:** Número
- **Formato:** Moeda (BRL)
- Clique em **Criar**.

**Atenção crítica:** o "Nome interno" precisa estar **exatamente** assim (com underscore, sem acento, minúsculo). Se o HubSpot gerar algo diferente (ex: `area_atuacao_1`), clique no lápis e corrija. Se ficar errado, o lead vai chegar sem essas informações preenchidas.

### 1.3. Criar o formulário

1. No menu superior do HubSpot, clique em **Marketing** → **Captura de leads** → **Formulários** (em inglês: *Marketing → Lead Capture → Forms*).
2. Clique em **Criar formulário** (canto superior direito).
3. Escolha **"Formulário incorporado"** (Embedded form) e clique em **Avançar**.
4. Pode aparecer uma tela para escolher template — escolha **"Em branco"** (Blank).

Agora você está no editor do formulário. Do lado esquerdo tem uma busca de campos, do lado direito o formulário sendo montado.

**Nome do formulário:** no canto superior esquerdo onde está escrito "Formulário sem título", clique e renomeie para `Calculadora Equiparação Hospitalar`.

**Adicione os 9 campos** (busque cada um na barra de pesquisa do painel esquerdo e arraste para o formulário, na ordem):

1. **Nome** (firstname) — obrigatório
2. **Sobrenome** (lastname) — obrigatório
3. **E-mail** (email) — obrigatório
4. **Número de telefone** (phone) — obrigatório
5. **Área de atuação** (area_atuacao) — não obrigatório
6. **Faturamento mensal** (faturamento_mensal) — não obrigatório
7. **Regime tributário** (regime_tributario) — não obrigatório
8. **Economia mensal estimada** (economia_mensal_estimada) — não obrigatório
9. **Economia anual estimada** (economia_anual_estimada) — não obrigatório

Para marcar como obrigatório: clique no campo no formulário → no painel direito que abre, ative o toggle **"Obrigatório"**.

**Aba "Opções"** (no topo da tela, ao lado de "Estilo"):
- Ative **"Sempre criar contato a partir do envio"**.
- Em "O que deve acontecer após o envio?" deixe em "Exibir uma mensagem em linha" — não vamos usar esse comportamento, mas precisa ter algo.

**Publicar:** clique no botão azul **"Publicar"** no canto superior direito.

### 1.4. Pegar o Portal ID (Hub ID)

1. Clique no ícone de **engrenagem** (Configurações).
2. No menu lateral, vá em **Conta e cobrança** → **Conta**.
3. Procure por **"ID do hub"** ou **"Hub ID"**. É um número de 6 a 8 dígitos.
4. **Copie** esse número e cole no Bloco de notas — você vai usar daqui a pouco.

Alternativa: olhe a URL do navegador enquanto navega no HubSpot. Algo como `https://app.hubspot.com/contacts/12345678/...`. O número entre `/contacts/` e a próxima `/` é o seu Portal ID.

### 1.5. Pegar o Form GUID

1. Volte em **Marketing** → **Formulários**.
2. Clique no formulário "Calculadora Equiparação Hospitalar" que você criou.
3. No canto superior direito, clique em **Ações** → **Compartilhar formulário**.
4. Na janela que abre, vá na aba **"Incorporar"**.
5. Aparece um código HTML/JavaScript. Procure por `formId: "..."`.
6. O valor dentro das aspas é seu **Form GUID** — algo como `a1b2c3d4-e5f6-7890-abcd-ef1234567890`.
7. **Copie** esse valor para o Bloco de notas, junto com o Portal ID.

Agora você tem os dois números que precisava:

```
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_FORM_GUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

## Fase 2 — Conectar o projeto local ao HubSpot (5 min)

### 2.1. Criar o arquivo `.env.local`

O arquivo `.env.local` guarda suas chaves de configuração. Ele **nunca** vai para o GitHub (está no `.gitignore`).

**Pelo PowerShell** (mais simples):

1. Abra o PowerShell (tecla Windows → digite "PowerShell" → Enter).
2. Cole este comando, substituindo `SEU_PORTAL_ID` e `SEU_FORM_GUID`:

```powershell
@"
HUBSPOT_PORTAL_ID=SEU_PORTAL_ID
HUBSPOT_FORM_GUID=SEU_FORM_GUID
"@ | Out-File -FilePath "C:\Users\jarde\calculadora-saude\.env.local" -Encoding utf8
```

3. Confirme que o arquivo foi criado:

```powershell
Get-Content "C:\Users\jarde\calculadora-saude\.env.local"
```

Deve mostrar as duas linhas.

**Alternativa pelo Bloco de notas:**

1. Abra o Bloco de notas.
2. Cole:
   ```
   HUBSPOT_PORTAL_ID=12345678
   HUBSPOT_FORM_GUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```
3. Substitua pelos valores reais.
4. **Arquivo** → **Salvar como** → vá até `C:\Users\jarde\calculadora-saude\`.
5. Em "Tipo" escolha **"Todos os arquivos"**.
6. Em "Nome do arquivo" digite exatamente: `.env.local` (com o ponto na frente).
7. Em "Codificação" escolha **UTF-8**.
8. Clique em **Salvar**.

### 2.2. Reiniciar o servidor de desenvolvimento

O Next.js só lê `.env.local` na **partida**. Se o servidor está rodando, precisa reiniciar.

1. Vá para o terminal/PowerShell onde o `npm run dev` está rodando.
2. Pressione **Ctrl + C** para parar.
3. Pressione **S** se perguntar "Terminar tarefa em lotes (S/N)?".
4. Rode de novo:
   ```powershell
   cd C:\Users\jarde\calculadora-saude
   npm run dev
   ```
5. Espere aparecer `Ready in Xs` no terminal.

Se você fechou o terminal, abra um novo PowerShell e rode os dois comandos acima.

---

## Fase 3 — Testar o fluxo local (3 min)

### 3.1. Abrir a calculadora

1. Abra o Chrome (ou Edge, Firefox).
2. Vá em http://localhost:3217

Você deve ver o hero com "Médico, dentista ou clínica: sua PJ pode pagar menos impostos. Você já verificou?".

### 3.2. Completar o funil

Use dados de teste reais (você pode apagar o contato depois no HubSpot):

1. **Passo 1:** clique em **Calcular minha economia**.
2. **Passo 2:** escolha **Médico** (qualquer um vale para teste).
3. **Passo 3:** clique em **Continuar**.
4. **Passo 4:** digite `100000` no faturamento (vai virar R$ 100.000,00 com a máscara). Clique em **Continuar**.
5. **Passo 5:** escolha **Lucro Presumido** → **Continuar**.
6. **Passo 6:** escolha **Sim, realizo exames ou procedimentos** → **Continuar**.
7. **Passo 7:** preencha:
   - Nome: `João Teste`
   - E-mail: `teste@suaempresa.com.br`
   - WhatsApp: `(11) 99999-9999` (qualquer número válido)
8. Clique em **Receber agora**.

### 3.3. Conferir no HubSpot

1. Vá em https://app.hubspot.com → **Contatos**.
2. O contato `João Teste` deve aparecer no topo da lista (criado há "alguns segundos atrás").
3. Clique nele.
4. Role a página → procure pela seção **"Sobre"** ou role até as propriedades customizadas.
5. Confirme que aparecem preenchidas:
   - Área de atuação: Médico
   - Faturamento mensal: R$ 100.000,00
   - Regime tributário: Lucro Presumido
   - Economia mensal estimada: R$ 5.400,00
   - Economia anual estimada: R$ 64.800,00

**Se não apareceu:**

- Verifique o terminal do `npm run dev` — se tiver erro `[/api/lead] HubSpot rejeitou: 400 ...`, é problema de configuração.
- Causa comum: nome interno da propriedade diferente do esperado. Volte em **Configurações → Propriedades de contato** e confira que os nomes internos batem exatamente com:
  - `area_atuacao`
  - `faturamento_mensal`
  - `regime_tributario`
  - `economia_mensal_estimada`
  - `economia_anual_estimada`
- Outra causa: o formulário não foi publicado. Volte e clique em **Publicar**.

### 3.4. Conferir o WhatsApp

Logo depois do submit, uma nova aba deve abrir em `wa.me/5581994034692` com a mensagem pré-montada pronta para enviar. Esse é o link que o lead final vai receber — confirma que o número está certo e a mensagem ficou legível.

---

## Fase 4 — Deploy na Vercel (15 min)

A Vercel é uma plataforma de hospedagem gratuita criada pelos próprios autores do Next.js. Deploy em ~3 minutos uma vez configurada.

### 4.1. Criar conta na Vercel

1. Vá em https://vercel.com/signup.
2. Clique em **"Continue with GitHub"** (recomendado — facilita o deploy).
3. Se não tem conta GitHub: crie uma em https://github.com/signup primeiro (grátis, 2 minutos).
4. Autorize a Vercel a acessar seu GitHub.
5. Quando perguntar plano: escolha **Hobby** (gratuito).

### 4.2. Subir o código para o GitHub

A Vercel precisa que o código esteja num repositório Git para fazer deploy automático.

**Pelo PowerShell:**

```powershell
cd C:\Users\jarde\calculadora-saude
git init
git add .
git commit -m "init calculadora-saude"
git branch -M main
```

Agora crie o repositório no GitHub:

1. Vá em https://github.com/new.
2. **Repository name:** `calculadora-saude`
3. **Description:** "Calculadora de Equiparação Hospitalar — Q&M Consultoria"
4. **Privacy:** escolha **Private** (recomendado — código fica só seu).
5. **Não** marque "Add a README file", "Add .gitignore", nem "Choose a license" — já temos tudo.
6. Clique em **Create repository**.

GitHub vai mostrar uma tela com instruções. Use a seção **"…or push an existing repository"**. Copie os 3 comandos e cole no PowerShell:

```powershell
git remote add origin https://github.com/SEU_USUARIO/calculadora-saude.git
git branch -M main
git push -u origin main
```

(Substitua `SEU_USUARIO` pelo seu username GitHub.)

Vai pedir autenticação — siga o fluxo do navegador. Quando terminar, recarregue a página do GitHub e veja todos os arquivos lá.

### 4.3. Importar na Vercel

1. Vá em https://vercel.com/new.
2. Procure por `calculadora-saude` na lista de repositórios.
3. Se não aparecer: clique em **"Adjust GitHub App Permissions"** e libere o acesso ao repo.
4. Quando aparecer, clique em **Import** ao lado dele.

### 4.4. Configurar variáveis de ambiente na Vercel

Antes de clicar em Deploy, **role a página** até a seção **"Environment Variables"**.

Adicione as duas:

| Name | Value |
|---|---|
| `HUBSPOT_PORTAL_ID` | seu Portal ID |
| `HUBSPOT_FORM_GUID` | seu Form GUID |

Para cada uma:

1. Digite o nome no campo "Name".
2. Cole o valor no campo "Value".
3. Deixe as 3 caixas marcadas: **Production**, **Preview**, **Development**.
4. Clique em **Add**.

Depois das duas adicionadas, clique em **Deploy**.

Vai levar ~2 minutos. Quando terminar, aparece uma tela de "Congratulations!" com um botão **Visit**.

### 4.5. Testar em produção

1. Clique em **Visit** — abre algo como `https://calculadora-saude.vercel.app`.
2. Refaça o fluxo do passo 3.2 com outro nome de teste (ex: `Maria Producao`).
3. Confira no HubSpot que o contato chegou.

Se tudo OK: você está no ar.

---

## Fase 5 — Conectar domínio próprio (opcional, 10 min)

Se você tem um domínio (ex: `qmconsultoria.com.br`) e quer que a calculadora rode em `calculadora.qmconsultoria.com.br`:

### 5.1. Adicionar o domínio na Vercel

1. No projeto da Vercel, vá em **Settings** → **Domains**.
2. Digite `calculadora.qmconsultoria.com.br` no campo e clique em **Add**.
3. A Vercel vai mostrar instruções de DNS. Anote.

### 5.2. Configurar DNS no seu registrador

(Registrador = onde você comprou o domínio: Registro.br, GoDaddy, Hostinger, etc.)

1. Entre no painel do registrador.
2. Procure por "Zona DNS" ou "Gerenciar DNS".
3. Crie um registro **CNAME**:
   - **Nome/Host:** `calculadora`
   - **Valor/Aponta para:** `cname.vercel-dns.com`
   - **TTL:** 3600 (ou padrão)
4. Salve.

Pode levar de 5 minutos a 24 horas para o DNS propagar. Depois disso, `https://calculadora.qmconsultoria.com.br` vai funcionar com HTTPS automático.

---

## Fase 6 — Depois que o lead começa a chegar (configurações úteis no HubSpot)

### 6.1. Notificação por e-mail quando chega lead

1. No HubSpot: **Automação** → **Workflows** → **Criar workflow**.
2. **Tipo:** Workflow baseado em contatos.
3. **Critério de inscrição:** "Envios de formulário" → seu formulário "Calculadora Equiparação Hospitalar".
4. **Ação:** "Enviar e-mail interno" → para seu próprio e-mail.
5. **Conteúdo do e-mail:** inclua os campos: Nome, E-mail, Telefone, Área, Faturamento, Economia anual.
6. **Publicar** o workflow.

Agora todo lead novo dispara um e-mail pra você.

### 6.2. Tag automática para leads quentes

Critério: economia anual estimada > R$ 50.000.

1. **Workflows** → **Criar workflow**.
2. **Critério:** "Economia anual estimada" → "é maior que" → `50000`.
3. **Ação:** "Adicionar ao staging de etiqueta" ou "Definir valor da propriedade" → marque uma propriedade como "Lead Quente" ou similar.
4. **Publicar**.

### 6.3. Atualizar depois

Quando você quiser mudar texto, cor, fórmula ou comportamento:

1. Edite o arquivo no projeto (ex: `components/steps/Step1Hero.tsx`).
2. No PowerShell:
   ```powershell
   cd C:\Users\jarde\calculadora-saude
   git add .
   git commit -m "ajuste de copy no hero"
   git push
   ```
3. A Vercel detecta o push e refaz o deploy automaticamente em ~1 minuto.

---

## Resumo dos arquivos do projeto

```
calculadora-saude/
├── .env.local           ← suas chaves HubSpot (NÃO sobe para o Git)
├── .env.example         ← template para outros desenvolvedores
├── HUBSPOT_SETUP.md     ← guia técnico curto
├── GUIA_COMPLETO.md     ← este arquivo
├── README.md            ← visão geral do projeto
├── app/
│   ├── api/lead/route.ts  ← server-side que manda para HubSpot
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Calculator.tsx     ← máquina de estado dos 7 passos
│   ├── Footer.tsx         ← rodapé com Instagram + CNPJ
│   └── steps/
│       ├── Step1Hero.tsx
│       ├── Step2Area.tsx
│       ├── Step3About.tsx
│       ├── Step4Faturamento.tsx
│       ├── Step5Regime.tsx
│       ├── Step6Procedimentos.tsx
│       └── Step7Lead.tsx  ← envia lead pro HubSpot + abre WhatsApp
├── lib/
│   ├── calc.ts            ← fórmula de equiparação hospitalar
│   ├── format.ts          ← máscaras de moeda e telefone
│   └── whatsapp.ts        ← monta a mensagem pré-preenchida
└── package.json
```

---

## Troubleshooting comum

**"Lead não aparece no HubSpot":**
- Reinicie o `npm run dev` depois de editar `.env.local`.
- Verifique no terminal se aparece erro `[/api/lead] HubSpot rejeitou: ...`.
- Confira no HubSpot que o formulário está **Publicado** (não está em rascunho).
- Confira que cada um dos nomes internos das 5 propriedades está exatamente como o documento manda.

**"WhatsApp não abre":**
- Pode ser bloqueio de pop-up. Permita pop-ups no domínio.

**"O número do WhatsApp ficou errado":**
- Edite `lib/whatsapp.ts` → linha `WHATSAPP_DESTINO`. Use o formato `5581994034692` (sem `+`, com DDI 55).

**"Quero trocar o número de telefone só na produção":**
- Em vez de hardcoded, mova para env var. Diga e eu refatoro.

**"A Vercel deu erro no build":**
- Vá em **Deployments** → clique no que falhou → **View Function Logs**. O erro vai aparecer lá.
- Causa comum: variável de ambiente faltando. Confirme na seção Environment Variables.

---

Qualquer travamento, manda print da tela onde travou que eu te desbloqueio.
