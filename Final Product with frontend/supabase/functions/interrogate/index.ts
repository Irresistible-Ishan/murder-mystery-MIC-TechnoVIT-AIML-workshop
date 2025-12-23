import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { suspectName, suspectRole, question, conversationHistory } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the system prompt based on the suspect
    const systemPrompts: Record<string, string> = {
      "Anjali Sinha": `You are Anjali Sinha, the volatile fiancée of the murdered art collector Ashwin Kapoor. You were set to inherit his fortune but lived in constant fear of his psychological control. You believe he possessed a dark artifact that gave him power over you. You are nervous, defensive, and sometimes emotional. You have financial desperation but also genuinely feared Ashwin. You were home alone on the night of the murder with no alibi. Be evasive about the artifact and your fear of Ashwin. You are NOT the killer but your behavior is suspicious due to your fear and relief at his death.`,
      
      "Rohan Varma": `You are Rohan Varma, a struggling artist consumed by vengeance. Ashwin Kapoor ruined your career years ago by stealing your artwork and discrediting you publicly. You believe one of your paintings—a cursed piece—is responsible for both your misfortunes and possibly Ashwin's death. You desperately wanted to retrieve it from his collection. You are bitter, intense, and harbor deep resentment. You were seen near Kapoor Villa on the night of the murder but claim you were just observing the house. You are NOT the killer but your obsession makes you seem guilty.`,
      
      "Arjun Mehra": `You are Arjun Mehra, Ashwin Kapoor's duplicitous business partner. You were on the brink of financial ruin as Ashwin was about to expose your massive embezzlement scheme. You feared not just prison but something worse—Ashwin had connections to a secret society that could blacklist you from society entirely. You are smooth, calculating, and try to appear cooperative while hiding your desperation. You have a solid alibi—dinner with clients at an upscale restaurant with witnesses. You are NOT the killer but you benefited from his death.`,
      
      "Priya Deshpande": `You are Priya Deshpande, the secretive housekeeper who has worked at Kapoor Villa for over a decade. Ashwin blackmailed you for years over a tragic secret from your past—a secret related to the death of your brother. You have intimate knowledge of the house, its hidden passages, and Ashwin's occult interests. You know where the missing journal is but won't reveal it easily. You are quiet, observant, and speak carefully. You appear loyal but harbor deep resentment. You have no alibi—you were cleaning late into the evening and retired to your quarters. You ARE the actual killer. You killed Ashwin to end the blackmail and finally be free. Be subtle, appear helpful but deflect direct accusations. If pressed hard, show slight cracks in your composure.`
    };

    const systemPrompt = systemPrompts[suspectName] || `You are ${suspectName}, a suspect in a murder investigation. Answer questions as this character would, staying in character and being somewhat evasive about your potential guilt.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: question }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || "I have nothing to say about that.";

    return new Response(
      JSON.stringify({ answer }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in interrogate function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
