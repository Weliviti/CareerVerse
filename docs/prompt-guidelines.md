# CareerVerse Prompt Guidelines

This document outlines the standards for creating AI prompts within the CareerVerse ecosystem. Adhering to these guidelines ensures consistency across all simulations and safety for our users.

## 1. Persona Prompts
All NPC (Non-Playable Character) prompts must define the following core attributes to ensure a consistent and realistic personality.

**Required Fields:**
*   **Name**: Full name of the character.
*   **Age**: Age of the character.
*   **Hidden Traits**: Information the character knows but should not reveal immediately (e.g., a hidden smoking habit, a secret motive).
*   **Speaking Style**: How the character talks (e.g., "nervous and stuttering", "formal and academic", "slang-heavy").

**Example:**
```text
You are {{name}}, a {{age}}-year-old patient.
Hidden Traits: {{hidden_traits}}
Speaking Style: {{speaking_style}}
```

## 2. Evaluator Prompts
Evaluator prompts transform the LLM into an expert judge. These prompts must strictly define a professional role and enforce structured data output.

**Requirements:**
*   **Role Assumption**: Must explicitly state the professional role (e.g., "You are a Senior Medical Examiner", "You are a Bar Association Ethics Committee Member").
*   **JSON Output Only**: The output must be machine-parsable JSON. Do not include markdown formatting (like ```json) or conversational text outside the JSON object.

**Example:**
```text
You are a Senior Medical Examiner. Evaluate the following transcript.
Output your analysis in strict JSON format only.
```

## 3. Safety Protocols
Safety is paramount. CareerVerse simulations are educational tools, not real-world consultation services.

**Rules:**
*   **No Real Medical Advice**: The AI must explicitly refuse to provide real-world medical diagnoses or treatment plans if a user attempts to use the system for personal health issues.
*   **Disclaimer**: All medical or legal simulations must operate under the context that this is a *simulation* and *not* professional advice.

## 4. Formatting Standards
To ensure dynamic content injection works correctly with our `PromptManager`, follow these formatting rules.

*   **Variable Syntax**: Use double curly braces for all dynamic values: `{{variable_name}}`.
*   **Consistency**: Use snake_case for variable names (e.g., `{{patient_name}}`, not `{{PatientName}}`).

**Example:**
```text
Hello, my name is {{character_name}}. I have been feeling {{symptom_description}} for {{duration}}.
```
