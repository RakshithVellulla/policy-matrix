import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_summary(previous_text: str, updated_text: str) -> str:
    # Limit the amount of text sent to Gemini
    previous_text = previous_text[:5000]
    updated_text = updated_text[:5000]

    prompt = f"""
You are a Senior Healthcare Policy Analyst.

Compare the following healthcare policy documents.

Previous Policy:
{previous_text}

Updated Policy:
{updated_text}

Provide your response in the following format.

Executive Summary

Write 2-3 short sentences describing the overall update.

Key Changes

- List exactly 5 important changes.

Business Impact

- List exactly 3 business impacts.

Recommendation

Write 1-2 short sentences with recommendations.

Rules:
- Do not use Markdown (** or #).
- Keep the response under 250 words.
- Use simple professional language.
"""

    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        return f"AI Summary could not be generated.\n\nReason: {str(e)}"