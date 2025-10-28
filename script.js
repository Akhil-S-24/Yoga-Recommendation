const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

const concernSelect = document.getElementById('concern-select');
const form = document.getElementById('concern-form');
const results = document.getElementById('results');
const poseList = document.getElementById('pose-list');
const food = document.getElementById('food');
const foodGuidance = document.getElementById('food-guidance');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Five yoga styles we will surface for each concern
// - Hatha (foundation, gentle)
// - Vinyasa (flow, strength + flexibility)
// - Yin (long holds, connective tissues)
// - Restorative (relaxation, nervous system)
// - Iyengar (alignment, props)

const YOGA_LIBRARY = {
    leg: {
        label: 'Leg pain/tightness',
        poses: [
            { style: 'Hatha', name: 'Low Lunge (Anjaneyasana)', cues: 'Knee over ankle, back knee cushioned; gentle hip flexor stretch.' },
            { style: 'Vinyasa', name: 'Warrior II (Virabhadrasana II)', cues: 'Front knee tracks toes; press outer back foot; build stability.' },
            { style: 'Yin', name: 'Dragon Pose', cues: '3–5 minutes; support with blocks; exit slowly to protect hip flexors.' },
            { style: 'Restorative', name: 'Legs Up the Wall (Viparita Karani)', cues: '5–10 minutes; reduces swelling; soften jaw and breath.' },
            { style: 'Iyengar', name: 'Reclined Hand-to-Big-Toe (Supta Padangusthasana)', cues: 'Use strap; keep hips level; stretch calves/hamstrings.' },
        ],
        food: {
            focus: [
                'Magnesium-rich: spinach, pumpkin seeds, legumes',
                'Anti-inflammatory: berries, turmeric, ginger, olive oil',
                'Hydration + electrolytes: water, coconut water',
            ],
            limit: [
                'Ultra-processed foods and excessive sugar',
                'Excess alcohol leading to dehydration',
            ],
        },
    },
    hand: {
        label: 'Hand/wrist strain',
        poses: [
            { style: 'Hatha', name: 'Gentle Wrist Rolls + Tabletop', cues: 'Load slowly; spread fingers; micro-bend elbows.' },
            { style: 'Vinyasa', name: 'Forearm Plank', cues: 'Offload wrists; maintain neutral neck; steady breath.' },
            { style: 'Yin', name: 'Melting Heart (Anahatasana) with fists', cues: 'Support shoulders; 2–3 minutes; avoid sharp pain.' },
            { style: 'Restorative', name: 'Supported Child’s Pose', cues: 'Bolster under chest; relax forearms and hands.' },
            { style: 'Iyengar', name: 'Down Dog with blocks/chair', cues: 'Hands on blocks or chair to reduce wrist angle.' },
        ],
        food: {
            focus: [
                'Omega-3s: flaxseed, chia, walnuts, fatty fish',
                'Vitamin C for connective tissue: citrus, bell pepper, kiwi',
                'Spices: turmeric + black pepper, ginger',
            ],
            limit: [ 'High-sodium processed snacks', 'Sugary beverages' ],
        },
    },
    stomach: {
        label: 'Stomach/digestion',
        poses: [
            { style: 'Hatha', name: 'Wind-Relieving Pose (Pavanamuktasana)', cues: 'Draw knee in; gentle massage for gut motility.' },
            { style: 'Vinyasa', name: 'Cat–Cow (Marjaryasana–Bitilasana)', cues: 'Slow spinal waves to stimulate digestion.' },
            { style: 'Yin', name: 'Sphinx Pose', cues: '2–4 minutes; mild extension to aid circulation to abdomen.' },
            { style: 'Restorative', name: 'Supported Supine Twist', cues: 'Bolsters for comfort; relax belly; 3–5 minutes each side.' },
            { style: 'Iyengar', name: 'Seated Forward Fold (Paschimottanasana) with strap', cues: 'Lengthen spine; soft belly; avoid compressing if reflux.' },
        ],
        food: {
            focus: [
                'Fiber diversity: oats, legumes, vegetables, fruit',
                'Probiotics: yogurt, kefir, sauerkraut (if tolerated)',
                'Ginger/mint teas; warm water',
            ],
            limit: [
                'Very greasy, spicy, or late-night heavy meals',
                'Excess caffeine or carbonated drinks if sensitive',
            ],
        },
    },
    back: {
        label: 'Back pain',
        poses: [
            { style: 'Hatha', name: 'Bridge Pose (Setu Bandhasana)', cues: 'Engage glutes; avoid crunching low back; use block under sacrum.' },
            { style: 'Vinyasa', name: 'Low Cobra (Bhujangasana)', cues: 'Lift with back strength; shoulders down; gentle extension.' },
            { style: 'Yin', name: 'Caterpillar (forward fold) with props', cues: '3–5 minutes; bend knees; traction spine; avoid sharp pain.' },
            { style: 'Restorative', name: 'Supported Fish', cues: 'Bolster lengthwise along spine; open chest; soothe nervous system.' },
            { style: 'Iyengar', name: 'Wall Dog', cues: 'Hands on wall; long spine; hinge at hips; decompress back.' },
        ],
        food: {
            focus: [ 'Anti-inflammatory pattern (Mediterranean-style)', 'Adequate protein for tissue repair', 'Vitamin D + calcium sources' ],
            limit: [ 'Excess sugar', 'Highly processed meats' ],
        },
    },
    neck: {
        label: 'Neck/shoulders',
        poses: [
            { style: 'Hatha', name: 'Thread the Needle', cues: 'Support head/shoulder; breathe into upper back.' },
            { style: 'Vinyasa', name: 'Slow Sun A with bent knees', cues: 'Move gently; avoid chaturanga if painful.' },
            { style: 'Yin', name: 'Supported Deer Pose (gentle twist)', cues: 'Prop head; relax jaw; 2–3 minutes each side.' },
            { style: 'Restorative', name: 'Supported Bridge', cues: 'Block under sacrum; relax shoulders; long exhales.' },
            { style: 'Iyengar', name: 'Tadasana at wall', cues: 'Back of skull to wall; widen collarbones; align posture.' },
        ],
        food: {
            focus: [ 'Hydration', 'Magnesium + potassium sources', 'Anti-inflammatory herbs and spices' ],
            limit: [ 'Heavy evening meals increasing tension', 'Excess caffeine if it worsens tightness' ],
        },
    },
};

