// Full SkyLux Tool - Multilingual, Dark Mode, Booking Splash, Summary Page
import React, { useState, useRef } from "react";

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
  const [lang, setLang] = useState("en");
  const [splash, setSplash] = useState(true);
  const [bookingCode, setBookingCode] = useState("");

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
    resultLow: "Your risk of shoulder injury is very low.",
    resultModerate: "Your risk of shoulder injury is moderate.",
    resultHigh: "Your risk of shoulder injury is high.",
    finalYes: "Great – have fun flying!",
    finalNo: "Smart choice – enjoy a drink and relax!",
    summaryTitle: "Assessment Summary",
    summaryNote: "Please show this screen to your instructor.",
    enterBooking: "Enter your booking number to continue",
    start: "Start"
  };

  const translations = {
    en: baseTranslation,
    de: { ...baseTranslation, sex: "Biologisches Geschlecht", enterBooking: "Buchungsnummer eingeben, um fortzufahren", start: "Starten" },
    fr: { ...baseTranslation, sex: "Sexe biologique", enterBooking: "Entrez votre numéro de réservation pour continuer", start: "Commencer" },
    it: { ...baseTranslation, sex: "Sesso biologico", enterBooking: "Inserisci il numero di prenotazione per continuare", start: "Inizia" },
    nl: { ...baseTranslation, sex: "Biologisch geslacht", enterBooking: "Voer je boekingsnummer in om door te gaan", start: "Start" },
    es: { ...baseTranslation, sex: "Sexo biológico", enterBooking: "Ingrese su número de reserva para continuar", start: "Comenzar" }
  };

  const t = translations[lang] || translations.en;

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

  const getRiskInterpretation = (score) => {
    if (score < 3) return t.resultLow;
    if (score < 6) return t.resultModerate;
    return t.resultHigh;
  };

  const renderSwitch = (label, state, setter) => (
    <div className="flex justify-between items-start border-b py-4">
      <div className="text-sm">
        <p className="font-semibold text-gray-800 dark:text-white">{label}</p>
      </div>
      <input
        type="checkbox"
        checked={state}
        onChange={(e) => setter(e.target.checked)}
        className="h-5 w-5 mt-1 accent-blue-600"
      />
    </div>
  );

  if (splash) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 dark:text-white">{t.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{t.enterBooking}</p>
        <input
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 mb-4"
          placeholder="#12345"
        />
        <div className="mb-4">
          <label className="mr-2 text-sm text-gray-600">{t.language}</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="p-1 rounded border"
          >
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
            <option value="es">Español</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (bookingCode.trim()) setSplash(false);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {t.start}
        </button>
      </div>
    );
  }

  if (confirmed !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold">{t.summaryTitle}</h2>
          <p className="text-sm text-gray-500">{t.summaryNote}</p>
          <div className="space-y-1 text-sm">
            <p><strong>{t.age}:</strong> {age}</p>
            <p><strong>{t.sex}:</strong> {sex}</p>
            <p><strong>Elbow Hyperextension:</strong> {elbow ? "Yes" : "No"}</p>
            <p><strong>Thumb to Forearm:</strong> {thumb ? "Yes" : "No"}</p>
            <p><strong>Little Finger >90°:</strong> {littleFinger ? "Yes" : "No"}</p>
            <p><strong>Previous Subluxation:</strong> {sublux ? "Yes" : "No"}</p>
            <p><strong>Previous Dislocation:</strong> {dislocation ? "Yes" : "No"}</p>
            <p><strong>Operative Treatment:</strong> {operative ? "Yes" : "No"}</p>
            <p><strong>Apprehension Test:</strong> {apprehension ? "Yes" : "No"}</p>
            <p><strong>Skydive Test:</strong> {skydiveTest ? "Yes" : "No"}</p>
          </div>
          <div className="font-semibold mt-4">
            {confirmed ? t.finalYes : t.finalNo}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800 dark:text-white">{t.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-white">{t.age}</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3"
            >
              <option value="<16">Under 16</option>
              <option value="16-25">16–25</option>
              <option value="25-30">25–30</option>
              <option value="30-35">30–35</option>
              <option value=">35">Over 35</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-white">{t.sex}</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-xl p-3"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {renderSwitch("Elbow Hyperextension >10°", elbow, setElbow)}
          {renderSwitch("Thumb to Forearm", thumb, setThumb)}
          {renderSwitch("Little Finger >90°", littleFinger, setLittleFinger)}
          {renderSwitch("Previous Subluxation", sublux, setSublux)}
          {renderSwitch("Previous Dislocation", dislocation, setDislocation)}
          {renderSwitch("Operative Treatment (if dislocation)", operative, setOperative)}
          {renderSwitch("Positive Apprehension Test", apprehension, setApprehension)}
          {renderSwitch("Positive Functional Skydive Test", skydiveTest, setSkydiveTest)}
        </div>

        {!showResult ? (
          <div className="text-center">
            <button
              onClick={() => setShowResult(true)}
              className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              {t.showScore}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 pt-6">
            <p className="text-xl font-semibold text-indigo-700 dark:text-white">
              {t.riskScore}: <span className="font-bold">{score} / 10</span>
            </p>
            <div className="w-full h-6 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative shadow-inner">
              <div
                style={{ width: `${(score / 10) * 100}%` }}
                className="h-full bg-black/20 rounded-full transition-all duration-300"
              />
            </div>
            <p className="italic text-sm text-gray-600 dark:text-gray-300">{getRiskInterpretation(score)}</p>

            <div className="space-x-4">
              <button
                onClick={() => setConfirmed(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:opacity-90"
              >
                {t.yes}
              </button>
              <button
                onClick={() => setConfirmed(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-xl hover:opacity-90"
              >
                {t.no}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
