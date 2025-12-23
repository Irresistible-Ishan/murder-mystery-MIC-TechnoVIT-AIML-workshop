import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface VerdictDialogProps {
  open: boolean;
  won: boolean;
  accusedSuspect: string;
  correctSuspect: string;
  onPlayAgain: () => void;
}

export const VerdictDialog = ({ open, won, accusedSuspect, correctSuspect, onPlayAgain }: VerdictDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-foreground flex items-center justify-center gap-3">
            {won ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                Case Solved!
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-destructive" />
                Wrong Accusation
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {won ? (
            <div className="text-center space-y-3">
              <p className="text-lg text-foreground">
                Brilliant detective work! You correctly identified the killer.
              </p>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">The murderer was:</p>
                <p className="text-xl font-bold text-foreground">{accusedSuspect}</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-lg text-foreground">
                Your deduction was incorrect. The real killer got away.
              </p>
              <div className="space-y-2">
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">You accused:</p>
                  <p className="text-xl font-bold text-foreground">{accusedSuspect}</p>
                </div>
                <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">The real killer was:</p>
                  <p className="text-xl font-bold text-foreground">{correctSuspect}</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button onClick={onPlayAgain} size="lg" className="gap-2">
              Play Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
