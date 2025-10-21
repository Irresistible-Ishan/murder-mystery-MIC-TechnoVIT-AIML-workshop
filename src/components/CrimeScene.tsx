import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Lock, Wind, Book, Feather } from "lucide-react";

export const CrimeScene = () => {
  const evidence = [
    {
      icon: Sword,
      label: "The Weapon",
      detail: "Antique jewel-encrusted letter opener found standing upright in blood pool—a deliberate, chilling arrangement",
    },
    {
      icon: Lock,
      label: "The Lock",
      detail: "Study door securely locked from the inside",
    },
    {
      icon: Wind,
      label: "The Window",
      detail: "Second-floor window cracked open with three long scratches on exterior glass—too high to reach easily",
    },
    {
      icon: Book,
      label: "Missing Item",
      detail: "Leather-bound journal containing Ashwin's darkest secrets and ritual sketches—vanished",
    },
    {
      icon: Feather,
      label: "Calling Card",
      detail: "Single white feather pinned beneath collar—species unknown to local area",
    },
  ];

  return (
    <Card className="bg-card border-border shadow-[0_10px_40px_-10px_hsl(0_0%_0%_/_0.6)]">
      <CardHeader>
        <CardTitle className="text-primary">Crime Scene Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/50 p-4 rounded-lg border border-border">
          <p className="text-sm font-semibold text-accent mb-2">CAUSE OF DEATH</p>
          <p className="text-foreground">Single, precise stab wound to the chest</p>
        </div>

        <div className="space-y-4">
          {evidence.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex gap-3 p-3 bg-secondary/30 rounded-lg border border-border/50">
                <div className="mt-1">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 text-xs">{item.label}</Badge>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
