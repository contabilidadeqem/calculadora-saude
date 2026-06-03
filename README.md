# Calculadora de Equiparação Hospitalar — Q&M Consultoria

Funil de 7 passos que estima a economia tributária de PJs da saúde com base no benefício da **Lei 9.249/95** (equiparação hospitalar).

Réplica adaptada da calculadora de Fernanda Hirata, com identidade visual própria (verde-petróleo + dourado champanhe) e entrega de leads via **wa.me** para `+55 81 99403-4692`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Inter (via `next/font`)

## Como rodar local

```bash
cd "C:\Users\jarde\calculadora-saude"
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy na Vercel

1. Crie um repositório no GitHub e faça push desta pasta.
2. Em https://vercel.com/new, importe o repo.
3. Deploy automático, sem variáveis de ambiente necessárias.
4. Para domínio próprio: Settings → Domains → `calculadora.seudominio.com.br`.

## Estrutura

```
app/
  layout.tsx        — shell + Inter + metadata
  page.tsx          — renderiza <Calculator />
  globals.css       — Tailwind + componentes base
components/
  Calculator.tsx    — state machine dos 7 passos
  ProgressBar.tsx
  BackButton.tsx
  Footer.tsx
  steps/
    Step1Hero.tsx
    Step2Area.tsx
    Step3About.tsx
    Step4Faturamento.tsx
    Step5Regime.tsx
    Step6Procedimentos.tsx
    Step7Lead.tsx   — captura nome/e-mail/whats e abre wa.me
  api/lead/route.ts — proxy server-side para HubSpot Forms API
lib/
  calc.ts           — fórmula de equiparação hospitalar
  format.ts         — máscara BRL e telefone
  whatsapp.ts       — montagem da mensagem + URL wa.me
tailwind.config.ts
```

## Integração HubSpot

A captura de leads vai para o **HubSpot CRM** silenciosamente e em seguida abre o WhatsApp do escritório com a mensagem pré-montada.

Setup completo em **[HUBSPOT_SETUP.md](./HUBSPOT_SETUP.md)** (15 min). Resumo:

1. Crie 5 propriedades customizadas de Contato no HubSpot.
2. Crie um formulário "Calculadora Equiparação Hospitalar" com os campos.
3. Copie Portal ID e Form GUID para `.env.local`:
   ```ini
   HUBSPOT_PORTAL_ID=12345678
   HUBSPOT_FORM_GUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
4. No Vercel, adicione as mesmas envs em Project Settings.

Se as envs não estiverem setadas, o lead **não** vai para o HubSpot mas o WhatsApp continua abrindo normalmente — fluxo nunca quebra para o usuário.

## Fórmula

**Lucro Presumido (saúde com procedimentos):**

- Sem equiparação: presunção 32% → **IRPJ 4,8% + CSLL 2,88% = 7,68%** do faturamento.
- Com equiparação (Lei 9.249/95): presunção 8% IRPJ / 12% CSLL → **IRPJ 1,2% + CSLL 1,08% = 2,28%** do faturamento.
- Redução: **~70%** sobre IRPJ+CSLL.

**Simples Nacional:**

- Alíquota efetiva por faixa (Anexo III aproximado) comparada ao cenário de migração para Lucro Presumido com equiparação.
- A recomendação de migração depende de análise individual.

O adicional de 10% do IRPJ (sobre lucro presumido acima de R$ 20k/mês) e PIS/COFINS são tratados como simplificação. O resultado é uma **estimativa** — a análise definitiva é feita pela consultoria.

## Para mudar

- **Cores/marca:** `tailwind.config.ts` (paleta) e `app/globals.css` (componentes).
- **WhatsApp destino:** `lib/whatsapp.ts` → `WHATSAPP_DESTINO`.
- **Textos:** cada `components/steps/Step*.tsx`.
- **Fórmula:** `lib/calc.ts`.
- **Rodapé (Instagram / CNPJ):** `components/Footer.tsx`.

## Dados do escritório

- **Nome:** Q&M Consultoria
- **Instagram:** [@queirozemanoelconsultoria](https://instagram.com/queirozemanoelconsultoria)
- **WhatsApp:** +55 81 99403-4692
- **CNPJ:** 58.848.633/0001-34

## Aviso

Esta calculadora é uma ferramenta de **estimativa**. O resultado final depende de análise tributária individual realizada pela equipe da Q&M Consultoria.
