import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
from constants import SPORTS_LIST
from skills import SKILLS_LIBRARY
from external_apis import LEGEND_RECORDS
MODEL_DIR = os.path.join(os.path.dirname(__file__), "..", "model")
_tokenizer = None
_model = None
STRATEGIC_INTEL = {
    "usyk": "Oleksandr Usyk is the technical pinnacle of boxing. A southpaw with master-level footwork and stamina, he controls the center of the ring and excels at high-volume tactical striking.",
    "islam": "Islam Makhachev is the current UFC P4P leader. He uses a specialized chain-wrestling system and high-pressure Sambo to localize strikers before securing dominant submissions.",
    "punch": "Punches are the core of striking. This project covers the Jab, Cross, Lead Hook, and Uppercut. In boxing and MMA, punching is used for both scoring and setting up power shots.",
    "kick": "Kicks are powerful long-range strikes. Our library includes the Roundhouse Kick and the Teep (Front Kick), commonly used in Muay Thai and Kickboxing.",
    "grapple": "Grappling involves controlling the opponent through clinching or ground work. This project highlights Wrestling (Takedowns) and BJJ (Submissions like Armbars and Chokes).",
    "submission": "Submissions are techniques used to force an opponent to tap out. We cover BJJ essentials like the Armbar, Triangle Choke, and Rear Naked Choke.",
    "striking": "Striking refers to techniques involving punches, kicks, elbows, and knees. It's fundamental in sports like Boxing, Muay Thai, and Kickboxing.",
    "takedown": "Takedowns are techniques used to bring an opponent from a standing position to the ground, common in Wrestling and MMA.",
    "clinch": "The clinch is a standing grappling position where fighters hold each other, often used to control, strike, or set up takedowns.",
    "ground and pound": "Ground and pound is an MMA strategy where a fighter on top delivers strikes to an opponent on the ground.",
    "guard": "Guard is a ground fighting position in BJJ and MMA where one fighter controls the other with their legs from the bottom.",
    "mount": "Mount is a dominant ground position where one fighter sits on the torso of their opponent, facing them.",
}
for sport in SPORTS_LIST:
    STRATEGIC_INTEL[sport['id'].lower()] = f"{sport['fullName']}: {sport['description']}"
for skill in SKILLS_LIBRARY:
    STRATEGIC_INTEL[skill['id'].lower()] = f"{skill['name']} ({skill['sport']}): {skill['description']}"
    STRATEGIC_INTEL[skill['name'].lower()] = f"{skill['name']} ({skill['sport']}): {skill['description']}"
for legend_name, stats in LEGEND_RECORDS.items():
    wins = stats.get("wins", 0)
    losses = stats.get("losses", 0)
    draws = stats.get("draws", 0)
    record = f"{wins} Wins, {losses} Losses"
    if draws > 0: record += f", {draws} Draws"
    desc = f"{legend_name} is a verified combat sports legend with a professional record of {record}."
    STRATEGIC_INTEL[legend_name.lower()] = desc
    parts = legend_name.split()
    if len(parts) > 1:
        last_name = parts[-1].lower()
        if last_name not in STRATEGIC_INTEL:
            STRATEGIC_INTEL[last_name] = desc
def get_project_context():
    sports_str = ", ".join([s['name'] for s in SPORTS_LIST])
    skills_str = ", ".join([s['name'] for s in SKILLS_LIBRARY])
    return f"This platform covers combat sports like {sports_str} and key skills like {skills_str}."
def load_real_model():
    global _tokenizer, _model
    if _model is not None:
        return True
    try:
        from transformers import AutoTokenizer, AutoModelForCausalLM
        from peft import PeftModel
        print(f"Attempting to load fine-tuned model from {MODEL_DIR}...")
        adapter_path = MODEL_DIR
        import psutil
        ram_available = psutil.virtual_memory().available / (1024**3)
        if ram_available < 6:
             print(f"Warning: Only {ram_available:.2f} GB RAM available. Loading may fail.")
        base_model_name = "unsloth/llama-3-8b-bnb-4bit"
        _tokenizer = AutoTokenizer.from_pretrained(adapter_path)
        _model = AutoModelForCausalLM.from_pretrained(
            base_model_name,
            load_in_4bit=True,
            device_map="auto" if torch.cuda.is_available() else "cpu",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
        )
        _model = PeftModel.from_pretrained(_model, adapter_path)
        return True
    except Exception as e:
        print(f"Model load failed: {str(e)}")
        return False
def generate_combat_response(prompt: str, history: list = None) -> str:
    import psutil
    ram_available = psutil.virtual_memory().available / (1024**3)
    if not torch.cuda.is_available() and ram_available < 8:
        p_low = prompt.lower()
        for key, response in STRATEGIC_INTEL.items():
            if key in p_low:
                return response
        project_summary = get_project_context().strip()
        return f"I'm currently in 'Expert Fallback Mode' due to limited system resources ({ram_available:.2f}GB RAM available). {project_summary} To get more detailed information, please ask about a specific sport (e.g., 'MMA', 'Boxing') or a technique (e.g., 'Jab', 'Armbar', 'Takedown')."
    if load_real_model():
        project_info = get_project_context()
        system_prompt = f"You are a combat sports expert for this platform. {project_info} Answer the user's question accurately using this context when relevant."
        full_prompt = f"System: {system_prompt}\n"
        if history:
            for msg in history:
                role = "User" if msg["role"] == "user" else "Assistant"
                content = msg["content"] if isinstance(msg, dict) else msg.content
                full_prompt += f"{role}: {content}\n"
        full_prompt += f"User: {prompt}\nAssistant:"
        inputs = _tokenizer(full_prompt, return_tensors="pt").to(_model.device)
        with torch.no_grad():
            outputs = _model.generate(
                **inputs, 
                max_new_tokens=256,
                temperature=0.7,
                top_p=0.9,
                do_sample=True,
                pad_token_id=_tokenizer.eos_token_id
            )
        response = _tokenizer.decode(outputs[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
        return response.strip()
    return "The complex neural engine is unavailable. Ask me about combat sports techniques instead."
