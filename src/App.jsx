import { useState, useEffect } from "react";

export default function App() {
const [darkMode, setDarkMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedCraving, setSelectedCraving] = useState("");

  const [mentalTired, setMentalTired] = useState(false);
  const [overthinking, setOverthinking] = useState(false);

  const [history, setHistory] = useState(() => {

  const savedHistory =
    localStorage.getItem("moodHistory");

  return savedHistory
    ? JSON.parse(savedHistory)
    : [];

});


  const [streak, setStreak] = useState(() => {

  const savedStreak =
    localStorage.getItem("moodStreak");

  return savedStreak
    ? JSON.parse(savedStreak)
    : 1;

});
useEffect(() => {

  localStorage.setItem(
    "moodHistory",
    JSON.stringify(history)
  );

}, [history]);

useEffect(() => {

  localStorage.setItem(
    "moodStreak",
    JSON.stringify(streak)
  );

}, [streak]);



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
let progressMessage = "";
let moodEmoji = "💖";
let greeting = "";
let randomQuote = "";
let musicSuggestion = "";
let progressColor = "#22c55e";
  // AFFIRMATIONS

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

  // STRESSED + SWEET

 if (selectedMood === "Stressed")
  {

    moodMessage =
      "It's okay to feel stressed. Your feelings are valid 💖";

    affirmation =
      stressAffirmations[
        Math.floor(
          Math.random() * stressAffirmations.length
        )
      ];

    insight =
      "Stress can increase sugar cravings because your body wants quick comfort and energy.";

    cravingReason =
      "Stress can increase cortisol levels, which may trigger sugar cravings for fast energy.";

    dailyChallenge =
      "Take a 5-minute break and avoid screens 🌿";

    personalizedTips = [
      "🧘 Take 5 deep breaths",
      "📵 Reduce screen time",
      "🚶 Take a short walk",
    ];

    foods = [
      "🍌 Banana with peanut butter",
      "🍫 Dark chocolate",
      "🥜 Nuts and yogurt",
    ];

  }

  // TIRED + JUNK FOOD
else if (selectedMood === "Tired")
   {

    moodMessage =
      "Your body may be asking for rest and recovery 🌙";

    affirmation =
      "Rest is productive too 🌙";

    insight =
      "Low energy and poor sleep can increase cravings for fast comfort foods.";

    cravingReason =
      "Lack of sleep can increase cravings for high-calorie comfort foods.";

    dailyChallenge =
      "Sleep 30 minutes earlier tonight 😴";

    personalizedTips = [
      "😴 Sleep earlier tonight",
      "💧 Stay hydrated",
      "🥗 Eat energy-rich healthy foods",
    ];

    foods = [
      "🥗 Protein sandwich",
      "🍎 Fruit smoothie",
      "🥜 Trail mix",
    ];

  }

  // ANXIOUS + CHOCOLATE
else if (selectedMood === "Anxious")
  {

    moodMessage =
      "You deserve calm and comfort right now 🌸";

    affirmation =
      anxiousAffirmations[
        Math.floor(
          Math.random() * anxiousAffirmations.length
        )
      ];

    insight =
      "Chocolate cravings may happen when you're emotionally overwhelmed or anxious.";

    cravingReason =
      "Anxiety may increase emotional eating as the brain searches for comfort.";

    dailyChallenge =
      "Do 10 deep breaths slowly 🌸";

    personalizedTips = [
      "🌸 Try grounding exercises",
      "🎵 Listen to calm music",
      "🫖 Drink herbal tea",
    ];

    foods = [
      "🍫 Dark chocolate",
      "🍵 Herbal tea",
      "🍓 Fruit with yogurt",
    ];

  }

  // PMS + CHOCOLATE
else if (selectedMood === "PMS")
  {

    moodMessage =
      "Hormonal mood swings can feel overwhelming. Be gentle with yourself 💕";

    affirmation =
      "Your body is doing a lot. Be kind to yourself 💕";

    insight =
      "Hormonal changes during periods can increase chocolate and sugar cravings.";

    cravingReason =
      "Hormonal fluctuations during periods can increase cravings for chocolate and sugar.";

    dailyChallenge =
      "Drink warm water and rest properly 💕";

    personalizedTips = [
      "💕 Rest without guilt",
      "🍫 Eat magnesium-rich foods",
      "🔥 Use a heating pad if needed",
    ];

    foods = [
      "🍫 Dark chocolate",
      "🥜 Magnesium-rich nuts",
      "🍌 Banana",
      "🍵 Herbal tea",
    ];

  }

  // REAL TIME EMOTION SCORE

  if (mentalTired) {
    emotionScore += 40;
  }

  if (overthinking) {
    emotionScore += 40;
  }

  if (selectedMood === "Stressed") {
    emotionScore += 20;
  }

  if (selectedMood === "Anxious") {
    emotionScore += 30;
  }

  if (selectedMood === "PMS") {
    emotionScore += 25;
  }

  if (emotionScore > 100) {
    emotionScore = 100;
  }

  // WELLNESS STATUS

  if (emotionScore <= 30) {

  wellnessStatus =
    "🌿 Low emotional stress detected.";

  progressColor = "#22c55e";

}

 else if (emotionScore <= 70) {

  wellnessStatus =
    "⚡ Moderate emotional pressure detected.";

  progressColor = "#facc15";

}

  else {

  wellnessStatus =
    "⚠ High emotional overload detected.";

  progressColor = "#ef4444";

}

  // HIDDEN EMOTION DETECTION

  if (
    mentalTired &&
    overthinking &&
    selectedMood === "Tired"
  ) {

    hiddenEmotion =
      "⚠ Possible burnout detected. Your mind may need deep rest.";

  }

  else if (
    overthinking &&
    selectedMood === "Anxious"
  ) {

    hiddenEmotion =
      "⚠ High anxiety pattern detected.";

  }

  else if (
    mentalTired &&
    selectedMood === "Stressed"
  ) {

    hiddenEmotion =
      "⚠ Emotional exhaustion detected.";

  }

  // DYNAMIC BACKGROUND

  let backgroundStyle =
    "linear-gradient(to bottom right, #ffe0ec, #ffd6f5, #f3e8ff)";

  if (selectedMood === "Stressed") {

    backgroundStyle =
      "linear-gradient(to bottom right, #ffd6d6, #ffe5e5, #fff0f0)";

  }

  else if (selectedMood === "Anxious") {

    backgroundStyle =
      "linear-gradient(to bottom right, #e0d4ff, #f3e8ff, #f8f0ff)";

  }

  else if (selectedMood === "Tired") {

    backgroundStyle =
      "linear-gradient(to bottom right, #dbeafe, #bfdbfe, #e0f2fe)";

  }

  else if (selectedMood === "PMS") {

    backgroundStyle =
      "linear-gradient(to bottom right, #ffd6ec, #ffe4f3, #fff0f7)";

  }
  if (selectedMood === "Stressed") {

  moodEmoji = "😣";

}

else if (selectedMood === "Anxious") {

  moodEmoji = "😟";

}

else if (selectedMood === "Tired") {

  moodEmoji = "😴";

}

else if (selectedMood === "Sad") {

  moodEmoji = "😔";

}

else if (selectedMood === "PMS") {

  moodEmoji = "🌸";

}
if (selectedMood === "Stressed") {

  musicSuggestion =
    "🎵 Calm piano or lo-fi music";

}

else if (selectedMood === "Anxious") {

  musicSuggestion =
    "🌿 Nature sounds or meditation music";

}

else if (selectedMood === "Tired") {

  musicSuggestion =
    "☀ Soft focus music or acoustic songs";

}

else if (selectedMood === "Sad") {

  musicSuggestion =
    "💖 Comfort music or uplifting songs";

}

else if (selectedMood === "PMS") {

  musicSuggestion =
    "🌸 Relaxing self-care playlists";

}
const quotes = [

  "🌸 Small steps every day matter.",

  "💖 Healing is not linear.",

  "🌿 Your emotions deserve attention.",

  "✨ Rest is productive too.",

  "💪 You are stronger than you think.",

];
const hour = new Date().getHours();

if (hour < 12) {

  greeting = "🌅 Good Morning";

}

else if (hour < 18) {

  greeting = "☀ Good Afternoon";

}

else {

  greeting = "🌙 Good Evening";

}
randomQuote =
  quotes[
    Math.floor(Math.random() * quotes.length)
  ];
// MOOD ANALYTICS

let moodCounts = {};

history.forEach((item) => {

  if (moodCounts[item.mood]) {

    moodCounts[item.mood]++;

  }

  else {

    moodCounts[item.mood] = 1;

  }

});
  return (

    <div
      style={{
        minHeight: "100vh",
        background: backgroundStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >

      <div
        style={{
          backgroundColor: darkMode ? "#1f2937" : "white",
          padding: "40px",
          borderRadius: "25px",
          width: "90%",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >

        {!started ? (

          <>

            <button
  onClick={() => setDarkMode(!darkMode)}

  style={{
    marginBottom: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: darkMode
      ? "#facc15"
      : "#111827",
    color: darkMode
      ? "black"
      : "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>

  {
    darkMode
      ? "☀ Light Mode"
      : "🌙 Dark Mode"
  }

</button>

<h1
  style={{
    fontSize: "50px",
    color: "#ff4f81",
  }}
>
  MoodBite {moodEmoji}
</h1>
<p
  style={{
    fontSize: "18px",
    marginTop: "-5px",
    color: darkMode ? "#e5e7eb" : "#555",
    lineHeight: "1.6",
  }}
>
  Understand your cravings emotionally,
  mentally, and hormonally.
</p>

            <input
              type="text"
              placeholder="Enter your name 💕"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginTop: "20px",
                padding: "12px",
                width: "80%",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />

            <button
              onClick={() => setStarted(true)}
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
<button
  onClick={() => {

    const report = history
      .map(
        (item) =>
          `${item.mood} → ${item.craving}`
      )
      .join("\n");

    const blob = new Blob(
      [report],
      { type: "text/plain" }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "MoodBite_Report.txt";

    a.click();

  }}

  style={{
    marginBottom: "20px",
    marginLeft: "10px",
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
          </>

        ) : (

          <>

            <h2
              style={{
                color: "#ff4f81",
                marginBottom: "20px",
              }}
            >
              {
                name
                  ? `How are you feeling today, ${name}? 🌸`
                  : "How are you feeling today? 🌸"
              }
            </h2>

            <div>

              <button
                onClick={() => setSelectedMood("Stressed")}
                style={buttonStyle}
              >
                😣 Stressed
              </button>

              <button
                onClick={() => setSelectedMood("Sad")}
                style={buttonStyle}
              >
                😔 Sad
              </button>

              <button
                onClick={() => setSelectedMood("Anxious")}
                style={buttonStyle}
              >
                😟 Anxious
              </button>

              <button
                onClick={() => setSelectedMood("Tired")}
                style={buttonStyle}
              >
                😴 Tired
              </button>

              <button
                onClick={() => setSelectedMood("Confused")}
                style={buttonStyle}
              >
                🤔 I don't know my mood
              </button>

              <button
                onClick={() => setSelectedMood("PMS")}
                style={buttonStyle}
              >
                🌸 Period Mood Swings
              </button>

            </div>

            {/* CONFUSED MOOD */}

            {selectedMood === "Confused" && (

              <div
                style={{
                  color: darkMode ? "white" : "black",
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#fdf0ff",
                  borderRadius: "15px",
                }}
              >

                <h3>
                  Let's understand how you're feeling 💭
                </h3>

                <p>Do you feel mentally tired?</p>

                <button
                  onClick={() => setMentalTired(true)}
                  style={buttonStyle}
                >
                  Yes
                </button>

                <button
                  onClick={() => setMentalTired(false)}
                  style={buttonStyle}
                >
                  No
                </button>

                <p>
                  Have you been overthinking lately?
                </p>

                <button
                  onClick={() => setOverthinking(true)}
                  style={buttonStyle}
                >
                  Yes
                </button>

                <button
                  onClick={() => setOverthinking(false)}
                  style={buttonStyle}
                >
                  No
                </button>

              </div>

            )}

            {selectedMood && (

              <>

                <h3
                  style={{
                    marginTop: "30px",
                    color: "#444",
                  }}
                >
                  What are you craving? 🍫
                </h3>

                <div>

                  <button
                    onClick={() => {

                      setSelectedCraving("Sweet");
                      setStreak(streak + 1);

                      setHistory([
                        ...history,
                        {
                          mood: selectedMood,
                          craving: "Sweet",
                        },
                      ]);

                    }}
                    style={cravingStyle}
                  >
                    🍭 Sweet
                  </button>

                  <button
                    onClick={() => {

                      setSelectedCraving("Spicy");
                      setStreak(streak + 1);

                      setHistory([
                        ...history,
                        {
                          mood: selectedMood,
                          craving: "Spicy",
                        },
                      ]);

                    }}
                    style={cravingStyle}
                  >
                    🌶 Spicy
                  </button>

                  <button
                    onClick={() => {

                      setSelectedCraving("Chocolate");
                      setStreak(streak + 1);

                      setHistory([
                        ...history,
                        {
                          mood: selectedMood,
                          craving: "Chocolate",
                        },
                      ]);

                    }}
                    style={cravingStyle}
                  >
                    🍫 Chocolate
                  </button>

                  <button
                    onClick={() => {

                      setSelectedCraving("Junk Food");
                      setStreak(streak + 1);

                      setHistory([
                        ...history,
                        {
                          mood: selectedMood,
                          craving: "Junk Food",
                        },
                      ]);

                    }}
                    style={cravingStyle}
                  >
                    🍔 Junk Food
                  </button>

                </div>

                {selectedCraving && (

                  <div
                    style={{
                      marginTop: "30px",
                      padding: "20px",
                      backgroundColor: "#fff0f5",
                      borderRadius: "15px",
                    }}
                  >

                    <h3>AI Insight 💡</h3>

                    <p
                      style={{
                        color: "#ff4f81",
                        fontWeight: "bold",
                      }}
                    >
                      {
                        name
                          ? `${name}, ${moodMessage}`
                          : moodMessage
                      }
                    </p>

                    <p>{insight}</p>

                    {/* WHY CRAVING */}

                    <div
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >

                      <h3>Why This Craving Happens 🧠</h3>

                      <p>{cravingReason}</p>

                    </div>

                    {/* EMOTION SCORE */}

                    <div
                      style={{
                        marginTop: "15px",
                      }}
                    >

                      <h3>Emotion Intensity 📊</h3>

                      <div
                        style={{
                          height: "20px",
                          backgroundColor: "#eee",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >

                        <div
  style={{
    width: `${emotionScore}%`,
    height: "100%",
    backgroundColor: progressColor,
  }}
/>

                      </div>

                      <p>
                        {emotionScore}% Emotional Intensity
                      </p>

                      <p
                        style={{
                          marginTop: "10px",
                          fontWeight: "bold",
                          color: "#ff4f81",
                        }}
                      >
                        {wellnessStatus}
                      </p>

                    </div>

                    {/* HIDDEN EMOTION */}

                    {
                      hiddenEmotion && (

                        <div
                          style={{
                            marginTop: "15px",
                            backgroundColor: "#fff3f3",
                            padding: "12px",
                            borderRadius: "12px",
                          }}
                        >

                          <h3>
                            Hidden Emotional Pattern 🔍
                          </h3>

                          <p>{hiddenEmotion}</p>

                        </div>

                      )
                    }

                    {/* AFFIRMATION */}

                    <div
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >

                      <h3>Daily Affirmation ✨</h3>

                      <p>{affirmation}</p>

                    </div>

                    {/* CHALLENGE */}

                    <div
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >

                      <h3>Today's Wellness Challenge 🎯</h3>

                      <p>{dailyChallenge}</p>

                    </div>

                    {/* FOODS */}

                    <div
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                    >

                      <h3>Recommended Foods 🍽</h3>

                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                        }}
                      >

                        {
                          foods.map((food, index) => (

                            <li key={index}>
                              {food}
                            </li>

                          ))
                        }

                      </ul>

                    </div>

                    {/* SELF CARE */}

                    <div
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#fff",
                        padding: "15px",
                        borderRadius: "12px",
                      }}
                    >

                      <h3>Self-Care Tips 🌿</h3>

                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                        }}
                      >

                        {
                          personalizedTips.map((tip, index) => (

                            <li key={index}>
                              {tip}
                            </li>

                          ))
                        }

                      </ul>

                    </div>
                    
{/* MUSIC THERAPY */}

<div
  style={{
    marginTop: "15px",
    backgroundColor: "#fff",
    padding: "12px",
    borderRadius: "12px",
  }}
>

  <h3>Music Therapy 🎵</h3>

  <p>{musicSuggestion}</p>

</div>

                      <h3>Music Therapy 🎵</h3>

                      <p>{musicSuggestion}</p>

                    </div>
                  )}

                {/* HISTORY */}

                {
                  history.length > 0 && (

                    <div
                      style={{
                        marginTop: "30px",
                        padding: "20px",
                        backgroundColor: "#f8f0ff",
                        borderRadius: "15px",
                      }}
                    >

                      {/* STREAK */}

                      <div
                        style={{
                          marginBottom: "20px",
                          backgroundColor: "#fff",
                          padding: "12px",
                          borderRadius: "12px",
                        }}
                      >

                        <h3>🔥 Wellness Streak</h3>

                        <p>
                          {streak} Day Emotional Check-In
                        </p>

                      </div>
<div
  style={{
    marginBottom: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "12px",
  }}
>

  <h3>Mood Analytics 📈</h3>

  {
    Object.entries(moodCounts).map(
      ([mood, count]) => (

        <p key={mood}>
          {mood} → {count} times
        </p>

      )
    )
  }

</div>
                      <button
  onClick={() => {

    setHistory([]);

    setStreak(1);

    localStorage.removeItem("moodHistory");

    localStorage.removeItem("moodStreak");

  }}

  style={{
    marginBottom: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#ff4f81",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>

  Reset Wellness Data 🧹

</button>
                      <h3>Your Mood History 📖</h3>

                      {
                        history.map((item, index) => (

                          <p key={index}>
                            {item.mood} → {item.craving}
                          </p>

                        ))
                      }

                    </div>

                  )
                }

              </>

            )}

          </>

        )}

      </div>

    </div>

  );

}

const buttonStyle = {
  margin: "10px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#ffe4ef",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const cravingStyle = {
  margin: "10px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#f3e8ff",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
}