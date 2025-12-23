# LLM-Driven Murder Mystery Game
**TechnoVIT 2025 – AIML Workshop (Microsoft Innovations Club)**

This repository documents the **core backend prototype, feasibility analysis, and technical exploration** behind an interactive murder mystery experience built to demonstrate **how Large Language Models (LLMs) can act as independent, role-bound agents**.

The project was developed for the **AIML Workshop at TechnoVIT 2025**, conducted by the **Microsoft Innovations Club (MIC)**.

---

## Project overview

The intent of this project was **educational and experimental**.

It was designed to help participants understand:
- How LLMs behave when given **strict roles and private memory**
- The effect of **prompt structure and context limits**
- How multiple LLM instances can simulate independent characters
- Practical constraints when building interactive LLM systems

This repository focuses on the **backend logic and feasibility**, which enabled the final interactive experience.

---

## My contribution (core work)

I was responsible for the **entire backend and feasibility layer**, including:

- Designing the multi-agent LLM architecture
- Implementing independent character memory
- Role-based prompting and constraint design
- Interrogation logic and attempt limits
- Feasibility observations and limitations
- Prototype implementation in Python
- Early technical documentation

The frontend/UI was later developed separately.  
This repository exists to clearly present the **original backend work**.

---

## How the system works (simplified)

- Each character is backed by a **separate LLM chat session**
- Characters receive:
  - Private system prompts
  - Individual memories
  - Role-specific behavior constraints
- One or more characters may secretly be the murderer
- Others may appear suspicious due to personality traits
- The player interrogates characters with limited attempts
- LLM responses evolve based on interrogation history

No fine-tuning or game engine was used — the system relies entirely on **prompting and observation**.

---

## Observations & feasibility notes

Key observations made during development:

- Prompt wording must remain **highly consistent**
- Small changes can cause characters to forget roles
- Context size must be controlled to avoid memory pollution
- Separate memory per character is essential for realism
- Innocent characters can appear guilty through behavior alone
- Rate limits and latency affect user experience

These constraints directly shaped the final prototype design.

## Repository structure

```text

├── final_fork/ # Final integrated version (with frontend)
├── original-backend/ # Original backend + feasibility work
│ ├── MIC_TechnoVIT_MurderMystery_Prototype.py
│ └── DOCUMENTATION_OF_MURDERMYSTERY_PROTOTYPE.md
├── README.md
└── LICENSE
```

The `backend_prototype` folder represents the **core technical foundation** of the project.

---

## Technologies used

### Backend / Prototype
- Python
- Google Generative AI (Gemma 27B)
- Prompt-driven multi-agent design

### Frontend (final product)
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

Frontend technologies are included here for completeness; this repository primarily focuses on backend logic and feasibility.

---

## Running the backend prototype

```bash
pip install google-generativeai
python MIC_TechnoVIT_MurderMystery_Prototype.py
```

### Educational disclaimer
- This project is: Intended to showcase LLM behavior, limits, and design trade-offs

## Acknowledgements
- Developed for Microsoft Innovations Club
- Presented at TechnoVIT 2025 – AIML Workshop

## Author : Ishan Mani Singh - CODE7X
