import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface SuspectCardProps {
  name: string;
  role: string;
  background: string;
  questionsRemaining: number;
  onInterrogate: () => void;
}

export const SuspectCard = ({ name, role, background, questionsRemaining, onInterrogate }: SuspectCardProps) => {
  return (
    <Card className="bg-card border-border shadow-[0_10px_40px_-10px_hsl(0_0%_0%_/_0.6)] hover:shadow-[0_0_30px_hsl(40_85%_60%_/_0.2)] transition-all">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-primary mb-3">{role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{background}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Badge variant="outline" className="text-xs">
            {questionsRemaining} questions left
          </Badge>
          <Button 
            size="sm" 
            onClick={onInterrogate}
            disabled={questionsRemaining === 0}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Interrogate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
