import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Suspect {
  id: string;
  name: string;
  role: string;
}

interface AccusationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suspects: Suspect[];
  onAccuse: (suspectId: string) => void;
}

export const AccusationDialog = ({ open, onOpenChange, suspects, onAccuse }: AccusationDialogProps) => {
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = (suspectId: string) => {
    setSelectedSuspect(suspectId);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (selectedSuspect) {
      onAccuse(selectedSuspect);
    }
  };

  const handleBack = () => {
    setShowConfirm(false);
    setSelectedSuspect(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-accent" />
            Make Your Accusation
          </DialogTitle>
        </DialogHeader>

        {!showConfirm ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Choose carefully. Once you accuse someone, the case will be closed.
            </p>
            <div className="grid gap-3">
              {suspects.map((suspect) => (
                <Button
                  key={suspect.id}
                  variant="outline"
                  className="justify-start h-auto p-4 text-left hover:bg-secondary"
                  onClick={() => handleSelect(suspect.id)}
                >
                  <div>
                    <p className="font-bold text-foreground">{suspect.name}</p>
                    <p className="text-sm text-muted-foreground">{suspect.role}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-foreground font-semibold mb-2">You are about to accuse:</p>
              <p className="text-xl text-foreground">
                {suspects.find((s) => s.id === selectedSuspect)?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {suspects.find((s) => s.id === selectedSuspect)?.role}
              </p>
            </div>
            <p className="text-destructive text-sm">
              ⚠️ This action cannot be undone. Are you certain?
            </p>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          {!showConfirm ? (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button variant="destructive" onClick={handleConfirm}>
                Confirm Accusation
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
