"""Validation tests for Pydantic data models."""
import unittest
from schemas import FighterSchema, SportSchema, SkillSchema

class TestSchemas(unittest.TestCase):
    def test_valid_fighter_schema(self):
        f = FighterSchema(
            id=1,
            name="Jon Jones",
            sport="mma",
            wins=27,
            losses=1,
            draws=0,
            nickname="Bones",
            weightClass="Heavyweight"
        )
        self.assertEqual(f.name, "Jon Jones")
        self.assertEqual(f.wins, 27)

    def test_valid_sport_schema(self):
        s = SportSchema(
            id="boxing",
            name="Boxing",
            fullName="Professional Boxing",
            icon="🥊",
            color="#f39c12",
            gradient="linear-gradient(135deg, #f39c12, #e67e22)",
            description="The sweet science."
        )
        self.assertEqual(s.id, "boxing")

    def test_valid_skill_schema(self):
        sk = SkillSchema(
            id="armbar",
            name="Armbar",
            sport="bjj",
            category="Submission",
            difficulty="Advanced",
            description="Hyperextension of the elbow joint."
        )
        self.assertEqual(sk.difficulty, "Advanced")

if __name__ == "__main__":
    unittest.main()
