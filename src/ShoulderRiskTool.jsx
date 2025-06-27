// Updated full app: multilingual, dark mode, splash, risk scoring, summary output
import React, { useState, useEffect, useRef } from "react";

export default function ShoulderRiskTool() {
  const [age, setAge] = useState("16-25");
  const [sex, setSex] = useState("male");
  const [elbow, setElbow] = useState(false);
  const [thumb, setThumb] = useState(false);
  const [littleFinger, setLittleFinger] = useState(false);
  const [sublux, setSublux] = useState(false);
  const [dislocation, setDislocation] = useState(false);
  const [operative, setOperative] = useState(false);
  const [apprehension, setApprehension] = useState(false);
  const [skydiveTest, setSkydiveTest] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [splash, setSplash] = useState(true);
  const [bookingCode, setBookingCode] = useState("");
  const [codeEntered, setCodeEntered] = useState(false);
  const [consent, setConsent] = useState(false);

  const sessionId = useRef(crypto.randomUUID());

  const baseTranslation = {
    title: "SkyLux: Shoulder Risk Scanner",
    showScore: "Show My Risk Score",
    riskScore: "Your Risk Score",
    age: "Age Group",
    sex: "Biological Sex",
    export: "Export Data as CSV",
    language: "Language",
    confirm: "Do you still want to fly?",
    yes: "Yes, I want to fly",
    no: "No, I prefer not to",
    saved: "✔ Response saved.",
    consentLabel: "I consent to anonymized data use for safety and research purposes.",
    resultLow: "Your risk of shoulder injury is very low.",
    resultModerate: "Your risk of shoulder injury is moderate.",
    resultHigh: "Your risk of shoulder injury is high.",
    finalYes: "Great – have fun flying!",
    finalNo: "Smart choice – enjoy a drink and relax!",
    summaryTitle: "Assessment Summary",
    summaryNote: "Please show this screen to your instructor."
  };

  const translations = {
    en: baseTranslation,
    de: { ...baseTranslation, sex: "Biologisches Geschlecht" },
    fr: { ...baseTranslation, sex: "Sexe biologique" },
    it: { ...baseTranslation, sex: "Sesso biologico" },
    nl: { ...baseTranslation, sex: "Biologisch geslacht" },
    es: { ...baseTranslation, sex: "Sexo biológico" }
  };

  const t = translations[lang] || translations.en;

  const getRiskInterpretation = (score) => {
    if (score < 3) return t.resultLow;
    if (score < 6) return t.resultModerate;
    return t.resultHigh;
  };

  const getScore = () => {
    let score = 0;
    if (age === "16-25") score += 3;
    else if (age === "25-30") score += 2;
    else if (age === "30-35") score += 1;
    if (sex === "male") score += 1;
    if (elbow) score += 1;
    if (thumb) score += 1;
    if (littleFinger) score += 1;
    if (sublux) score += 3;
    if (dislocation) score += 4;
    if (dislocation && operative) score -= 2;
    if (apprehension) score += 4;
    if (skydiveTest) score += 3;
    return Math.min(10, Math.round((score / 16) * 10 * 10) / 10);
  };

  const score = getScore();

  const renderSwitch = (label, state, setter, infoText) => (
    <div className="flex justify-between items-start border-b py-4 hover:bg-blue-50 transition duration-200">
      <div className="text-sm w-4/5">
        <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
        <p className="text-xs text-blue-500 mt-1 italic">{infoText}</p>
      </div>
      <input
        type="checkbox"
        checked={state}
        onChange={(e) => setter(e.target.checked)}
        className="h-5 w-5 mt-1 accent-blue-600"
      />
    </div>
  );

  if (confirmed !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-6">{t.summaryTitle}</h1>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">{t.summaryNote}</p>
          <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 mb-4">
            <li><strong>{t.age}:</strong> {age}</li>
            <li><strong>{t.sex}:</strong> {sex}</li>
            <li><strong>Elbow Hyperextension:</strong> {elbow ? "Yes" : "No"}</li>
            <li><strong>Thumb to Forearm:</strong> {thumb ? "Yes" : "No"}</li>
            <li><strong>Little Finger {'>'}90°:</strong> {littleFinger ? "Yes" : "No"}</li>
            <li><strong>Previous Subluxation:</strong> {sublux ? "Yes" : "No"}</li>
            <li><strong>Previous Dislocation:</strong> {dislocation ? "Yes" : "No"}</li>
            <li><strong>Operative Treatment:</strong> {operative ? "Yes" : "No"}</li>
            <li><strong>Apprehension Test:</strong> {apprehension ? "Yes" : "No"}</li>
            <li><strong>Skydive Test:</strong> {skydiveTest ? "Yes" : "No"}</li>
            <li><strong>{t.riskScore}:</strong> {score} / 10</li>
            <li><strong>Interpretation:</strong> {getRiskInterpretation(score)}</li>
          </ul>
          <p className="text-center text-xl font-bold text-indigo-800 dark:text-indigo-300 mt-6">
            {confirmed ? t.finalYes : t.finalNo}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-300">{t.title}</h1>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-white text-black border rounded p-2 text-sm"
          >
            {Object.keys(translations).map((key) => (
              <option key={key} value={key}>{key.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {!showResult && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">{t.age}</label>
                <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full border rounded-xl p-3">
                  <option value="<16">Under 16</option>
                  <option value="16-25">16–25</option>
                  <option value="25-30">25–30</option>
                  <option value="30-35">30–35</option>
                  <option value=">35">Over 35</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">{t.sex}</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full border rounded-xl p-3">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-600">
              {renderSwitch("Elbow Hyperextension >10°", elbow, setElbow, "Check if elbow extends beyond 10°.")}
              {renderSwitch("Thumb to Forearm", thumb, setThumb, "Thumb touches forearm?")}
              {renderSwitch("Little Finger >90°", littleFinger, setLittleFinger, "Pinky bends back beyond 90°?")}
              {renderSwitch("Previous Subluxation", sublux, setSublux, "Any past partial dislocations?")}
              {renderSwitch("Previous Dislocation", dislocation, setDislocation, "Full dislocation in the past?")}
              {renderSwitch("Operative Treatment", operative, setOperative, "Surgical treatment after dislocation?")}
              {renderSwitch("Apprehension Test", apprehension, setApprehension, "Fear or instability in ER?")}
              {renderSwitch("Skydive Test", skydiveTest, setSkydiveTest, "Instability in flight posture?")}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span className="text-xs text-gray-600 dark:text-gray-300">{t.consentLabel}</span>
            </div>

            <button
              onClick={() => setShowResult(true)}
              disabled={!consent}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl disabled:opacity-50"
            >
              {t.showScore}
            </button>
          </div>
        )}

        {showResult && (
          <div className="mt-8 space-y-6">
            <p className="text-xl font-semibold text-center">{t.riskScore}: <span className="font-bold">{score} / 10</span></p>
            <p className="text-center text-sm italic">{getRiskInterpretation(score)}</p>
            <div className="w-full h-6 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 relative">
              <div
                style={{ width: `${(score / 10) * 100}%` }}
                className="h-full bg-black/30 rounded-full transition-all duration-300"
              />
            </div>

            <div className="text-center">
              <p className="text-lg font-medium mt-6 mb-2">{t.confirm}</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setConfirmed(true)} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">{t.yes}</button>
                <button onClick={() => setConfirmed(false)} className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">{t.no}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
