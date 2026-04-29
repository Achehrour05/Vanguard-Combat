"""Automated unit test suite for Vanguard Combat backend."""
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from constants import SPORTS_LIST
from fights import get_famous_fights
from skills import get_all_skills
from chat_bot import STRATEGIC_INTEL, generate_combat_response, get_project_context

class TestVanguardBackend(unittest.TestCase):
    def test_sports_list_structure(self):
        self.assertGreater(len(SPORTS_LIST), 0)
        expected_keys = {"id", "name", "fullName", "icon", "color", "gradient", "description"}
        for sport in SPORTS_LIST:
            self.assertTrue(expected_keys.issubset(sport.keys()), f"Missing keys in {sport}")

    def test_famous_fights_retrieval(self):
        fights = get_famous_fights()
        self.assertIsInstance(fights, list)
        self.assertGreater(len(fights), 0)
        expected_keys = {"id", "sport", "title", "description"}
        self.assertTrue(expected_keys.issubset(fights[0].keys()))

    def test_skills_library(self):
        skills = get_all_skills()
        self.assertIsInstance(skills, list)
        self.assertGreater(len(skills), 0)
        for skill in skills:
            self.assertIn("sport", skill)
            self.assertIn("name", skill)
            self.assertIn("description", skill)

    def test_chatbot_project_context(self):
        context = get_project_context()
        self.assertIsInstance(context, str)
        self.assertIn("MMA", context)
        self.assertIn("Boxing", context)

    def test_chatbot_intel_lookup(self):
        reply = generate_combat_response("Tell me about Usyk")
        self.assertIsInstance(reply, str)
        self.assertIn("Usyk", reply)

if __name__ == "__main__":
    unittest.main()
