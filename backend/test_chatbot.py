import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from chat_bot import generate_combat_response
def test_chatbot():
    print("🥊 Initializing Combat AI Test Suite...")
    test_questions = [
        "Tell me about Islam Makhachev",
        "What is Ilia Topuria's record?",
        "Can you explain what a jab is?",
        "How is Gordon Ryan doing?",
        "Tell me about Mike Tyson",
        "Explain MMA to me",
    ]
    for q in test_questions:
        print(f"\n🗣️ User: {q}")
        response = generate_combat_response(q, history=[])
        print(f"🤖 Bot: {response}")
if __name__ == "__main__":
    test_chatbot()