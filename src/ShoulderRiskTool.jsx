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

  if (splash && !bookingCode) {
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
          onClick={() => setSplash(false)}
          disabled={!bookingCode}
          className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {t.start}
        </button>
      </div>
    );
  }

  if (confirmed !== null) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-6">
        <h2 className="text-2xl font-bold mb-4">{t.summaryTitle}</h2>
        <p>{t.riskScore}: <strong>{score} / 10</strong></p>
        <p className="my-2 italic">{getRiskInterpretation(score)}</p>
        <ul className="my-4 list-disc list-inside text-sm">
          <li>{t.age}: {age}</li>
          <li>{t.sex}: {sex}</li>
          <li>Elbow Hyperextension: {elbow ? "Yes" : "No"}</li>
          <li>Thumb to Forearm: {thumb ? "Yes" : "No"}</li>
          <li>Little Finger >90°: {littleFinger ? "Yes" : "No"}</li>
          <li>Previous Subluxation: {sublux ? "Yes" : "No"}</li>
          <li>Previous Dislocation: {dislocation ? "Yes" : "No"}</li>
          <li>Operative Treatment: {operative ? "Yes" : "No"}</li>
          <li>Apprehension Test: {apprehension ? "Yes" : "No"}</li>
          <li>Skydive Test: {skydiveTest ? "Yes" : "No"}</li>
        </ul>
        <p className="text-center font-semibold mt-6">{confirmed ? t.finalYes : t.finalNo}</p>
        <p className="text-xs mt-2 text-gray-500">{t.summaryNote}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="p-1 rounded border">
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="fr">FR</option>
            <option value="it">IT</option>
            <option value="nl">NL</option>
            <option value="es">ES</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">{t.age}</label>
              <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full border p-2 rounded">
                <option value="<16">Under 16</option>
                <option value="16-25">16–25</option>
                <option value="25-30">25–30</option>
                <option value="30-35">30–35</option>
                <option value=">35">Over 35</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">{t.sex}</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full border p-2 rounded">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {renderSwitch("Elbow Hyperextension >10°", elbow, setElbow)}
          {renderSwitch("Thumb to Forearm", thumb, setThumb)}
          {renderSwitch("Little Finger >90°", littleFinger, setLittleFinger)}
          {renderSwitch("Previous Subluxation", sublux, setSublux)}
          {renderSwitch("Previous Dislocation", dislocation, setDislocation)}
          {renderSwitch("Operative Treatment (if dislocation)", operative, setOperative)}
          {renderSwitch("Positive Apprehension Test", apprehension, setApprehension)}
          {renderSwitch("Positive Functional Skydive Test", skydiveTest, setSkydiveTest)}

          {!showResult && (
            <button
              onClick={() => setShowResult(true)}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {t.showScore}
            </button>
          )}

          {showResult && (
            <div className="mt-6">
              <p className="text-lg font-medium">{t.riskScore}: <strong>{score} / 10</strong></p>
              <p className="text-sm italic my-2">{getRiskInterpretation(score)}</p>
              <div className="w-full h-6 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative">
                <div style={{ width: `${(score / 10) * 100}%` }} className="h-full bg-black/30 rounded-full transition-all" />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setConfirmed(true)} className="bg-green-600 text-white px-4 py-2 rounded">
                  {t.yes}
                </button>
                <button onClick={() => setConfirmed(false)} className="bg-red-600 text-white px-4 py-2 rounded">
                  {t.no}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
