import requests
from typing import List, Dict
import time
_fights_cache = {
    "data": [],
    "last_updated": 0
}
CACHE_DURATION = 3600
EXCLUDE_KEYWORDS = [
    'rules', 'interview', 'promo', 'preview', 'press', 'conference', 
    'faceoff', 'vlog', 'training', 'workout', 'weigh-in', 'opinion',
    'breakdown', 'podcast', 'explained', 'hype', 'trailer'
]
def fetch_dailymotion_fights(sport_query: str, sport_id: str) -> List[Dict]:
    try:
        url = f"https://api.dailymotion.com/videos?search={sport_query}&fields=id,title,thumbnail_720_url,created_time,owner.screenname,description,duration&limit=20&sort=relevance"
        response = requests.get(url, timeout=10)
        data = response.json()
        fights = []
        if "list" in data:
            for item in data["list"]:
                title_lower = item['title'].lower()
                if item.get('duration', 0) < 120:
                    continue
                if any(kw in title_lower for kw in EXCLUDE_KEYWORDS):
                    continue
                include_hints = ['fight', 'match', 'highlights', 'ko', 'knockout', 'submission', 'vs', 'round']
                if not any(hint in title_lower for hint in include_hints):
                    continue
                readable_date = time.strftime('%b %d, %Y', time.gmtime(item['created_time']))
                fights.append({
                    "id": f"dm_{item['id']}",
                    "sport": sport_id,
                    "title": item['title'],
                    "event": item.get('owner.screenname', 'Combat Event'),
                    "date": readable_date,
                    "source": "dailymotion",
                    "videoId": item['id'],
                    "description": (item.get('description') or "Iconic match highlights from the world of combat sports.")[:150] + "...",
                    "thumbnail": item.get('thumbnail_720_url') or f"https://www.dailymotion.com/thumbnail/video/{item['id']}"
                })
                if len(fights) >= 6:
                    break
        return fights
    except Exception as e:
        print(f"Error fetching Dailymotion fights for {sport_id}: {e}")
        return []
def get_famous_fights() -> List[Dict]:
    global _fights_cache
    current_time = time.time()
    if _fights_cache["data"] and (current_time - _fights_cache["last_updated"] < CACHE_DURATION):
        return _fights_cache["data"]
    all_fights = []
    sport_queries = [
        ("UFC Knockouts Highlights Full Fight", "mma"),
        ("Legendary Boxing Matches Full Highlights", "boxing"),
        ("GLORY Kickboxing Best Knockouts", "kickboxing"),
        ("ADCC Jiu Jitsu Final Match", "bjj"),
        ("Olympic Wrestling Final Match Full", "wrestling")
    ]
    for query, sport_id in sport_queries:
        sport_fights = fetch_dailymotion_fights(query, sport_id)
        all_fights.extend(sport_fights)
    if all_fights:
        _fights_cache["data"] = all_fights
        _fights_cache["last_updated"] = current_time
        return all_fights
    return [
        {
            "id": "dm_x8mv5g6",
            "sport": "mma",
            "title": "Khabib Nurmagomedov vs Conor McGregor Highlights",
            "event": "UFC 229",
            "date": "Oct 6, 2018",
            "source": "dailymotion",
            "videoId": "x8mv5g6",
            "description": "The biggest fight in MMA history. A grudge match for the ages.",
            "thumbnail": "https://www.dailymotion.com/thumbnail/video/x8mv5g6"
        },
        {
            "id": "dm_x8mf3sk",
            "sport": "boxing",
            "title": "Mike Tyson vs Roy Jones Jr Highlights",
            "event": "Legends Return",
            "date": "Nov 28, 2020",
            "source": "dailymotion",
            "videoId": "x8mf3sk",
            "description": "The return of the Iron Mike Tyson in an exhibition of legends.",
            "thumbnail": "https://www.dailymotion.com/thumbnail/video/x8mf3sk"
        }
    ]