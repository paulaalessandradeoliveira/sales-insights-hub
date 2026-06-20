import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { segmentos, coortes, brl, num } from "@/lib/mock-data";
import { Users, Heart, AlertTriangle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "Painel CRM — Retail Insights" },
      { name: "description", content: "Segmentação de clientes, receita e valor por segmento." },
    ],
  }),
  component: CrmPage,
});

function CrmPage() {
  const totalClientes = segmentos.reduce((a, s) => a + s.clientes, 0);
  const totalReceita = segmentos.reduce((a, s) => a + s.receita, 0);
  const campeoes = segmentos.find((s) => s.segmento === "Campeões")!;
  const risco = segmentos.find((s) => s.segmento === "Em risco")!;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de CRM</h1>
        <p className="text-sm text-muted-foreground">Segmentação RFM da base ativa de clientes</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">Base Total</p>
                <p className="text-xl font-semibold">{num(totalClientes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success"><Heart className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">Campeões</p>
                <p className="text-xl font-semibold">{num(campeoes.clientes)} <span className="text-xs text-muted-foreground">({((campeoes.clientes/totalClientes)*100).toFixed(1)}%)</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/15 text-destructive"><AlertTriangle className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">Em risco</p>
                <p className="text-xl font-semibold">{num(risco.clientes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20 text-warning-foreground"><Sparkles className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase text-muted-foreground">Receita CRM</p>
                <p className="text-xl font-semibold">{brl(totalReceita)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {segmentos.map((s) => (
          <Card key={s.segmento} className="overflow-hidden">
            <div className="h-1" style={{ background: s.cor }} />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{s.segmento}</CardTitle>
                <Badge variant="outline">{((s.clientes / totalClientes) * 100).toFixed(1)}%</Badge>
              </div>
              <CardDescription>{s.frequencia}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Clientes</span>
                <span className="text-sm font-medium">{num(s.clientes)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Receita</span>
                <span className="text-sm font-medium">{brl(s.receita)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Ticket Médio</span>
                <span className="text-sm font-medium">{brl(s.ticketMedio)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receita por Segmento</CardTitle>
            <CardDescription>Onde está concentrada a receita</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentos}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="segmento" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} formatter={(v: number) => brl(v)} />
                <Bar dataKey="receita" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aquisição vs Retenção</CardTitle>
            <CardDescription>Novos clientes e retidos por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coortes}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="novos" name="Novos" stroke="var(--color-chart-2)" strokeWidth={2} />
                <Line type="monotone" dataKey="retidos" name="Retidos" stroke="var(--color-chart-4)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Segmentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segmento</TableHead>
                <TableHead className="text-right">Clientes</TableHead>
                <TableHead className="text-right">% Base</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Ticket Médio</TableHead>
                <TableHead>Frequência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentos.map((s) => (
                <TableRow key={s.segmento}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.cor }} />
                      <span className="font-medium">{s.segmento}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{num(s.clientes)}</TableCell>
                  <TableCell className="text-right">{((s.clientes / totalClientes) * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-medium">{brl(s.receita)}</TableCell>
                  <TableCell className="text-right">{brl(s.ticketMedio)}</TableCell>
                  <TableCell className="text-muted-foreground">{s.frequencia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}