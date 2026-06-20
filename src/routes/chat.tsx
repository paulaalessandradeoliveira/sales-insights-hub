import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Sparkles, TrendingUp, Users, Package, MapPin } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Agente IA — Retail Insights" },
      { name: "description", content: "Converse com o agente de IA sobre vendas e clientes." },
    ],
  }),
  component: ChatPage,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const sugestoes = [
  { icon: TrendingUp, text: "Qual regional está abaixo da meta este mês?" },
  { icon: Package, text: "Quais os 5 produtos mais vendidos no último trimestre?" },
  { icon: Users, text: "Quantos clientes estão em risco de churn?" },
  { icon: MapPin, text: "Compare receita da loja Paulista vs Barra" },
];

// Respostas simuladas — substituir por chamada real ao backend de IA
function mockResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("meta") || p.includes("regional"))
    return "Atualmente **Centro-Oeste (91%)** e **Sul (93%)** estão abaixo da meta. Sudeste lidera com 108% e Nordeste com 111%. Sugiro reforçar o time do Centro-Oeste com a campanha sazonal antes do fim do mês.";
  if (p.includes("produto") || p.includes("vendido"))
    return "Top 5 do trimestre:\n\n1. **Tênis Runner Pro** — R$ 412.800\n2. **Jaqueta Urban** — R$ 358.200\n3. **Mochila Trek 30L** — R$ 287.400\n4. **Camiseta Essential** — R$ 241.500\n5. **Boné Classic** — R$ 178.900\n\nVestuário é a categoria com maior receita absoluta.";
  if (p.includes("churn") || p.includes("risco"))
    return "Temos **1.382 clientes em risco** (14,7% da base ativa), representando R$ 412 mil em receita histórica. Recomendo uma campanha de reativação com cupom personalizado nas próximas 2 semanas.";
  if (p.includes("loja") || p.includes("paulista") || p.includes("barra"))
    return "**SP - Paulista** (Ana Beatriz): R$ 184.200 em 612 pedidos.\n**RJ - Barra** (Lucas Pereira): R$ 162.800 em 540 pedidos.\n\nPaulista lidera em receita (+13%) e em ticket médio (R$ 301 vs R$ 301). Performance bem equilibrada.";
  return "Posso ajudar com análises de vendas, performance regional, segmentação de clientes e desempenho do catálogo. Pergunte algo específico, por exemplo: 'Qual produto teve maior crescimento em novembro?'";
}

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply: Msg = { id: crypto.randomUUID(), role: "assistant", content: mockResponse(content) };
      setMessages((m) => [...m, reply]);
      setLoading(false);
      inputRef.current?.focus();
    }, 900);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Agente de Vendas IA</h1>
            <p className="text-xs text-muted-foreground">Pergunte sobre vendas, clientes, produtos ou regionais</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="space-y-6 py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}>
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Como posso ajudar?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Comece com uma das sugestões abaixo</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {sugestoes.map((s) => (
                  <button key={s.text} onClick={() => send(s.text)} className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
                    <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback style={{ background: "var(--gradient-primary)" }} className="text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={m.role === "user"
                ? "max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground"
                : "max-w-[85%] text-foreground"}>
                {m.content.split("\n").map((line, i) => (
                  <p key={i} className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback style={{ background: "var(--gradient-primary)" }} className="text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1.5 pt-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-card px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <Card className="flex items-end gap-2 p-2 shadow-[var(--shadow-card)]">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Pergunte algo sobre vendas, clientes ou produtos..."
              className="min-h-[44px] max-h-40 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button size="icon" onClick={() => send(input)} disabled={!input.trim() || loading} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </Card>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Respostas simuladas — conecte o backend de IA para produção
          </p>
        </div>
      </div>
    </div>
  );
}