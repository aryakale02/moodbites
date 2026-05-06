import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(0); 
  const [name, setName] = useState("");

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedCraving, setSelectedCraving] = useState("");

  const [mentalTired, setMentalTired] = useState(false);
  const [overthinking, setOverthinking] = useState(false);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("moodHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem("moodStreak");
    return savedStreak ? JSON.parse(savedStreak) : 1;
  });

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("moodStreak", JSON.stringify(streak));
  }, [streak]);

  const handleSaveToHistory = () => {
    setStreak(streak + 1);
    setHistory([...history, { mood: selectedMood, craving: selectedCraving }]);
    setStep(0);
    setSelectedMood("");
    setSelectedCraving("");
    setMentalTired(false);
    setOverthinking(false);
  };

  const insightsData = {
    Stressed: {
      Sweet: {
        insight: "Stress spikes cortisol, which tells your body to seek out quick energy to fight or flee, resulting in intense sugar cravings.",
        reason: "Sugary foods provide a rapid, but temporary, drop in stress hormones by triggering serotonin and dopamine release.",
        intensity: 85
      },
      Spicy: {
        insight: "Craving spicy food when stressed is your body's attempt to distract itself and seek a rush of natural painkillers.",
        reason: "Capsaicin in spicy food triggers pain receptors, which forces your brain to release endorphins, creating a natural 'high' that combats stress.",
        intensity: 80
      },
      Chocolate: {
        insight: "Chocolate is the ultimate stress-comfort food because it directly impacts your brain's chemistry.",
        reason: "Stress severely depletes magnesium levels. Chocolate is rich in magnesium and also contains compounds that mimic cannabinoids, promoting relaxation.",
        intensity: 75
      },
      "Junk Food": {
        insight: "When stressed, your brain searches for the highest calorie comfort possible to feel safe and secure.",
        reason: "High-fat, high-carb foods physically blunt the stress response in the brain, offering a powerful but very short-term numbing effect.",
        intensity: 90
      }
    },
    Sad: {
      Sweet: {
        insight: "Sadness correlates with low dopamine. Your brain is searching for the quickest way to simulate happiness.",
        reason: "Sugar causes a massive, immediate spike in dopamine, providing a fleeting sensation of joy and emotional warmth.",
        intensity: 75
      },
      Spicy: {
        insight: "You might be craving spicy food to feel 'something' intense to snap out of a low, lethargic mood.",
        reason: "The physical intensity of spicy food can act as a grounding technique, bringing you back to the present moment and releasing endorphins.",
        intensity: 60
      },
      Chocolate: {
        insight: "Chocolate is a universal symbol of comfort and care, which your brain actively seeks out when feeling down.",
        reason: "Chocolate contains phenylethylamine, the same chemical your brain creates when you feel like you're falling in love, offering deep emotional comfort.",
        intensity: 80
      },
      "Junk Food": {
        insight: "Sadness can drain your physical energy, leading you to seek out heavy, comforting, and easy-to-eat foods.",
        reason: "Carbohydrate-heavy foods increase the availability of tryptophan in the brain, which is the building block for the mood-stabilizing hormone serotonin.",
        intensity: 85
      }
    },
    Anxious: {
      Sweet: {
        insight: "Anxiety keeps your nervous system in overdrive, burning through energy and making you crave quick sugar fixes.",
        reason: "Anxiety mimics a physical threat, so the body demands fast energy (sugar) to prepare for 'fight or flight', even if you are just sitting still.",
        intensity: 80
      },
      Spicy: {
        insight: "The intense heat of spicy food provides a physical distraction from racing, anxious thoughts.",
        reason: "The sharp sensation of capsaicin forces the brain to focus on physical sensations rather than psychological worry, offering a brief mental break.",
        intensity: 70
      },
      Chocolate: {
        insight: "Your nervous system is overwhelmed, and chocolate acts as a natural, mild tranquilizer.",
        reason: "Anxiety depletes magnesium, leading to muscle tension and nervousness. Dark chocolate provides a quick magnesium boost to help calm the nerves.",
        intensity: 85
      },
      "Junk Food": {
        insight: "Anxiety can make you feel ungrounded, and heavy comfort foods are an attempt to feel physically anchored.",
        reason: "The combination of fat and salt in junk food strongly activates the brain's reward centers, temporarily drowning out feelings of panic.",
        intensity: 90
      }
    },
    Tired: {
      Sweet: {
        insight: "When you are exhausted, your brain desperately seeks the fastest possible source of fuel.",
        reason: "Sleep deprivation alters hunger hormones, increasing ghrelin (which makes you hungry) and making you crave the immediate energy spike of sugar.",
        intensity: 65
      },
      Spicy: {
        insight: "Craving spice when tired is a subconscious effort to wake up your senses and boost your alertness.",
        reason: "Spicy foods increase heart rate and circulation, acting as a mild stimulant to combat physical fatigue.",
        intensity: 55
      },
      Chocolate: {
        insight: "You are craving both energy and comfort, and chocolate provides a gentle lift.",
        reason: "Chocolate contains small amounts of caffeine and theobromine, which provide a mild, sustained energy boost without the jitteriness of coffee.",
        intensity: 60
      },
      "Junk Food": {
        insight: "When exhausted, your willpower is low, and your brain defaults to seeking the most calorie-dense foods available.",
        reason: "Being tired impairs the brain's prefrontal cortex, which handles decision-making, making the primitive, reward-seeking part of the brain take over.",
        intensity: 75
      }
    },
    PMS: {
      Sweet: {
        insight: "Hormonal shifts are causing massive energy dips, making sweet foods incredibly appealing.",
        reason: "Estrogen and progesterone fluctuations affect insulin sensitivity, leading to drops in blood sugar that trigger intense sugar cravings.",
        intensity: 80
      },
      Spicy: {
        insight: "You might be craving spice to counteract the lethargy and bodily discomfort associated with PMS.",
        reason: "Endorphins released by spicy foods can act as natural pain relievers for cramps and improve your overall mood.",
        intensity: 60
      },
      Chocolate: {
        insight: "This is the most common PMS craving for a good reason: your body is trying to self-medicate.",
        reason: "Chocolate replenishes the magnesium lost during menstruation, which helps ease cramps, and boosts serotonin to combat mood swings.",
        intensity: 90
      },
      "Junk Food": {
        insight: "Your body is working hard and burning slightly more calories, leading to cravings for dense, filling foods.",
        reason: "Hormonal changes increase your basal metabolic rate slightly, making your brain signal that it needs calorie-rich comfort to prepare for the cycle.",
        intensity: 85
      }
    }
  };

  let insight = "";
  let foods = [];
  let moodMessage = "";
  let affirmation = "";
  let cravingReason = "";
  let dailyChallenge = "";
  let emotionScore = 0;
  let hiddenEmotion = "";
  let wellnessStatus = "";
  let personalizedTips = [];
  let progressColor = "#22c55e";
  let moodEmoji = "💖";
  let musicSuggestion = "";

  const stressAffirmations = [
    "You are stronger than your stress 💪",
    "Take one step at a time 🌸",
    "Your feelings matter 💖",
  ];

  const anxiousAffirmations = [
    "Breathe slowly. You are safe 🌿",
    "You are not alone 💕",
    "This feeling will pass 🌸",
  ];

  const generalAffirmations = [
    "You are doing your best, and that is enough ✨",
    "Be kind to yourself today 💖",
    "Every day is a fresh start 🌅",
  ];

  // MOOD BASE SETTINGS
  if (selectedMood === "Stressed") {
    moodMessage = "It's okay to feel stressed. Your feelings are valid 💖";
    affirmation = stressAffirmations[Math.floor(Math.random() * stressAffirmations.length)];
    dailyChallenge = "Take a 5-minute break and avoid screens 🌿";
    personalizedTips = ["🧘 Take 5 deep breaths", "📵 Reduce screen time", "🚶 Take a short walk"];
    musicSuggestion = "🎵 Calm piano or lo-fi music";
    moodEmoji = "😣";
  } else if (selectedMood === "Tired") {
    moodMessage = "Your body may be asking for rest and recovery 🌙";
    affirmation = "Rest is productive too 🌙";
    dailyChallenge = "Sleep 30 minutes earlier tonight 😴";
    personalizedTips = ["😴 Sleep earlier tonight", "💧 Stay hydrated", "🥗 Eat energy-rich healthy foods"];
    musicSuggestion = "☀ Soft focus music or acoustic songs";
    moodEmoji = "😴";
  } else if (selectedMood === "Anxious") {
    moodMessage = "You deserve calm and comfort right now 🌸";
    affirmation = anxiousAffirmations[Math.floor(Math.random() * anxiousAffirmations.length)];
    dailyChallenge = "Do 10 deep breaths slowly 🌸";
    personalizedTips = ["🌸 Try grounding exercises", "🎵 Listen to calm music", "🫖 Drink herbal tea"];
    musicSuggestion = "🌿 Nature sounds or meditation music";
    moodEmoji = "😟";
  } else if (selectedMood === "PMS") {
    moodMessage = "Hormonal mood swings can feel overwhelming. Be gentle with yourself 💕";
    affirmation = "Your body is doing a lot. Be kind to yourself 💕";
    dailyChallenge = "Drink warm water and rest properly 💕";
    personalizedTips = ["💕 Rest without guilt", "🍫 Eat magnesium-rich foods", "🔥 Use a heating pad if needed"];
    musicSuggestion = "🌸 Relaxing self-care playlists";
    moodEmoji = "🌸";
  } else if (selectedMood === "Sad") {
    moodMessage = "I'm sorry you're feeling down. Sending you a warm hug 🫂";
    affirmation = "It is okay to be sad. Better days are coming 🌅";
    dailyChallenge = "Write down one thing you are grateful for 📝";
    personalizedTips = ["🫂 Reach out to a loved one", "☕ Drink a warm beverage", "🌤️ Step outside for some fresh air"];
    musicSuggestion = "💖 Comfort music or uplifting songs";
    moodEmoji = "😔";
  } else {
    moodMessage = "Taking time to check in with yourself is a beautiful habit ✨";
    affirmation = generalAffirmations[Math.floor(Math.random() * generalAffirmations.length)];
    dailyChallenge = "Drink a glass of water right now 💧";
    personalizedTips = ["🌿 Take a moment to stretch", "📖 Read a few pages of a book", "🎶 Listen to a favorite song"];
    musicSuggestion = "🎵 Feel-good acoustic or pop music";
    moodEmoji = "🤔";
  }

  // CRAVING FOODS (Kept generic, but insight/reason comes from the data object)
  if (selectedCraving === "Sweet") {
    foods = ["🍌 Banana with peanut butter", "🍓 Berries with yogurt", "🍯 Apple slices with honey"];
  } else if (selectedCraving === "Spicy") {
    foods = ["🌶️ Roasted spiced chickpeas", "🥑 Spicy guacamole with veggies", "🥗 Jalapeno salsa on whole grain chips"];
  } else if (selectedCraving === "Chocolate") {
    foods = ["🍫 Dark chocolate (70%+ cocoa)", "🥜 Almonds and cacao nibs", "☕ Hot cocoa made with almond milk"];
  } else if (selectedCraving === "Junk Food") {
    foods = ["🥗 A balanced bowl with protein and complex carbs", "🍿 Air-popped popcorn", "🍠 Baked sweet potato fries"];
  }

  // PULL FROM DATA DICTIONARY
  const moodData = insightsData[selectedMood] || null;
  const specificData = moodData ? moodData[selectedCraving] : null;

  if (specificData) {
    insight = specificData.insight;
    cravingReason = specificData.reason;
    emotionScore = specificData.intensity;
  } else {
    // Fallback for Confused mood or missing data
    insight = `Craving ${selectedCraving?.toLowerCase()} foods while feeling this way is a common sign your body is trying to self-regulate and find comfort.`;
    cravingReason = "The brain naturally seeks out foods that will quickly alter its neurochemistry to manage difficult emotional states.";
    emotionScore = 50; 
  }

  // ADD MODIFIERS
  if (mentalTired) emotionScore += 10;
  if (overthinking) emotionScore += 15;
  if (emotionScore > 100) emotionScore = 100;

  if (emotionScore <= 40) {
    wellnessStatus = "🌿 Low emotional stress detected.";
    progressColor = "#22c55e";
  } else if (emotionScore <= 75) {
    wellnessStatus = "⚡ Moderate emotional pressure detected.";
    progressColor = "#facc15";
  } else {
    wellnessStatus = "⚠ High emotional overload detected.";
    progressColor = "#ef4444";
  }

  // HIDDEN EMOTION
  if (mentalTired && overthinking && selectedMood === "Tired") {
    hiddenEmotion = "⚠ Possible burnout detected. Your mind may need deep rest.";
  } else if (overthinking && selectedMood === "Anxious") {
    hiddenEmotion = "⚠ High anxiety pattern detected. Try grounding exercises.";
  } else if (mentalTired && selectedMood === "Stressed") {
    hiddenEmotion = "⚠ Emotional exhaustion detected. Give yourself permission to pause.";
  }

  // BACKGROUND GRADIENT
  let backgroundStyle = "linear-gradient(to bottom right, #ffe0ec, #ffd6f5, #f3e8ff)";
  if (selectedMood === "Stressed") {
    backgroundStyle = "linear-gradient(to bottom right, #ffd6d6, #ffe5e5, #fff0f0)";
  } else if (selectedMood === "Anxious") {
    backgroundStyle = "linear-gradient(to bottom right, #e0d4ff, #f3e8ff, #f8f0ff)";
  } else if (selectedMood === "Tired") {
    backgroundStyle = "linear-gradient(to bottom right, #dbeafe, #bfdbfe, #e0f2fe)";
  } else if (selectedMood === "PMS") {
    backgroundStyle = "linear-gradient(to bottom right, #ffd6ec, #ffe4f3, #fff0f7)";
  }

  let moodCounts = {};
  history.forEach((item) => {
    moodCounts[item.mood] = (moodCounts[item.mood] || 0) + 1;
  });

  const buttonStyle = {
    margin: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: darkMode ? "#4b5563" : "#ffe4ef",
    color: darkMode ? "white" : "black",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  const cravingStyle = {
    margin: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: darkMode ? "#4b5563" : "#f3e8ff",
    color: darkMode ? "white" : "black",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  };

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        background: backgroundStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: darkMode ? "#1f2937" : "white",
          padding: "40px",
          borderRadius: "25px",
          width: "90%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <button
          className="btn"
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 15px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: darkMode ? "#facc15" : "#111827",
            color: darkMode ? "black" : "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* STEP 0: HOME */}
        {step === 0 && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            <h1 style={{ fontSize: "50px", color: darkMode ? "#f9a8d4" : "#ff4f81", marginBottom: "10px" }}>
              MoodBite {moodEmoji}
            </h1>
            <p style={{ fontSize: "18px", color: darkMode ? "#e5e7eb" : "#555", lineHeight: "1.6" }}>
              Understand your cravings emotionally, mentally, and hormonally.
            </p>

            <input
              className="input-field"
              type="text"
              placeholder="Enter your name 💕"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginTop: "30px",
                padding: "12px",
                width: "80%",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "16px",
                backgroundColor: darkMode ? "#374151" : "white",
                color: darkMode ? "white" : "black",
              }}
            />

            <br />

            <button
              className="btn"
              onClick={() => setStep(1)}
              style={{
                marginTop: "30px",
                padding: "14px 28px",
                border: "none",
                borderRadius: "14px",
                backgroundColor: "#ff4f81",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Start Check-In
            </button>
            <br />
            <button
              className="btn"
              onClick={() => {
                const report = history.map((item) => `${item.mood} → ${item.craving}`).join("\n");
                const blob = new Blob([report], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "MoodBite_Report.txt";
                a.click();
              }}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#8b5cf6",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Export Mood Report 📄
            </button>
          </div>
        )}

        {/* STEP 1: MOOD */}
        {step === 1 && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            <button className="btn" onClick={() => setStep(0)} style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#d1d5db", cursor: "pointer", fontWeight: "bold" }}>
              ← Back
            </button>

            <h2 style={{ color: darkMode ? "#f9a8d4" : "#ff4f81", marginBottom: "20px" }}>
              {name ? `How are you feeling today, ${name}? 🌸` : "How are you feeling today? 🌸"}
            </h2>

            <div>
              <button className="btn" onClick={() => { setSelectedMood("Stressed"); setStep(2); }} style={buttonStyle}>😣 Stressed</button>
              <button className="btn" onClick={() => { setSelectedMood("Sad"); setStep(2); }} style={buttonStyle}>😔 Sad</button>
              <button className="btn" onClick={() => { setSelectedMood("Anxious"); setStep(2); }} style={buttonStyle}>😟 Anxious</button>
              <button className="btn" onClick={() => { setSelectedMood("Tired"); setStep(2); }} style={buttonStyle}>😴 Tired</button>
              <button className="btn" onClick={() => setSelectedMood("Confused")} style={buttonStyle}>🤔 I don't know</button>
              <button className="btn" onClick={() => { setSelectedMood("PMS"); setStep(2); }} style={buttonStyle}>🌸 Period Mood</button>
            </div>

            {selectedMood === "Confused" && (
              <div style={{ color: darkMode ? "white" : "black", marginTop: "20px", padding: "20px", backgroundColor: darkMode ? "#374151" : "#fdf0ff", borderRadius: "15px" }}>
                <h3 style={{ color: darkMode ? "white" : "#444" }}>Let's figure it out 💭</h3>
                <p style={{ marginTop: "10px" }}>Do you feel mentally tired?</p>
                <button className="btn" onClick={() => setMentalTired(true)} style={{ ...buttonStyle, backgroundColor: mentalTired ? "#ff4f81" : buttonStyle.backgroundColor, color: mentalTired ? "white" : buttonStyle.color }}>Yes</button>
                <button className="btn" onClick={() => setMentalTired(false)} style={buttonStyle}>No</button>

                <p style={{ marginTop: "15px" }}>Have you been overthinking lately?</p>
                <button className="btn" onClick={() => setOverthinking(true)} style={{ ...buttonStyle, backgroundColor: overthinking ? "#ff4f81" : buttonStyle.backgroundColor, color: overthinking ? "white" : buttonStyle.color }}>Yes</button>
                <button className="btn" onClick={() => setOverthinking(false)} style={buttonStyle}>No</button>
                <br />
                <button className="btn" onClick={() => setStep(2)} style={{ marginTop: "20px", padding: "12px 24px", borderRadius: "12px", border: "none", backgroundColor: "#ff4f81", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                  Continue →
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CRAVING */}
        {step === 2 && (
          <div style={{ animation: "fadeIn 0.5s" }}>
            <button className="btn" onClick={() => setStep(1)} style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#d1d5db", cursor: "pointer", fontWeight: "bold" }}>
              ← Back
            </button>

            <h3 style={{ marginTop: "10px", marginBottom: "20px", color: darkMode ? "white" : "#444" }}>
              What are you craving? 🍫
            </h3>

            <div>
              <button className="btn" onClick={() => { setSelectedCraving("Sweet"); setStep(3); }} style={cravingStyle}>🍭 Sweet</button>
              <button className="btn" onClick={() => { setSelectedCraving("Spicy"); setStep(3); }} style={cravingStyle}>🌶 Spicy</button>
              <button className="btn" onClick={() => { setSelectedCraving("Chocolate"); setStep(3); }} style={cravingStyle}>🍫 Chocolate</button>
              <button className="btn" onClick={() => { setSelectedCraving("Junk Food"); setStep(3); }} style={cravingStyle}>🍔 Junk Food</button>
            </div>
          </div>
        )}

        {/* STEP 3: INSIGHTS */}
        {step === 3 && selectedCraving && (
          <div style={{ animation: "fadeIn 0.5s", textAlign: "left" }}>
            <button className="btn" onClick={() => setStep(2)} style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#d1d5db", cursor: "pointer", fontWeight: "bold" }}>
              ← Change Craving
            </button>

            <div style={{ marginTop: "10px", padding: "20px", backgroundColor: darkMode ? "#374151" : "#fff0f5", borderRadius: "15px", color: darkMode ? "#e5e7eb" : "black" }}>
              <h3 style={{ textAlign: "center", marginBottom: "15px", color: darkMode ? "#f9a8d4" : "#ff4f81" }}>AI Insight 💡</h3>

              <p style={{ color: darkMode ? "#f9a8d4" : "#ff4f81", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
                {name ? `${name}, ${moodMessage}` : moodMessage}
              </p>

              <p style={{ textAlign: "center", marginBottom: "20px" }}>{insight}</p>

              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Why This Craving Happens 🧠</h4>
                <p style={{ marginTop: "5px", lineHeight: "1.5" }}>{cravingReason}</p>
              </div>

              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Emotion Intensity 📊</h4>
                <div style={{ height: "20px", backgroundColor: darkMode ? "#374151" : "#eee", borderRadius: "10px", overflow: "hidden", marginTop: "10px" }}>
                  <div style={{ width: `${emotionScore}%`, height: "100%", backgroundColor: progressColor, transition: "width 1s ease-in-out" }} />
                </div>
                <p style={{ marginTop: "5px", fontSize: "14px" }}>{emotionScore}% Emotional Intensity</p>
                <p style={{ marginTop: "5px", fontWeight: "bold", color: darkMode ? "#f9a8d4" : "#ff4f81" }}>{wellnessStatus}</p>
              </div>

              {hiddenEmotion && (
                <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#7f1d1d" : "#fff3f3", padding: "15px", borderRadius: "12px", color: darkMode ? "#fca5a5" : "#991b1b" }}>
                  <h4>Hidden Emotional Pattern 🔍</h4>
                  <p style={{ marginTop: "5px", lineHeight: "1.5" }}>{hiddenEmotion}</p>
                </div>
              )}

              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Daily Affirmation ✨</h4>
                <p style={{ marginTop: "5px", fontStyle: "italic", lineHeight: "1.5" }}>"{affirmation}"</p>
              </div>

              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Today's Wellness Challenge 🎯</h4>
                <p style={{ marginTop: "5px", lineHeight: "1.5" }}>{dailyChallenge}</p>
              </div>

              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Recommended Foods 🍽</h4>
                <ul style={{ listStyle: "none", padding: 0, marginTop: "5px" }}>
                  {foods.map((food, index) => <li key={index} style={{ marginBottom: "6px", lineHeight: "1.4" }}>{food}</li>)}
                </ul>
              </div>
              
              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Self-Care Tips 🌿</h4>
                <ul style={{ listStyle: "none", padding: 0, marginTop: "5px" }}>
                  {personalizedTips.map((tip, index) => <li key={index} style={{ marginBottom: "6px", lineHeight: "1.4" }}>{tip}</li>)}
                </ul>
              </div>
              
              <div className="insight-card" style={{ marginTop: "15px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px", color: darkMode ? "#e5e7eb" : "#333" }}>
                <h4>Music Therapy 🎵</h4>
                <p style={{ marginTop: "5px", lineHeight: "1.5" }}>{musicSuggestion}</p>
              </div>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  className="btn"
                  onClick={handleSaveToHistory}
                  style={{ padding: "14px 28px", border: "none", borderRadius: "14px", backgroundColor: "#22c55e", color: "white", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
                >
                  Save & Finish Check-In ✅
                </button>
              </div>
            </div>

            {/* HISTORY */}
            {history.length > 0 && (
              <div style={{ marginTop: "30px", padding: "20px", backgroundColor: darkMode ? "#374151" : "#f8f0ff", borderRadius: "15px", color: darkMode ? "#e5e7eb" : "black" }}>
                <div className="insight-card" style={{ marginBottom: "20px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px" }}>
                  <h4 style={{ textAlign: "center" }}>🔥 Wellness Streak</h4>
                  <p style={{ textAlign: "center", marginTop: "5px" }}>{streak} Day Emotional Check-In</p>
                </div>

                <div className="insight-card" style={{ marginBottom: "20px", backgroundColor: darkMode ? "#1f2937" : "#fff", padding: "15px", borderRadius: "12px" }}>
                  <h4 style={{ textAlign: "center" }}>Mood Analytics 📈</h4>
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    {Object.entries(moodCounts).map(([mood, count]) => (
                      <p key={mood}>{mood} → {count} times</p>
                    ))}
                  </div>
                </div>

                <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Your Mood History 📖</h4>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  {history.map((item, index) => (
                    <p key={index}>{item.mood} → {item.craving}</p>
                  ))}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    className="btn"
                    onClick={() => { setHistory([]); setStreak(1); localStorage.removeItem("moodHistory"); localStorage.removeItem("moodStreak"); }}
                    style={{ padding: "10px 20px", border: "none", borderRadius: "10px", backgroundColor: "#ef4444", color: "white", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Reset Wellness Data 🧹
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}