function renderPoses(poses) {
    poseList.innerHTML = '';
    poses.forEach(p => {
        const el = document.createElement('div');
        el.className = 'pose';
        const imgUrl = getPoseImageUrl(p.name);
        el.innerHTML = `
            <div class="image-wrap">
                <img src="${imgUrl}" alt="${p.name}" loading="lazy" />
            </div>
            <div class="style">${p.style}</div>
            <div class="name">${p.name}</div>
            <div class="cues">${p.cues}</div>
        `;
        poseList.appendChild(el);
    });
}

function renderFoodGuidance(foodData) {
    const focusItems = foodData.focus.map(i => `<li>${i}</li>`).join('');
    const limitItems = foodData.limit.map(i => `<li>${i}</li>`).join('');
    foodGuidance.innerHTML = `
        <div class="food-section">
            <h3>Focus on</h3>
            <ul>${focusItems}</ul>
        </div>
        <div class="food-section">
            <h3>Limit/Avoid</h3>
            <ul>${limitItems}</ul>
        </div>
        <div class="food-section">
            <h3>General tips</h3>
            <ul>
                <li>Eat mindfully; stop at 80% fullness.</li>
                <li>Prioritize whole foods most of the time.</li>
                <li>Space vigorous practice 1.5–2 hours after big meals.</li>
                <li>Hydrate throughout the day, especially around practice.</li>
            </ul>
        </div>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const key = concernSelect.value;
    // Try API first; fallback to local data if request fails
    fetch(`/api/recommendations?concern=${encodeURIComponent(key)}`)
        .then(r => r.ok ? r.json() : Promise.reject(new Error('API not available')))
        .then(json => {
            if (json && json.ok) {
                const data = json.data;
                renderPoses(data.poses);
                renderFoodGuidance(data.food);
                results.classList.remove('hidden');
                food.classList.remove('hidden');
                results.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            throw new Error('Invalid API response');
        })
        .catch(() => {
            const data = YOGA_LIBRARY[key];
            if (!data) { return; }
            renderPoses(data.poses);
            renderFoodGuidance(data.food);
            results.classList.remove('hidden');
            food.classList.remove('hidden');
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
});

// Very lightweight mapping to public domain/stock-like references (Unsplash). Not perfect per pose, but illustrative.
function getPoseImageUrl(poseName) {
    const key = poseName.toLowerCase();
    if (key.includes('low lunge') || key.includes('anjaneyasana')) {
        return 'https://images.unsplash.com/photo-1534367610401-9f25a3a3be2d?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('warrior') || key.includes('virabhadrasana')) {
        return 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('dragon')) {
        return 'https://images.unsplash.com/photo-1543951620-6f219a63c8f9?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('legs up the wall') || key.includes('viparita')) {
        return 'https://images.unsplash.com/photo-1543979915-0b4a13ef57d5?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('hand-to-big-toe') || key.includes('padangustha')) {
        return 'https://images.unsplash.com/photo-1599050751795-05ef8f3d7e1b?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('forearm plank')) {
        return 'https://images.unsplash.com/photo-1518611473970-1e05d20e94a0?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('melting heart') || key.includes('anahatasana')) {
        return 'https://images.unsplash.com/photo-1593812193501-fabe6e8f64b2?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('child') || key.includes('balasana')) {
        return 'https://images.unsplash.com/photo-1592767877773-2bb1e78e19f1?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('down dog') || key.includes('adho mukha')) {
        return 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('pavanamuktasana') || key.includes('wind-relieving')) {
        return 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('cat') || key.includes('cow')) {
        return 'https://images.unsplash.com/photo-1552196563-3b11e1e05f7c?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('sphinx')) {
        return 'https://images.unsplash.com/photo-1616690710400-a16d1431bbe7?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('twist')) {
        return 'https://images.unsplash.com/photo-1588285823248-4490d7c8d2c0?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('forward fold') || key.includes('paschimottanasana')) {
        return 'https://images.unsplash.com/photo-1517341727766-c4242d3ddcc9?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('bridge') || key.includes('setu')) {
        return 'https://images.unsplash.com/photo-1627634777216-977ceb9260d3?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('cobra') || key.includes('bhujangasana')) {
        return 'https://images.unsplash.com/photo-1616690710400-6ce5f53a07f1?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('wall dog')) {
        return 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('thread the needle')) {
        return 'https://images.unsplash.com/photo-1612152917772-0e60b6623a91?q=80&w=800&auto=format&fit=crop';
    }
    if (key.includes('tadasana') || key.includes('mountain')) {
        return 'https://images.unsplash.com/photo-1518611473970-1e05d20e94a0?q=80&w=800&auto=format&fit=crop';
    }
    // fallback generic yoga image
    return 'https://images.unsplash.com/photo-1518611473970-1e05d20e94a0?q=80&w=800&auto=format&fit=crop';
}

// Navbar toggle for small screens
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id && id.length > 1) {
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});


