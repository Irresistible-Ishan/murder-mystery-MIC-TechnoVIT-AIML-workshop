import { CaseHeader } from "@/components/CaseHeader";
import { VictimProfile } from "@/components/VictimProfile";
import { CrimeScene } from "@/components/CrimeScene";
import { SuspectCard } from "@/components/SuspectCard";
import detectiveDesk from "@/assets/detective-desk.jpg";

const Index = () => {
  const suspects = [
    {
      name: "Priya Sharma",
      role: "Art Dealer & Rival",
      motive: "Ashwin sabotaged her gallery opening, costing her investors and reputation",
      alibi: "Claims she was at a charity auction until midnight—witnesses are shaky",
      suspicionLevel: "high" as const,
    },
    {
      name: "Maya Kapoor",
      role: "Estranged Wife",
      motive: "Bitter divorce proceedings; Ashwin threatened to cut her out of his will entirely",
      alibi: "Says she was home alone—no one can confirm",
      suspicionLevel: "high" as const,
    },
    {
      name: "Dr. Vikram Desai",
      role: "Occult Expert & Friend",
      motive: "Ashwin borrowed rare manuscripts and refused to return them",
      alibi: "At university library researching—librarian confirms seeing him, but timing is unclear",
      suspicionLevel: "medium" as const,
    },
    {
      name: "Rajesh Kumar",
      role: "Business Partner",
      motive: "Financial disputes over art acquisitions; Ashwin accused him of embezzlement",
      alibi: "Dinner with clients at upscale restaurant—multiple witnesses, solid timeline",
      suspicionLevel: "low" as const,
    },
  ];

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

        {/* Suspects */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Primary Suspects</h2>
          <p className="text-muted-foreground mb-6">Each with motive, means, and questionable alibis</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suspects.map((suspect, idx) => (
            <SuspectCard key={idx} {...suspect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
