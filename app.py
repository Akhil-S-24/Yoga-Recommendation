from flask import Flask, jsonify, send_from_directory, request
from pathlib import Path

app = Flask(__name__, static_folder='.', static_url_path='')


YOGA_LIBRARY = {
    "leg": {
        "label": "Leg pain/tightness",
        "poses": [
            {"style": "Hatha", "name": "Low Lunge (Anjaneyasana)", "cues": "Knee over ankle, back knee cushioned; gentle hip flexor stretch."},
            {"style": "Vinyasa", "name": "Warrior II (Virabhadrasana II)", "cues": "Front knee tracks toes; press outer back foot; build stability."},
            {"style": "Yin", "name": "Dragon Pose", "cues": "3–5 minutes; support with blocks; exit slowly to protect hip flexors."},
            {"style": "Restorative", "name": "Legs Up the Wall (Viparita Karani)", "cues": "5–10 minutes; reduces swelling; soften jaw and breath."},
            {"style": "Iyengar", "name": "Reclined Hand-to-Big-Toe (Supta Padangusthasana)", "cues": "Use strap; keep hips level; stretch calves/hamstrings."}
        ],
        "food": {
            "focus": [
                "Magnesium-rich: spinach, pumpkin seeds, legumes",
                "Anti-inflammatory: berries, turmeric, ginger, olive oil",
                "Hydration + electrolytes: water, coconut water"
            ],
            "limit": [
                "Ultra-processed foods and excessive sugar",
                "Excess alcohol leading to dehydration"
            ]
        }
    },
    "hand": {
        "label": "Hand/wrist strain",
        "poses": [
            {"style": "Hatha", "name": "Gentle Wrist Rolls + Tabletop", "cues": "Load slowly; spread fingers; micro-bend elbows."},
            {"style": "Vinyasa", "name": "Forearm Plank", "cues": "Offload wrists; maintain neutral neck; steady breath."},
            {"style": "Yin", "name": "Melting Heart (Anahatasana) with fists", "cues": "Support shoulders; 2–3 minutes; avoid sharp pain."},
            {"style": "Restorative", "name": "Supported Child’s Pose", "cues": "Bolster under chest; relax forearms and hands."},
            {"style": "Iyengar", "name": "Down Dog with blocks/chair", "cues": "Hands on blocks or chair to reduce wrist angle."}
        ],
        "food": {
            "focus": [
                "Omega-3s: flaxseed, chia, walnuts, fatty fish",
                "Vitamin C for connective tissue: citrus, bell pepper, kiwi",
                "Spices: turmeric + black pepper, ginger"
            ],
            "limit": ["High-sodium processed snacks", "Sugary beverages"]
        }
    },
    "stomach": {
        "label": "Stomach/digestion",
        "poses": [
            {"style": "Hatha", "name": "Wind-Relieving Pose (Pavanamuktasana)", "cues": "Draw knee in; gentle massage for gut motility."},
            {"style": "Vinyasa", "name": "Cat–Cow (Marjaryasana–Bitilasana)", "cues": "Slow spinal waves to stimulate digestion."},
            {"style": "Yin", "name": "Sphinx Pose", "cues": "2–4 minutes; mild extension to aid circulation to abdomen."},
            {"style": "Restorative", "name": "Supported Supine Twist", "cues": "Bolsters for comfort; relax belly; 3–5 minutes each side."},
            {"style": "Iyengar", "name": "Seated Forward Fold (Paschimottanasana) with strap", "cues": "Lengthen spine; soft belly; avoid compressing if reflux."}
        ],
        "food": {
            "focus": [
                "Fiber diversity: oats, legumes, vegetables, fruit",
                "Probiotics: yogurt, kefir, sauerkraut (if tolerated)",
                "Ginger/mint teas; warm water"
            ],
            "limit": [
                "Very greasy, spicy, or late-night heavy meals",
                "Excess caffeine or carbonated drinks if sensitive"
            ]
        }
    },
    "back": {
        "label": "Back pain",
        "poses": [
            {"style": "Hatha", "name": "Bridge Pose (Setu Bandhasana)", "cues": "Engage glutes; avoid crunching low back; use block under sacrum."},
            {"style": "Vinyasa", "name": "Low Cobra (Bhujangasana)", "cues": "Lift with back strength; shoulders down; gentle extension."},
            {"style": "Yin", "name": "Caterpillar (forward fold) with props", "cues": "3–5 minutes; bend knees; traction spine; avoid sharp pain."},
            {"style": "Restorative", "name": "Supported Fish", "cues": "Bolster lengthwise along spine; open chest; soothe nervous system."},
            {"style": "Iyengar", "name": "Wall Dog", "cues": "Hands on wall; long spine; hinge at hips; decompress back."}
        ],
        "food": {
            "focus": ["Anti-inflammatory pattern (Mediterranean-style)", "Adequate protein for tissue repair", "Vitamin D + calcium sources"],
            "limit": ["Excess sugar", "Highly processed meats"]
        }
    },
    "neck": {
        "label": "Neck/shoulders",
        "poses": [
            {"style": "Hatha", "name": "Thread the Needle", "cues": "Support head/shoulder; breathe into upper back."},
            {"style": "Vinyasa", "name": "Slow Sun A with bent knees", "cues": "Move gently; avoid chaturanga if painful."},
            {"style": "Yin", "name": "Supported Deer Pose (gentle twist)", "cues": "Prop head; relax jaw; 2–3 minutes each side."},
            {"style": "Restorative", "name": "Supported Bridge", "cues": "Block under sacrum; relax shoulders; long exhales."},
            {"style": "Iyengar", "name": "Tadasana at wall", "cues": "Back of skull to wall; widen collarbones; align posture."}
        ],
        "food": {
            "focus": ["Hydration", "Magnesium + potassium sources", "Anti-inflammatory herbs and spices"],
            "limit": ["Heavy evening meals increasing tension", "Excess caffeine if it worsens tightness"]
        }
    }
}


@app.get('/api/recommendations')
def recommendations():
    concern = request.args.get('concern', '').strip().lower()
    if concern in YOGA_LIBRARY:
        return jsonify({"ok": True, "data": YOGA_LIBRARY[concern]})
    return jsonify({"ok": False, "error": "Unknown concern"}), 404


@app.get('/')
def root():
    return send_from_directory(app.static_folder, 'index.html')


def main():
    port = int(Path.cwd().stem == 'yoga' and 5000 or 5000)
    app.run(host='127.0.0.1', port=port, debug=True)


if __name__ == '__main__':
    main()


