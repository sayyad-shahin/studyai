import os, json, logging
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://studyai1-frontend.onrender.com"
])

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
#   YOUR GROQ API KEY IS READ FROM .env FILE
#   Do NOT paste the key here — paste it in
#   the .env file shown below this file
# ─────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

if not GROQ_API_KEY:
    logger.warning("=" * 55)
    logger.warning("  GROQ_API_KEY is missing!")
    logger.warning("  Open backend/.env and paste your key")
    logger.warning("  Get free key: https://console.groq.com/keys")
    logger.warning("=" * 55)

client = Groq(api_key=GROQ_API_KEY)
MODEL  = "llama-3.3-70b-versatile"

# ── helper ────────────────────────────────────
def chat(system, user, history=None, max_tokens=1200):
    msgs = [{"role": "system", "content": system}]
    if history:
        msgs += history
    msgs.append({"role": "user", "content": user})
    resp = client.chat.completions.create(
        model=MODEL, messages=msgs,
        max_tokens=max_tokens, temperature=0.7
    )
    return resp.choices[0].message.content.strip()

def clean_json(raw):
    raw = raw.replace("```json", "").replace("```", "").strip()
    s, e = raw.find("{"), raw.rfind("}") + 1
    if s == -1 or e == 0:
        raise ValueError("No JSON object found")
    return json.loads(raw[s:e])

# ── routes ────────────────────────────────────
@app.route("/")
def home():
    return jsonify({
        "status": "ok",
        "model": MODEL,
        "key_loaded": bool(GROQ_API_KEY)
    })

@app.route("/health")
def health():
    return jsonify({"status": "healthy"})

@app.route("/explain", methods=["POST"])
def explain():
    data    = request.json or {}
    topic   = data.get("topic", "").strip()
    subject = data.get("subject", "General")
    history = data.get("history", [])
    if not topic:
        return jsonify({"error": "topic is required"}), 400

    system = f"""You are an expert AI tutor for Indian students
(Maharashtra Board, JEE, NEET, Engineering).
Subject focus: {subject}.
- Give clear, structured explanations with real-world examples.
- Use simple language for students aged 14-22.
- Use **bold** for key terms and ## for section headers.
- Be encouraging and patient."""

    hist = [
        {"role": m["role"], "content": m["content"]}
        for m in history[-10:]
        if m.get("role") in ("user", "assistant")
    ]
    try:
        answer = chat(system, topic, history=hist)
        logger.info(f"[EXPLAIN] {topic[:60]}")
        return jsonify({"response": answer})
    except Exception as e:
        logger.error(f"[EXPLAIN] {e}")
        return jsonify({"error": str(e)}), 503

@app.route("/quiz", methods=["POST"])
def generate_quiz():
    data       = request.json or {}
    topic      = data.get("topic", "").strip()
    subject    = data.get("subject", "General")
    difficulty = data.get("difficulty", "Medium")
    num_q      = min(int(data.get("num_questions", 5)), 10)
    if not topic:
        return jsonify({"error": "topic is required"}), 400

    system = """You are a quiz generator for Indian students.
Return ONLY valid JSON — no markdown, no extra text:
{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question text?",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 0,
      "explanation": "Why this answer is correct."
    }
  ]
}
"correct" is the 0-based index of the correct option."""

    prompt = f'Generate {num_q} {difficulty}-level MCQ questions on "{topic}" for {subject}. Return ONLY JSON.'
    try:
        raw = chat(system, prompt, max_tokens=2000)
        out = clean_json(raw)
        logger.info(f"[QUIZ] {num_q}Q | {topic} | {difficulty}")
        return jsonify(out)
    except json.JSONDecodeError as e:
        logger.error(f"[QUIZ] JSON parse error: {e}")
        return jsonify({"error": "Failed to parse quiz. Please try again."}), 500
    except Exception as e:
        logger.error(f"[QUIZ] {e}")
        return jsonify({"error": str(e)}), 503

@app.route("/mindmap", methods=["POST"])
def generate_mindmap():
    data  = request.json or {}
    topic = data.get("topic", "").strip()
    if not topic:
        return jsonify({"error": "topic is required"}), 400

    system = """You generate mind maps for students.
Return ONLY valid JSON — no markdown, no extra text:
{
  "topic": "Main Topic",
  "branches": [
    {
      "topic": "Branch Name",
      "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
    }
  ]
}
Rules: exactly 5 branches, each with exactly 3 subtopics.
Labels max 3 words. No text outside JSON."""

    try:
        raw = chat(system, f'Create a mind map for: "{topic}"', max_tokens=1000)
        out = clean_json(raw)
        logger.info(f"[MINDMAP] {topic}")
        return jsonify(out)
    except json.JSONDecodeError as e:
        logger.error(f"[MINDMAP] JSON parse error: {e}")
        return jsonify({"error": "Failed to parse mind map. Try again."}), 500
    except Exception as e:
        logger.error(f"[MINDMAP] {e}")
        return jsonify({"error": str(e)}), 503

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"error": "Method not allowed"}), 405

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    logger.info(f"StudyAI API  →  http://127.0.0.1:{port}")
    logger.info(f"Model        →  {MODEL}")
    logger.info(f"Key loaded   →  {'YES ✓' if GROQ_API_KEY else 'NO ✗  — paste key in backend/.env'}")
    app.run(host="0.0.0.0", port=port, debug=True)