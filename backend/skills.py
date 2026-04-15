import requests
import time
SKILLS_LIBRARY = [
    {"id": "jab", "name": "The Jab", "sport": "Boxing", "query": "how to throw a boxing jab perfect technique animation", "description": "The most important punch in boxing. A quick, straight punch thrown with the lead hand to measure distance, set up combinations, and distract the opponent."},
    {"id": "cross", "name": "The Cross", "sport": "Boxing", "query": "how to throw a straight right cross boxing technique", "description": "A powerful straight punch thrown with the rear hand, generating immense power through the rotation of the hips and shoulders."},
    {"id": "hook", "name": "Lead Hook", "sport": "Boxing", "query": "how to throw a left hook boxing tutorial", "description": "A devastating short-range punch thrown in a semi-circular motion. The knockout punch responsible for many famous finishes."},
    {"id": "uppercut", "name": "Uppercut", "sport": "Boxing", "query": "how to throw an uppercut boxing tutorial", "description": "An upward rising punch aimed at the opponent's chin or solar plexus, usually thrown from close range to bypass the guard."},
    {"id": "roundhouse", "name": "Roundhouse Kick", "sport": "Kickboxing", "query": "muay thai roundhouse kick technique tutorial", "description": "The most powerful strike in combat sports. A devastating swing of the leg like a baseball bat, targeting the opponent's legs, ribs, or head."},
    {"id": "teep", "name": "Teep (Front Kick)", "sport": "Kickboxing", "query": "muay thai teep front kick breakdown tutorial", "description": "The 'jab' of the legs. A push kick used to maintain distance, disrupt rhythm, or violently strike the opponent's midsection."},
    {"id": "knee", "name": "Plum Knee", "sport": "Kickboxing", "query": "muay thai knee strike clinch technique", "description": "A close-range strike utilizing the hard point of the knee, often thrown while controlling the opponent's head in the dreaded Thai Clinch."},
    {"id": "elbow", "name": "Cutting Elbow", "sport": "Kickboxing", "query": "muay thai horizontal elbow strike technique", "description": "A brutal, slashing strike with the point of the elbow, designed to cause severe cuts and end fights instantly from inside the pocket."},
    {"id": "double_leg", "name": "Double Leg Takedown", "sport": "Wrestling", "query": "wrestling double leg takedown technique", "description": "The quintessential wrestling takedown. Dropping levels, driving through the opponent's hips, and grabbing both legs to blast them to the mat."},
    {"id": "single_leg", "name": "Single Leg Takedown", "sport": "Wrestling", "query": "wrestling single leg takedown tutorial", "description": "Securing one of the opponent's legs, using leverage, head positioning, and sweeping motions to drag the opponent down."},
    {"id": "suplex", "name": "Belly-to-Back Suplex", "sport": "Wrestling", "query": "greco roman belly to back suplex technique throw", "description": "A high-amplitude, devastating throw where the attacker lifts the opponent from a rear waist-lock and arches backward, launching them over their head."},
    {"id": "armbar", "name": "Armbar", "sport": "BJJ", "query": "bjj armbar from guard technique", "description": "A joint lock that isolates the opponent's arm between the attacker's legs, applying tremendous leverage to hyperextend the elbow joint."},
    {"id": "triangle", "name": "Triangle Choke", "sport": "BJJ", "query": "bjj triangle choke technique breakdown", "description": "A blood choke utilizing the attacker's own legs to create a 'triangle' around the opponent's neck and one arm, cutting off blood flow to the brain."},
    {"id": "rnc", "name": "Rear Naked Choke", "sport": "BJJ", "query": "bjj rear naked choke submission tutorial", "description": "The ultimate, inescapable submission. A blood choke applied directly from the opponent's back, locking the arms securely around their neck."},
    {"id": "kimura", "name": "Kimura Lock", "sport": "BJJ", "query": "bjj kimura lock submission technique", "description": "A double-joint figure-four armlock used to manipulate and apply immense breaking pressure to the opponent's shoulder joint."}
]
_cached_skills = []
def fetch_dailymotion_skill(query: str):
    try:
        url = f"https://api.dailymotion.com/videos?fields=id,title,thumbnail_1080_url,duration&search={query}&limit=2&sort=relevance"
        res = requests.get(url, timeout=5).json()
        if res and res.get("list") and len(res["list"]) > 0:
            video = res["list"][0]
            if len(res["list"]) > 1 and res["list"][0]["duration"] > 600 and res["list"][1]["duration"] < 600:
                video = res["list"][1]
            if video.get("thumbnail_1080_url"):
                return {
                    "videoId": video["id"],
                    "videoTitle": video["title"],
                    "thumbnail": video["thumbnail_1080_url"],
                    "duration": video["duration"]
                }
    except Exception as e:
        print(f"Error fetching skill for {query}: {e}")
    return None
def get_all_skills():
    global _cached_skills
    if _cached_skills:
        return _cached_skills
    print("Fetching dynamic technique animations/tutorials from Dailymotion API...")
    results = []
    for skill in SKILLS_LIBRARY:
        video_data = fetch_dailymotion_skill(skill["query"])
        new_skill = skill.copy()
        if video_data:
            new_skill["videoId"] = video_data["videoId"]
            new_skill["videoTitle"] = video_data["videoTitle"]
            new_skill["thumbnail"] = video_data["thumbnail"]
            new_skill["duration"] = video_data["duration"]
        else:
            new_skill["videoId"] = "x5u4yoy"
            new_skill["videoTitle"] = f"{skill['name']} Breakdown"
            new_skill["thumbnail"] = "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1080"
            new_skill["duration"] = 120
        results.append(new_skill)
        time.sleep(0.1)
    _cached_skills = results
    return results