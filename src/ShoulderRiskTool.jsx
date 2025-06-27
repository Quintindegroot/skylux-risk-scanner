import React, { useState, useRef, useEffect } from "react";

// Translation tables – fully covered for "de", "en", "fr" for all UI text!
const translations = {
  en: {
    title: "SkyLux: Shoulder Risk Scanner",
    showScore: "Show My Risk Score",
    riskScore: "Your Risk Score",
    age: "Age Group",
    sex: "Biological Sex",
    sexMale: "Male",
    sexFemale: "Female",
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
    consent: "I agree to data usage for improving the tool and scientific research. I understand this does not replace medical advice.",
    elbow: "Elbow Hyperextension >10°",
    elbowInfo: "Does your elbow extend more than 10° past straight?",
    thumb: "Thumb to Forearm",
    thumbInfo: "Can your thumb touch your forearm?",
    littleFinger: "Little Finger >90°",
    littleFingerInfo: "Can your pinky extend back beyond 90°?",
    sublux: "Previous Subluxation",
    subluxInfo: "History of a partial shoulder dislocation (subluxation)?",
    dislocation: "Previous Dislocation",
    dislocationInfo: "Has there been a full shoulder dislocation needing reduction?",
    operative: "Operative Treatment (if dislocation)",
    operativeInfo: "Was the dislocation treated surgically?",
    apprehension: "Positive Apprehension Test",
    apprehensionInfo: "Fear or instability in external rotation?",
    skydiveTest: "Positive Functional Skydive Test",
    skydiveTestInfo: "Instability or fear in a simulated skydive posture?"
  },
  de: {
    title: "SkyLux: Schulterrisiko-Scanner",
    showScore: "Risiko anzeigen",
    riskScore: "Dein Risikowert",
    age: "Altersgruppe",
    sex: "Biologisches Geschlecht",
    sexMale: "Männlich",
    sexFemale: "Weiblich",
    export: "Daten als CSV exportieren",
    language: "Sprache",
    confirm: "Willst du trotzdem fliegen?",
    yes: "Ja, ich möchte fliegen",
    no: "Nein, ich möchte lieber nicht",
    saved: "✔ Antwort gespeichert.",
    resultLow: "Dein Risiko ist sehr gering.",
    resultModerate: "Dein Risiko ist moderat.",
    resultHigh: "Dein Risiko ist hoch.",
    finalYes: "Viel Spaß beim Fliegen!",
    finalNo: "Gute Entscheidung – entspann dich bei einem Getränk.",
    summaryTitle: "Zusammenfassung",
    summaryNote: "Zeige dies deinem Instruktor.",
    enterBooking: "Buchungsnummer eingeben, um fortzufahren",
    start: "Starten",
    consent: "Ich stimme der Nutzung meiner Daten zur Verbesserung des Tools und für wissenschaftliche Forschung zu. Ich verstehe, dass dies keinen medizinischen Rat ersetzt.",
    elbow: "Überstreckung des Ellenbogens >10°",
    elbowInfo: "Überstreckt sich dein Ellenbogen mehr als 10° über das gerade Maß hinaus?",
    thumb: "Daumen zum Unterarm",
    thumbInfo: "Kann dein Daumen den Unterarm berühren?",
    littleFinger: "Kleiner Finger >90°",
    littleFingerInfo: "Kann dein kleiner Finger weiter als 90° nach hinten gebogen werden?",
    sublux: "Vorherige Subluxation",
    subluxInfo: "Gab es schon einmal eine teilweise Schulterausrenkung (Subluxation)?",
    dislocation: "Vorherige Luxation",
    dislocationInfo: "Gab es schon einmal eine komplette Schulterluxation, die wieder eingerenkt werden musste?",
    operative: "Operative Behandlung (bei Luxation)",
    operativeInfo: "Wurde die Luxation operativ behandelt?",
    apprehension: "Positiver Apprehension-Test",
    apprehensionInfo: "Angst oder Instabilität bei Außenrotation?",
    skydiveTest: "Positiver Skydive-Funktionstest",
    skydiveTestInfo: "Instabilität oder Angst in der simulierten Skydive-Position?"
  },
  fr: {
    title: "SkyLux : Scanner de risque à l'épaule",
    showScore: "Afficher mon score de risque",
    riskScore: "Votre score de risque",
    age: "Tranche d'âge",
    sex: "Sexe biologique",
    sexMale: "Homme",
    sexFemale: "Femme",
    export: "Exporter les données au format CSV",
    language: "Langue",
    confirm: "Voulez-vous toujours voler ?",
    yes: "Oui, je veux voler",
    no: "Non, je préfère ne pas voler",
    saved: "✔ Réponse enregistrée.",
    resultLow: "Votre risque de blessure à l'épaule est très faible.",
    resultModerate: "Votre risque de blessure à l'épaule est modéré.",
    resultHigh: "Votre risque de blessure à l'épaule est élevé.",
    finalYes: "Super – amusez-vous bien en volant !",
    finalNo: "Bon choix – profitez d'une boisson et détendez-vous !",
    summaryTitle: "Résumé de l'évaluation",
    summaryNote: "Veuillez montrer cet écran à votre instructeur.",
    enterBooking: "Entrez votre numéro de réservation pour continuer",
    start: "Commencer",
    consent: "J'accepte l'utilisation de mes données pour améliorer l'outil et pour la recherche scientifique. Je comprends que cela ne remplace pas un avis médical.",
    elbow: "Hyperextension du coude >10°",
    elbowInfo: "Votre coude s'étend-il à plus de 10° au-delà de la position droite ?",
    thumb: "Pouce vers l'avant-bras",
    thumbInfo: "Votre pouce peut-il toucher votre avant-bras ?",
    littleFinger: "Petit doigt >90°",
    littleFingerInfo: "Votre petit doigt peut-il se plier à plus de 90° vers l'arrière ?",
    sublux: "Subluxation antérieure",
    subluxInfo: "Avez-vous déjà eu une subluxation (luxation partielle) de l'épaule ?",
    dislocation: "Luxation antérieure",
    dislocationInfo: "Avez-vous déjà eu une luxation complète nécessitant réduction ?",
    operative: "Traitement chirurgical (si luxation)",
    operativeInfo: "La luxation a-t-elle été traitée chirurgicalement ?",
    apprehension: "Test d'appréhension positif",
    apprehensionInfo: "Crainte ou instabilité en rotation externe ?",
    skydiveTest: "Test fonctionnel Skydive positif",
    skydiveTestInfo: "Instabilité ou peur en position de simulation Skydive ?"
  }
  // Add IT, NL, ES as needed
};

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

  // Ensure html lang updates for a11y
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.en;

  // Score calculation
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

  // Splash / landing page
  if (splash) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 dark:text-white">{t.title}</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{t.enterBooking}</p>
        <input
          value={bookingCode}
          onChange={e => setBookingCode(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 mb-4 text-gray-800 bg-white"
          placeholder="#12345"
        />
        <div className="mb-4">
          <label className="mr-2 text-sm text-gray-600">{t.language}</label>
          <select value={lang} onChange={e => setLang(e.target.value)} className="p-1 rounded border bg-white text-gray-900">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input type="checkbox" id="consent" className="accent-blue-500" checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} />
          <label htmlFor="consent" className="text-xs text-gray-700 dark:text-gray-300">{t.consent}</label>
        </div>
        <button
          onClick={() => { if (bookingCode.trim() && consentGiven) setSplash(false); }}
          className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={!bookingCode.trim() || !consentGiven}
        >
          {t.start}
        </button>
      </div>
    );
  }

  // Final summary
  if (confirmed !== null) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">{confirmed ? t.finalYes : t.finalNo}</h2>
        <p className="mb-2">{t.summaryNote}</p>
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <h3 className="font-semibold mb-2">{t.summaryTitle}</h3>
          <ul className="text-sm text-left space-y-1">
            <li>{t.age}: {age}</li>
            <li>{t.sex}: {sex === "male" ? t.sexMale : t.sexFemale}</li>
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

  // Questions + score
  const questions = [
    { key: "elbow", info: "elbowInfo", value: elbow, setter: setElbow },
    { key: "thumb", info: "thumbInfo", value: thumb, setter: setThumb },
    { key: "littleFinger", info: "littleFingerInfo", value: littleFinger, setter: setLittleFinger },
    { key: "sublux", info: "subluxInfo", value: setSublux, setter: setSublux },
    { key: "dislocation", info: "dislocationInfo", value: dislocation, setter: setDislocation },
    { key: "operative", info: "operativeInfo", value: operative, setter: setOperative },
    { key: "apprehension", info: "apprehensionInfo", value: apprehension, setter: setApprehension },
    { key: "skydiveTest", info: "skydiveTestInfo", value: skydiveTest, setter: setSkydiveTest }
  ];
