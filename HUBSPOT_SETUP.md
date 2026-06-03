# Setup HubSpot — Q&M Consultoria

Passo a passo para conectar o HubSpot à calculadora. Tempo estimado: **15 min**.

> A integração usa a **Forms API pública** (sem autenticação, sem token). Você só precisa do Portal ID e do Form GUID.

---

## 1. Crie as propriedades customizadas de Contato

No HubSpot:

**Configurações** (engrenagem no topo) → **Propriedades** → aba "Propriedades de Contato" → **Criar propriedade**.

Crie cada uma das 5 abaixo. Use **exatamente** o "Nome interno" indicado — o código depende dele.

| Rótulo | Nome interno | Tipo | Notas |
|---|---|---|---|
| Área de atuação | `area_atuacao` | Dropdown | Opções: Médico, Cirurgião-dentista, Clínica / consultório, Outros (saúde) |
| Faturamento mensal | `faturamento_mensal` | Número | Formato: Moeda (BRL) |
| Regime tributário | `regime_tributario` | Dropdown | Opções: Simples Nacional, Lucro Presumido |
| Economia mensal estimada | `economia_mensal_estimada` | Número | Formato: Moeda (BRL) |
| Economia anual estimada | `economia_anual_estimada` | Número | Formato: Moeda (BRL) |

> O "Nome interno" aparece como campo logo abaixo do rótulo no momento da criação. Se o HubSpot gerar algo diferente automaticamente, **edite** para bater com a tabela.

---

## 2. Crie o formulário

**Marketing** → **Captura de leads** → **Formulários** → **Criar formulário**.

1. Escolha **Formulário incorporado** (Embedded form).
2. Nome do formulário: `Calculadora Equiparação Hospitalar`.
3. Adicione os **9 campos** abaixo, na ordem (arraste do painel lateral):

| Campo | Tipo HubSpot | Obrigatório? |
|---|---|---|
| Nome | `firstname` (padrão) | Sim |
| Sobrenome | `lastname` (padrão) | Sim |
| E-mail | `email` (padrão) | Sim |
| Telefone | `phone` (padrão) | Sim |
| Área de atuação | `area_atuacao` (custom criado acima) | Não |
| Faturamento mensal | `faturamento_mensal` | Não |
| Regime tributário | `regime_tributario` | Não |
| Economia mensal estimada | `economia_mensal_estimada` | Não |
| Economia anual estimada | `economia_anual_estimada` | Não |

4. Aba **Opções** → habilite **"Sempre criar contato a partir do envio"**.
5. Aba **Estilo & visualização** → não precisa mexer (a calculadora não renderiza o form do HubSpot, só envia os dados via API).
6. Clique em **Publicar**.

---

## 3. Pegue o Portal ID e o Form GUID

**Portal ID** (também chamado "Hub ID"):
- Está visível na URL quando você está logado: `app.hubspot.com/contacts/{PORTAL_ID}/objects/0-1/views/all/list`
- Ou em **Configurações** → **Conta e cobrança** → "ID do hub".
- É um número de 6–8 dígitos. Ex: `12345678`.

**Form GUID**:
- Abra o formulário que você acabou de criar.
- Clique em **Ações** → **Compartilhar formulário** → aba **Incorporar**.
- No código HTML que aparecer, procure por `formId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"`.
- Esse UUID é o Form GUID.

---

## 4. Configure o `.env.local` do projeto

Na raiz da calculadora (`C:\Users\jarde\calculadora-saude`), crie um arquivo chamado `.env.local`:

```ini
HUBSPOT_PORTAL_ID=12345678
HUBSPOT_FORM_GUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

(Substitua pelos valores reais.)

Reinicie o dev server (`Ctrl+C` no terminal onde está o `npm run dev` → `npm run dev`).

---

## 5. Configure no Vercel (para produção)

Quando for fazer deploy:

- Em **Project Settings** → **Environment Variables**, adicione as duas chaves acima (mesmos valores) para **Production**, **Preview** e **Development**.
- Faça redeploy para que entrem em vigor.

---

## 6. Teste

1. Rode `npm run dev`.
2. Complete o funil até o passo 7.
3. Preencha nome, e-mail e WhatsApp e clique em **Receber agora**.
4. **Confira:**
   - No HubSpot, em **Contatos** → o lead novo deve aparecer com as propriedades customizadas preenchidas.
   - O WhatsApp deve abrir em paralelo com a mensagem pré-montada.

Se algo falhar:
- Verifique o console do browser (F12) para erros de fetch.
- Verifique o terminal do `npm run dev` para erros server-side.
- Confirme os nomes internos das propriedades (passo 1) — qualquer divergência aborta o submit.

---

## Como funciona por baixo

A calculadora chama uma **API route** interna (`/api/lead`) que faz um POST autenticado-por-origem para:

```
https://api.hsforms.com/submissions/v3/integrations/submit/{PORTAL_ID}/{FORM_GUID}
```

Vantagens dessa abordagem:
- **Sem token de auth** — chaves de API ficariam expostas no front-end.
- **Rastreável pelo HubSpot** — o lead aparece como submissão de formulário, e workflows de automação disparam normalmente.
- **Resiliente** — se o HubSpot estiver fora, o WhatsApp ainda abre (você não perde o lead).
