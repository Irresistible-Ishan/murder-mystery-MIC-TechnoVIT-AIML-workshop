import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SuspectCardProps {
  name: string;
  role: string;
  motive: string;
  alibi: string;
  suspicionLevel: "low" | "medium" | "high";
}

export const SuspectCard = ({ name, role, motive, alibi, suspicionLevel }: SuspectCardProps) => {
  const suspicionColors = {
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Card className="bg-card border-border shadow-[0_10px_40px_-10px_hsl(0_0%_0%_/_0.6)] hover:shadow-[0_0_30px_hsl(40_85%_60%_/_0.2)] transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
            <p className="text-sm text-primary">{role}</p>
          </div>
          <Badge variant="outline" className={suspicionColors[suspicionLevel]}>
            {suspicionLevel.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Motive</p>
            <p className="text-sm text-foreground">{motive}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Alibi</p>
            <p className="text-sm text-foreground">{alibi}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