return (
  <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 max-w-3xl mx-auto flex flex-col">
    <h1 className="text-2xl font-bold text-center mb-4">{t.title}</h1>
    <div className="flex justify-end mb-2">
      <label className="mr-2 text-sm">{t.language}</label>
      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="p-1 rounded border bg-white text-gray-900"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-bold mb-1">{t.age}</label>
        <select
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full border rounded-xl p-2 bg-white text-gray-900"
          disabled={showResult}
        >
          <option value="<16">&lt;16</option>
          <option value="16-25">16–25</option>
          <option value="25-30">25–30</option>
          <option value="30-35">30–35</option>
          <option value=">35">&gt;35</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">{t.sex}</label>
        <select
          value={sex}
          onChange={e => setSex(e.target.value)}
          className="w-full border rounded-xl p-2 bg-white text-gray-900"
          disabled={showResult}
        >
          <option value="male">{t.sexMale}</option>
          <option value="female">{t.sexFemale}</option>
        </select>
      </div>
    </div>
    <div>
      {questions.map(q => (
        <div key={q.key} className="flex flex-col md:flex-row justify-between items-start md:items-center border-b py-3">
          <div className="text-sm w-full md:w-4/5">
            <span className="font-semibold">{t[q.key]}</span>
            <span className="block text-xs text-blue-600 dark:text-blue-300 mt-1 italic">{t[q.info]}</span>
          </div>
          <input
            type="checkbox"
            checked={typeof q.value === "function" ? q.value() : q.value}
            onChange={e => q.setter(e.target.checked)}
            className="h-5 w-5 accent-indigo-600 mt-2 md:mt-0"
            disabled={showResult}
            aria-label={t[q.key]}
          />
        </div>
      ))}
    </div>
    {!showResult ? (
      <button
        onClick={() => setShowResult(true)}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
      >
        {t.showScore}
      </button>
    ) : (
      <div className="mt-6 space-y-4 text-center">
        <p className="text-lg font-semibold">
          {t.riskScore}: <span className="font-bold">{score} / 10</span>
        </p>
        <div className="w-full h-5 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            style={{ width: `${(score / 10) * 100}%`, transition: 'width 0.5s' }}
          ></div>
        </div>
        <button
          onClick={() => setShowResult(false)}
          className="mt-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {t.editAnswers}
        </button>
      </div>
    )}
  </div>
);
