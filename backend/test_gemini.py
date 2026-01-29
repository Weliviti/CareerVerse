import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_gemini():
    # Load API Key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in environment variables.")
        return

    # Configure Gemini
    genai.configure(api_key=api_key)

    try:
        # Read the prompt file
        current_dir = os.path.dirname(os.path.abspath(__file__))
        prompt_path = os.path.join(current_dir, "prompts", "test_prompt.txt")
        
        with open(prompt_path, "r") as file:
            prompt_template = file.read()

        # Replace placeholder
        prompt = prompt_template.replace("{career}", "Software Engineering")
        
        print(f"Sending prompt: {prompt}")
        print("-" * 20)

        # Initialize model
        model = genai.GenerativeModel('gemini-2.0-flash')

        # Generate response
        response = model.generate_content(prompt)
        
        print("Response from Gemini:")
        print(response.text)
        print("-" * 20)
        
        # Print token usage if available
        if response.usage_metadata:
            print(f"Prompt Token Count: {response.usage_metadata.prompt_token_count}")
            print(f"Candidates Token Count: {response.usage_metadata.candidates_token_count}")
            print(f"Total Token Count: {response.usage_metadata.total_token_count}")
        else:
            print("Token usage metadata not found in response.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_gemini()
