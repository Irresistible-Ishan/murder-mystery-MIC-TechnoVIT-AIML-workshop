import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Clock, MapPin } from "lucide-react";

export const VictimProfile = () => {
  return (
    <Card className="bg-card border-border shadow-[0_10px_40px_-10px_hsl(0_0%_0%_/_0.6)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <User className="w-5 h-5" />
          The Victim
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Ashwin Kapoor</h3>
          <p className="text-muted-foreground">
            Renowned art collector whose ruthless business tactics matched his whispered occult interests. 
            Vast wealth, numerous enemies. Discovered dead Sunday morning in his locked study at Kapoor Villa.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-primary mt-1" />
            <div>
              <p className="text-sm font-semibold text-foreground">Time of Death</p>
              <p className="text-sm text-muted-foreground">10:00 PM - 11:30 PM<br/>Saturday night</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-1" />
            <div>
              <p className="text-sm font-semibold text-foreground">Location</p>
              <p className="text-sm text-muted-foreground">Private study<br/>Kapoor Villa</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
