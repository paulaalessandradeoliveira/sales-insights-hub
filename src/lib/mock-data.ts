// Dados fictícios - substituir por dados reais via API
export const kpis = {
  receitaTotal: 4_287_500,
  receitaCrescimento: 12.4,
  pedidos: 18432,
  pedidosCrescimento: 8.1,
  ticketMedio: 232.6,
  ticketCrescimento: 3.7,
  clientesAtivos: 9421,
  clientesCrescimento: 5.2,
};

export const vendasMensais = [
  { mes: "Jan", receita: 312000, meta: 300000 },
  { mes: "Fev", receita: 298000, meta: 310000 },
  { mes: "Mar", receita: 365000, meta: 330000 },
  { mes: "Abr", receita: 342000, meta: 340000 },
  { mes: "Mai", receita: 401000, meta: 360000 },
  { mes: "Jun", receita: 388000, meta: 380000 },
  { mes: "Jul", receita: 425000, meta: 400000 },
  { mes: "Ago", receita: 461000, meta: 420000 },
  { mes: "Set", receita: 448000, meta: 440000 },
  { mes: "Out", receita: 502000, meta: 460000 },
  { mes: "Nov", receita: 538000, meta: 490000 },
  { mes: "Dez", receita: 607500, meta: 520000 },
];

export const produtosTop = [
  { nome: "Tênis Runner Pro", categoria: "Calçados", receita: 412800, unidades: 1820, margem: 38 },
  { nome: "Jaqueta Urban", categoria: "Vestuário", receita: 358200, unidades: 1190, margem: 45 },
  { nome: "Mochila Trek 30L", categoria: "Acessórios", receita: 287400, unidades: 1640, margem: 52 },
  { nome: "Camiseta Essential", categoria: "Vestuário", receita: 241500, unidades: 4830, margem: 41 },
  { nome: "Boné Classic", categoria: "Acessórios", receita: 178900, unidades: 3580, margem: 48 },
  { nome: "Calça Cargo Tech", categoria: "Vestuário", receita: 164200, unidades: 980, margem: 36 },
  { nome: "Relógio Sport X1", categoria: "Acessórios", receita: 152400, unidades: 380, margem: 55 },
  { nome: "Tênis Casual Lite", categoria: "Calçados", receita: 138700, unidades: 920, margem: 33 },
];

export const categoriaShare = [
  { categoria: "Vestuário", valor: 1685000 },
  { categoria: "Calçados", valor: 1240000 },
  { categoria: "Acessórios", valor: 892000 },
  { categoria: "Esportes", valor: 318000 },
  { categoria: "Casa", valor: 152500 },
];

export const regionais = [
  { regiao: "Sudeste", responsavel: "Marina Costa", lojas: 18, receita: 1842000, meta: 1700000, atingimento: 108 },
  { regiao: "Sul", responsavel: "Rafael Oliveira", lojas: 12, receita: 1024000, meta: 1100000, atingimento: 93 },
  { regiao: "Nordeste", responsavel: "Camila Souza", lojas: 14, receita: 892000, meta: 800000, atingimento: 111 },
  { regiao: "Centro-Oeste", responsavel: "Diego Martins", lojas: 7, receita: 318000, meta: 350000, atingimento: 91 },
  { regiao: "Norte", responsavel: "Patrícia Lima", lojas: 5, receita: 211500, meta: 200000, atingimento: 106 },
];

export const vendedoresTop = [
  { nome: "Ana Beatriz", loja: "SP - Paulista", regiao: "Sudeste", receita: 184200, pedidos: 612 },
  { nome: "Lucas Pereira", loja: "RJ - Barra", regiao: "Sudeste", receita: 162800, pedidos: 540 },
  { nome: "Júlia Ramos", loja: "Recife - RioMar", regiao: "Nordeste", receita: 148600, pedidos: 498 },
  { nome: "Bruno Tavares", loja: "POA - Iguatemi", regiao: "Sul", receita: 132400, pedidos: 451 },
  { nome: "Sofia Mendes", loja: "BH - Diamond", regiao: "Sudeste", receita: 128900, pedidos: 432 },
];

// CRM
export const segmentos = [
  { segmento: "Campeões", clientes: 842, receita: 1280000, ticketMedio: 1520, frequencia: "8.2x/ano", cor: "var(--color-chart-1)" },
  { segmento: "Leais", clientes: 1628, receita: 1024000, ticketMedio: 629, frequencia: "5.4x/ano", cor: "var(--color-chart-2)" },
  { segmento: "Potenciais", clientes: 2104, receita: 682000, ticketMedio: 324, frequencia: "3.1x/ano", cor: "var(--color-chart-3)" },
  { segmento: "Em risco", clientes: 1382, receita: 412000, ticketMedio: 298, frequencia: "1.2x/ano", cor: "var(--color-chart-4)" },
  { segmento: "Hibernando", clientes: 2418, receita: 184000, ticketMedio: 76, frequencia: "0.4x/ano", cor: "var(--color-chart-5)" },
  { segmento: "Novos", clientes: 1047, receita: 142500, ticketMedio: 136, frequencia: "1.0x/ano", cor: "var(--color-primary)" },
];

export const coortes = [
  { mes: "Jul", novos: 412, retidos: 0 },
  { mes: "Ago", novos: 386, retidos: 248 },
  { mes: "Set", novos: 421, retidos: 312 },
  { mes: "Out", novos: 502, retidos: 384 },
  { mes: "Nov", novos: 548, retidos: 452 },
  { mes: "Dez", novos: 631, retidos: 528 },
];

export function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function num(v: number) {
  return v.toLocaleString("pt-BR");
}