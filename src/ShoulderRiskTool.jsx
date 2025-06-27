// Updated styling, language selection, score logic, and follow-up confirmation with interpretation and final message
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
    finalNo: "Smart choice – enjoy a drink and relax!"
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
        <p className="font-semibold text-gray-800">{label}</p>
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

  if (splash || !codeEntered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full space-y-6">
          <h1 className="text-2xl font-bold text-center text-indigo-800">Welcome to SkyLux Risk Scanner</h1>
          <div>
            <label className="block font-medium text-sm mb-1">Booking Code</label>
            <input
              type="text"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              placeholder="Enter your booking code"
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <span className="text-gray-600 text-sm font-normal">{t.consentLabel}</span>
          </div>
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700">{t.language}</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="ml-2 border p-1 rounded-md">
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="nl">Nederlands</option>
              <option value="es">Español</option>
            </select>
          </div>
          <button
            disabled={!bookingCode || !consent}
            onClick={() => {
              setCodeEntered(true);
              setSplash(false);
            }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight">{t.title}</h1>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {confirmed === null && !showResult && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700">{t.age}</label>
                  <select
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="<16">Under 16</option>
                    <option value="16-25">16–25</option>
                    <option value="25-30">25–30</option>
                    <option value="30-35">30–35</option>
                    <option value=">35">Over 35</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700">{t.sex}</label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full mt-2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {renderSwitch("Elbow Hyperextension >10°", elbow, setElbow, "Elbow extends more than 10° past neutral")}
                {renderSwitch("Thumb to Forearm", thumb, setThumb, "Thumb can touch the forearm")}
                {renderSwitch("Little Finger >90°", littleFinger, setLittleFinger, "Pinky can bend backward beyond 90°")}
                {renderSwitch("Previous Subluxation", sublux, setSublux, "History of partial shoulder dislocation")}
                {renderSwitch("Previous Dislocation", dislocation, setDislocation, "Full dislocation that required reduction")}
                {renderSwitch("Operative Treatment (if dislocation)", operative, setOperative, "Was surgery performed?")}
                {renderSwitch("Positive Apprehension Test", apprehension, setApprehension, "Fear or instability during external rotation")}
                {renderSwitch("Positive Functional Skydive Test", skydiveTest, setSkydiveTest, "Fear/instability in simulated skydive posture")}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
                >
                  {t.showScore}
                </button>
              </div>
            </>
          )}

          {showResult && confirmed === null && (
            <div className="text-center space-y-4 pt-6">
              <p className="text-xl font-semibold text-indigo-700">
                {t.riskScore}: <span className="font-bold">{score} / 10</span>
              </p>
              <p className="text-sm text-gray-600">{getRiskInterpretation(score)}</p>
              <div className="w-full h-6 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative shadow-inner">
                <div
                  style={{ width: `${(score / 10) * 100}%` }}
                  className="h-full bg-black/30 rounded-full transition-all duration-300"
                />
              </div>
              <div className="mt-4">
                <p className="text-md font-medium text-gray-700">{t.confirm}</p>
                <div className="flex justify-center gap-4 mt-3">
                  <button
                    onClick={() => setConfirmed(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    {t.yes}
                  </button>
                  <button
                    onClick={() => setConfirmed(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    {t.no}
                  </button>
                </div>
              </div>
            </div>
          )}

          {confirmed !== null && (
            <div className="text-center pt-10">
              <p className="text-2xl font-bold text-indigo-700">
                {confirmed ? t.finalYes : t.finalNo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
