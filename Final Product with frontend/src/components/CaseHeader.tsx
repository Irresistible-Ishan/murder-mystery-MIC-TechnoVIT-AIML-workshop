import { Badge } from "@/components/ui/badge";

export const CaseHeader = () => {
  return (
    <div className="relative overflow-hidden border-b border-border pb-8 mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="relative">
        <Badge variant="destructive" className="mb-4">ACTIVE INVESTIGATION</Badge>
        <h1 className="text-5xl font-bold mb-3 text-foreground">
          The Mystery of Ashwin Kapoor
        </h1>
        <p className="text-xl text-muted-foreground italic">The Collector's Last Night</p>
      </div>
    </div>
  );
};
