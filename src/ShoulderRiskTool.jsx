// Full SkyLux Tool - Multilingual, Dark Mode, Booking Splash, Summary Page
import React, { useState, useRef, useEffect } from "react";

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
  const [consentGiven, setConsentGiven] = useState(false);

  const sessionId = useRef(crypto.randomUUID());

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
    start: "Start",
    consent: "I understand this does not replace medical advice.",
    elbow: "Elbow Hyperextension >10°",
    thumb: "Thumb to Forearm",
    littleFinger: "Little Finger >90°",
    sublux: "Previous Subluxation",
    dislocation: "Previous Dislocation",
    operative: "Operative Treatment (if dislocation)",
    apprehension: "Positive Apprehension Test",
    skydiveTest: "Positive Functional Skydive Test"
  };

  const translations = {
    en: baseTranslation,
    de: { ...baseTranslation, title: "SkyLux: Schulterrisiko-Scanner", age: "Altersgruppe", sex: "Biologisches Geschlecht", showScore: "Risiko anzeigen", riskScore: "Dein Risikowert", resultLow: "Dein Risiko ist sehr gering.", resultModerate: "Dein Risiko ist moderat.", resultHigh: "Dein Risiko ist hoch.", finalYes: "Viel Spaß beim Fliegen!", finalNo: "Gute Entscheidung – entspann dich bei einem Getränk.", summaryTitle: "Zusammenfassung", summaryNote: "Zeige dies deinem Instruktor.", enterBooking: "Buchungsnummer eingeben, um fortzufahren", start: "Starten", consent: "Ich verstehe, dass dies keinen medizinischen Rat ersetzt." },
    fr: { ...baseTranslation, title: "SkyLux: Scanner de risque à l'épaule", age: "Tranche d'âge", sex: "Sexe biologique", showScore: "Afficher mon score de risque", riskScore: "Votre score de risque", resultLow: "Votre risque est très faible.", resultModerate: "Votre risque est modéré.", resultHigh: "Votre risque est élevé.", finalYes: "Bon vol!", finalNo: "Bonne décision – détendez-vous!", summaryTitle: "Résumé de l'évaluation", summaryNote: "Montrez ceci à votre instructeur.", enterBooking: "Entrez votre numéro de réservation pour continuer", start: "Commencer", consent: "Je comprends que cela ne remplace pas un avis médical." },
    it: { ...baseTranslation },
    nl: { ...baseTranslation },
    es: { ...baseTranslation }
  };

  const t = translations[lang] || translations.en;

  const score = (() => {
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
  })();

  if (splash) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 dark:text-white">{t.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{t.enterBooking}</p>
        <input value={bookingCode} onChange={(e) => setBookingCode(e.target.value)} className="border border-gray-400 rounded px-4 py-2 mb-4" placeholder="#12345" />
        <div className="mb-4">
          <label className="mr-2 text-sm text-gray-600">{t.language}</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="p-1 rounded border">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input type="checkbox" id="consent" className="accent-blue-500" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} />
          <label htmlFor="consent" className="text-xs text-gray-700 dark:text-gray-300">{t.consent}</label>
        </div>
        <button onClick={() => { if (bookingCode.trim() && consentGiven) setSplash(false); }} className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={!bookingCode.trim() || !consentGiven}>{t.start}</button>
      </div>
    );
  }

  if (confirmed !== null) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">{confirmed ? t.finalYes : t.finalNo}</h2>
        <p className="mb-2">{t.summaryNote}</p>
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <h3 className="font-semibold mb-2">{t.summaryTitle}</h3>
          <ul className="text-sm text-left space-y-1">
            <li>{t.age}: {age}</li>
            <li>{t.sex}: {sex}</li>
            <li>{t.elbow}: {elbow ? "✔" : "✘"}</li>
            <li>{t.thumb}: {thumb ? "✔" : "✘"}</li>
            <li>{t.littleFinger}: {littleFinger ? "✔" : "✘"}</li>
            <li>{t.sublux}: {sublux ? "✔" : "✘"}</li>
            <li>{t.dislocation}: {dislocation ? "✔" : "✘"}</li>
            <li>{t.operative}: {operative ? "✔" : "✘"}</li>
            <li>{t.apprehension}: {apprehension ? "✔" : "✘"}</li>
            <li>{t.skydiveTest}: {skydiveTest ? "✔" : "✘"}</li>
            <li>{t.riskScore}: {score} / 10</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">{t.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-bold mb-1">{t.age}</label>
          <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full border rounded-xl p-2">
            <option value="<16">Under 16</option>
            <option value="16-25">16–25</option>
            <option value="25-30">25–30</option>
            <option value="30-35">30–35</option>
            <option value=">35">Over 35</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">{t.sex}</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full border rounded-xl p-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      {[{ key: "elbow", state: elbow, setter: setElbow }, { key: "thumb", state: thumb, setter: setThumb }, { key: "littleFinger", state: littleFinger, setter: setLittleFinger }, { key: "sublux", state: sublux, setter: setSublux }, { key: "dislocation", state: dislocation, setter: setDislocation }, { key: "operative", state: operative, setter: setOperative }, { key: "apprehension", state: apprehension, setter: setApprehension }, { key: "skydiveTest", state: skydiveTest, setter: setSkydiveTest }].map(({ key, state, setter }) => (
        <div key={key} className="flex justify-between items-center border-b py-3">
          <span className="text-sm">{t[key]}</span>
          <input type="checkbox" checked={state} onChange={(e) => setter(e.target.checked)} className="h-5 w-5 accent-indigo-600" />
        </div>
      ))}
      {!showResult ? (
        <button onClick={() => setShowResult(true)} className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
          {t.showScore}
        </button>
      ) : (
        <div className="mt-6 space-y-4 text-center">
          <p className="text-lg font-semibold">{t.riskScore}: <span className="font-bold">{score} / 10</span></p>
          <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" style={{ width: `${(score / 10) * 100}%` }} />
          </div>
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {score < 3 ? t.resultLow : score < 7 ? t.resultModerate : t.resultHigh}
          </p>
          <p className="font-medium mt-2">{t.confirm}</p>
          <div className="flex justify-center gap-4 mt-2">
            <button onClick={() => setConfirmed(true)} className="bg-green-500 text-white px-4 py-2 rounded-xl">{t.yes}</button>
            <button onClick={() => setConfirmed(false)} className="bg-red-500 text-white px-4 py-2 rounded-xl">{t.no}</button>
          </div>
        </div>
      )}
    </div>
  );
}
