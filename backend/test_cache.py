"""Unit tests for SimpleTTLCache."""
import time
import unittest
from cache import SimpleTTLCache

class TestSimpleTTLCache(unittest.TestCase):
    def setUp(self):
        self.cache = SimpleTTLCache(default_ttl=2)

    def test_set_and_get(self):
        self.cache.set("fighter:1", {"name": "Islam Makhachev"})
        data = self.cache.get("fighter:1")
        self.assertIsNotNone(data)
        self.assertEqual(data["name"], "Islam Makhachev")

    def test_cache_miss(self):
        self.assertIsNone(self.cache.get("nonexistent_key"))

    def test_cache_expiration(self):
        self.cache.set("quick_key", "value", ttl=1)
        self.assertEqual(self.cache.get("quick_key"), "value")
        time.sleep(1.2)
        self.assertIsNone(self.cache.get("quick_key"))

    def test_clear_cache(self):
        self.cache.set("k1", "v1")
        self.cache.set("k2", "v2")
        self.assertEqual(self.cache.size(), 2)
        self.cache.clear()
        self.assertEqual(self.cache.size(), 0)

if __name__ == "__main__":
    unittest.main()
