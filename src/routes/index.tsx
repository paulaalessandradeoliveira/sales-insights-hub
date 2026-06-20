import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Receipt } from "lucide-react";
import {
  kpis, vendasMensais, produtosTop, categoriaShare, regionais, vendedoresTop, brl, num,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Histórico de Vendas — Retail Insights" },
      { name: "description", content: "Acompanhe vendas totais, por produto e por regional." },
    ],
  }),
  component: VendasPage,
});

const COLORS = [
  "var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)",
  "var(--color-chart-4)", "var(--color-chart-5)",
];

function Kpi({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: number }) {
  const positive = delta >= 0;
  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {positive ? "+" : ""}{delta}% vs mês anterior
        </div>
      </CardContent>
    </Card>
  );
}

function VendasPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Histórico de Vendas</h1>
        <p className="text-sm text-muted-foreground">Visão consolidada da performance comercial — últimos 12 meses</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={DollarSign} label="Receita Total" value={brl(kpis.receitaTotal)} delta={kpis.receitaCrescimento} />
        <Kpi icon={Receipt} label="Pedidos" value={num(kpis.pedidos)} delta={kpis.pedidosCrescimento} />
        <Kpi icon={ShoppingBag} label="Ticket Médio" value={brl(kpis.ticketMedio)} delta={kpis.ticketCrescimento} />
        <Kpi icon={Users} label="Clientes Ativos" value={num(kpis.clientesAtivos)} delta={kpis.clientesCrescimento} />
      </div>

      <Tabs defaultValue="total" className="space-y-4">
        <TabsList>
          <TabsTrigger value="total">Vendas Totais</TabsTrigger>
          <TabsTrigger value="produto">Por Produto</TabsTrigger>
          <TabsTrigger value="regional">Regionais</TabsTrigger>
        </TabsList>

        <TabsContent value="total" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receita vs Meta</CardTitle>
              <CardDescription>Evolução mensal contra meta planejada</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={vendasMensais}>
                  <defs>
                    <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => brl(v)} />
                  <Legend />
                  <Area type="monotone" dataKey="receita" name="Receita" stroke="var(--color-chart-1)" fill="url(#r)" strokeWidth={2} />
                  <Line type="monotone" dataKey="meta" name="Meta" stroke="var(--color-chart-3)" strokeDasharray="5 5" dot={false} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendedores</CardTitle>
                <CardDescription>Maior receita individual no período</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendedor</TableHead>
                      <TableHead>Loja</TableHead>
                      <TableHead className="text-right">Pedidos</TableHead>
                      <TableHead className="text-right">Receita</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendedoresTop.map((v) => (
                      <TableRow key={v.nome}>
                        <TableCell className="font-medium">{v.nome}</TableCell>
                        <TableCell className="text-muted-foreground">{v.loja}</TableCell>
                        <TableCell className="text-right">{num(v.pedidos)}</TableCell>
                        <TableCell className="text-right font-medium">{brl(v.receita)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mix por Categoria</CardTitle>
                <CardDescription>Participação na receita</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={categoriaShare} dataKey="valor" nameKey="categoria" innerRadius={60} outerRadius={100} paddingAngle={2}>
                      {categoriaShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => brl(v)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="produto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receita por Produto</CardTitle>
              <CardDescription>Top 8 SKUs do catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={produtosTop} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="nome" stroke="var(--color-muted-foreground)" fontSize={12} width={140} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => brl(v)} />
                  <Bar dataKey="receita" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Unidades</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Margem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtosTop.map((p) => (
                    <TableRow key={p.nome}>
                      <TableCell className="font-medium">{p.nome}</TableCell>
                      <TableCell><Badge variant="secondary">{p.categoria}</Badge></TableCell>
                      <TableCell className="text-right">{num(p.unidades)}</TableCell>
                      <TableCell className="text-right font-medium">{brl(p.receita)}</TableCell>
                      <TableCell className="text-right text-success font-medium">{p.margem}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regionais.map((r) => (
              <Card key={r.regiao}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{r.regiao}</CardTitle>
                    <Badge variant={r.atingimento >= 100 ? "default" : "secondary"} className={r.atingimento >= 100 ? "bg-success text-success-foreground" : ""}>
                      {r.atingimento}%
                    </Badge>
                  </div>
                  <CardDescription>{r.responsavel} · {r.lojas} lojas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Receita</span><span>Meta {brl(r.meta)}</span>
                    </div>
                    <p className="text-xl font-semibold">{brl(r.receita)}</p>
                    <Progress value={Math.min(r.atingimento, 100)} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparativo Regional</CardTitle>
              <CardDescription>Receita realizada vs meta</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={regionais}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="regiao" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => brl(v)} />
                  <Legend />
                  <Bar dataKey="meta" name="Meta" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="receita" name="Receita" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
