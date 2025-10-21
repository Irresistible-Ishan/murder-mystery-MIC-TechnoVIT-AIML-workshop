import { useState } from "react";
import { CaseHeader } from "@/components/CaseHeader";
import { VictimProfile } from "@/components/VictimProfile";
import { CrimeScene } from "@/components/CrimeScene";
import { SuspectCard } from "@/components/SuspectCard";
import { InterrogationDialog } from "@/components/InterrogationDialog";
import { AccusationDialog } from "@/components/AccusationDialog";
import { VerdictDialog } from "@/components/VerdictDialog";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import detectiveDesk from "@/assets/detective-desk.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Suspect {
  id: string;
  name: string;
  role: string;
  background: string;
  questionsRemaining: number;
}

const Index = () => {
  const [suspects, setSuspects] = useState<Suspect[]>([
    {
      id: "anjali",
      name: "Anjali Sinha",
      role: "Volatile Fiancée",
      background: "Set to inherit a fortune but lived in constant fear. Financial desperation coupled with an intense need to escape the psychological control Ashwin exerted over her, which she believes was linked to a dark artifact he possessed.",
      questionsRemaining: 3,
    },
    {
      id: "rohan",
      name: "Rohan Varma",
      role: "Struggling Artist",
      background: "Driven by long-simmering vengeance. Ashwin had ruined his career years ago by stealing and discrediting his art. Seeks to retrieve a specific, powerful artwork he believes is cursed and responsible for his misfortunes.",
      questionsRemaining: 3,
    },
    {
      id: "arjun",
      name: "Arjun Mehra",
      role: "Duplicitous Business Partner",
      background: "On the brink of ruin. Ashwin was about to expose Arjun's massive financial fraud. Fears Ashwin's ties to a secret, blacklisting society meant exposure would lead to a fate worse than prison.",
      questionsRemaining: 3,
    },
    {
      id: "priya",
      name: "Priya Deshpande",
      role: "Secretive Housekeeper",
      background: "Harbors a deep, silent motive with intimate knowledge of the house and its secrets, making her a potential key to the missing journal. Years of blackmail by Ashwin over a tragic secret from her past made her desperate for freedom.",
      questionsRemaining: 3,
    },
  ]);

  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [showAccusation, setShowAccusation] = useState(false);
  const [showVerdict, setShowVerdict] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [accusedSuspect, setAccusedSuspect] = useState("");
  
  // The correct suspect - in a real game, this would be determined by the backend
  const correctSuspectId = "priya";

  const handleInterrogate = (suspect: Suspect) => {
    if (suspect.questionsRemaining > 0) {
      setSelectedSuspect(suspect);
    }
  };

  const handleQuestionAsked = (question: string, answer: string) => {
    if (!selectedSuspect) return;

    const newMessages = [
      ...(conversations[selectedSuspect.id] || []),
      { role: "user" as const, content: question },
      { role: "assistant" as const, content: answer },
    ];

    setConversations((prev) => ({
      ...prev,
      [selectedSuspect.id]: newMessages,
    }));

    setSuspects((prev) =>
      prev.map((s) =>
        s.id === selectedSuspect.id
          ? { ...s, questionsRemaining: s.questionsRemaining - 1 }
          : s
      )
    );
  };

  const handleAccuse = (suspectId: string) => {
    const suspect = suspects.find((s) => s.id === suspectId);
    if (!suspect) return;

    setAccusedSuspect(suspect.name);
    setGameWon(suspectId === correctSuspectId);
    setShowAccusation(false);
    setShowVerdict(true);
  };

  const handlePlayAgain = () => {
    setSuspects((prev) => prev.map((s) => ({ ...s, questionsRemaining: 3 })));
    setConversations({});
    setSelectedSuspect(null);
    setShowVerdict(false);
    setGameWon(false);
    setAccusedSuspect("");
  };

  const totalQuestionsRemaining = suspects.reduce(
    (sum, s) => sum + s.questionsRemaining,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        <img
          src={detectiveDesk}
          alt="Detective's desk"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-16">
        <CaseHeader />

        {/* Victim & Crime Scene */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <VictimProfile />
          <CrimeScene />
        </div>

        {/* Investigation Status */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Primary Suspects</h2>
            <p className="text-muted-foreground">
              {totalQuestionsRemaining} total questions remaining
            </p>
          </div>
          <Button
            size="lg"
            variant="destructive"
            className="gap-2"
            onClick={() => setShowAccusation(true)}
            disabled={totalQuestionsRemaining === suspects.length * 3}
          >
            <Gavel className="w-5 h-5" />
            Make Accusation
          </Button>
        </div>

        {/* Suspects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {suspects.map((suspect) => (
            <SuspectCard
              key={suspect.id}
              {...suspect}
              onInterrogate={() => handleInterrogate(suspect)}
            />
          ))}
        </div>
      </div>

      {/* Dialogs */}
      {selectedSuspect && (
        <InterrogationDialog
          open={!!selectedSuspect}
          onOpenChange={(open) => !open && setSelectedSuspect(null)}
          suspectName={selectedSuspect.name}
          suspectRole={selectedSuspect.role}
          messages={conversations[selectedSuspect.id] || []}
          questionsRemaining={selectedSuspect.questionsRemaining}
          onQuestionAsked={handleQuestionAsked}
        />
      )}

      <AccusationDialog
        open={showAccusation}
        onOpenChange={setShowAccusation}
        suspects={suspects}
        onAccuse={handleAccuse}
      />

      <VerdictDialog
        open={showVerdict}
        won={gameWon}
        accusedSuspect={accusedSuspect}
        correctSuspect={suspects.find((s) => s.id === correctSuspectId)?.name || ""}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
};

export default Index;
