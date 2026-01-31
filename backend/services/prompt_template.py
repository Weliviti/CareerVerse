import os
import re
from typing import Dict, Any

class PromptManager:
    """
    Manages loading and formatting of prompt templates.
    """
    
    def __init__(self, prompts_dir: str = None):
        """
        Initialize PromptManager.
        
        Args:
            prompts_dir: Directory containing prompt templates. 
                         Defaults to 'backend/prompts' relative to project root 
                         or absolute path.
        """
        if prompts_dir:
            self.prompts_dir = prompts_dir
        else:
            # Default to backend/prompts relative to this file's location
            # This file is in backend/services/
            current_dir = os.path.dirname(os.path.abspath(__file__))
            self.prompts_dir = os.path.join(current_dir, "..", "prompts")

    def load_template(self, template_name: str, variables: Dict[str, Any]) -> str:
        """
        Load a template from a file and substitute variables.
        
        Args:
            template_name: Name of the template file (without .txt extension).
            variables: Dictionary of variables to substitute (e.g., {'name': 'John'}).
            
        Returns:
            The formatted prompt string.
            
        Raises:
            FileNotFoundError: If the template file does not exist.
        """
        # Ensure template name doesn't contain directory traversal attempts
        safe_name = os.path.basename(template_name) 
        file_path = os.path.join(self.prompts_dir, f"{safe_name}.txt")
        
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Prompt template '{safe_name}' not found at {file_path}")
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace {{variable}} with value
        # We perform multiple passes or use a regex to handle all variables
        for key, value in variables.items():
            # Simple replacement for {{key}}
            # Using simple string replace as requested for basic logic
            placeholder = f"{{{{{key}}}}}"
            content = content.replace(placeholder, str(value))
            
        return content.strip()
