import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface InterrogationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suspectName: string;
  suspectRole: string;
  messages: Message[];
  questionsRemaining: number;
  onQuestionAsked: (question: string, answer: string) => void;
}

export const InterrogationDialog = ({
  open,
  onOpenChange,
  suspectName,
  suspectRole,
  messages,
  questionsRemaining,
  onQuestionAsked,
}: InterrogationDialogProps) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || questionsRemaining === 0 || isLoading) return;

    setIsLoading(true);
    const userQuestion = question.trim();
    setQuestion("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/interrogate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            suspectName,
            suspectRole,
            question: userQuestion,
            conversationHistory: messages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      onQuestionAsked(userQuestion, data.answer);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get suspect response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            Interrogating: {suspectName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{suspectRole}</p>
          <p className="text-sm text-primary">
            {questionsRemaining} questions remaining
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-secondary/30 rounded-lg">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground border border-border"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-foreground p-3 rounded-lg border border-border">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-border">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
            disabled={questionsRemaining === 0 || isLoading}
            className="flex-1 bg-secondary border-border text-foreground"
          />
          <Button
            type="submit"
            disabled={!question.trim() || questionsRemaining === 0 || isLoading}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Ask
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
