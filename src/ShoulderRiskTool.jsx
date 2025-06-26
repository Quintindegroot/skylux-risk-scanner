import React, { useState, useEffect } from "react";

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
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const translations = {
    en: {
      title: "SkyLux Shoulder Risk Tool",
      showScore: "Show My Risk Score",
      riskScore: "Your Risk Score",
      age: "Age Group",
      sex: "Sex",
      export: "Export Data as CSV",
      options: {
        elbow: "Elbow Hyperextension >10°",
        thumb: "Thumb to Forearm",
        littleFinger: "Little Finger >90°",
        sublux: "Previous Subluxation",
        dislocation: "Previous Dislocation",
        operative: "Operative Treatment (if dislocation)",
        apprehension: "Positive Apprehension Test",
        skydiveTest: "Positive Functional Skydive Test"
      },
      info: {
        elbow: "Does the elbow extend more than 10° past straight?",
        thumb: "Can the thumb touch the forearm?",
        littleFinger: "Can the pinky extend back beyond 90°?",
        sublux: "History of a partial shoulder dislocation (subluxation)?",
        dislocation: "Has there been a full shoulder dislocation needing reduction?",
        operative: "Was the dislocation treated surgically?",
        apprehension: "Fear or instability in external rotation (Apprehension Test)?",
        skydiveTest: "Instability or fear in a simulated skydive posture?"
      }
    },
    de: {
      title: "SkyLux Schulter-Risiko-Tool",
      showScore: "Risiko anzeigen",
      riskScore: "Dein Risiko-Score",
      age: "Altersgruppe",
      sex: "Geschlecht",
      export: "Daten als CSV exportieren",
      options: {
        elbow: "Überstreckung des Ellenbogens >10°",
        thumb: "Daumen zum Unterarm",
        littleFinger: "Kleiner Finger >90°",
        sublux: "Vorherige Subluxation",
        dislocation: "Vorherige Luxation",
        operative: "Operative Behandlung (bei Luxation)",
        apprehension: "Apprehension-Test positiv",
        skydiveTest: "Funktioneller Skydive-Test positiv"
      },
      info: {
        elbow: "Überstreckt sich der Ellenbogen über 10° hinaus?",
        thumb: "Kann der Daumen den Unterarm berühren?",
        littleFinger: "Kann der kleine Finger mehr als 90° überstreckt werden?",
        sublux: "Gab es eine teilweise Schulterluxation (Subluxation)?",
        dislocation: "Gab es eine vollständige Schulterluxation?",
        operative: "Wurde die Luxation operativ behandelt?",
        apprehension: "Fühlt sich die Schulter in Außenrotation instabil an?",
        skydiveTest: "Instabilität im simulierten Skydive?"
      }
    },
    fr: {
      title: "Outil de Risque d'Épaule SkyLux",
      showScore: "Afficher le score de risque",
      riskScore: "Votre score de risque",
      age: "Groupe d'âge",
      sex: "Sexe",
      export: "Exporter les données en CSV",
      options: {
        elbow: "Hyperextension du coude >10°",
        thumb: "Pouce vers l'avant-bras",
        littleFinger: "Auriculaire >90°",
        sublux: "Subluxation antérieure",
        dislocation: "Luxation antérieure",
        operative: "Traitement chirurgical (si luxation)",
        apprehension: "Test d'appréhension positif",
        skydiveTest: "Test de Skydive fonctionnel positif"
      },
      info: {
        elbow: "Le coude s'étend-il de plus de 10°?",
        thumb: "Le pouce touche-t-il l'avant-bras?",
        littleFinger: "L'auriculaire dépasse-t-il 90°?",
        sublux: "Antécédents de subluxation de l'épaule?",
        dislocation: "Luxation complète nécessitant réduction?",
        operative: "Traitement chirurgical effectué?",
        apprehension: "Peur ou instabilité en rotation externe?",
        skydiveTest: "Instabilité en posture de Skydive?"
      }
    },
    it: {
      title: "Strumento di Rischio Spalla SkyLux",
      showScore: "Mostra il mio punteggio di rischio",
      riskScore: "Il tuo punteggio di rischio",
      age: "Fascia d'età",
      sex: "Sesso",
      export: "Esporta dati in CSV",
      options: {
        elbow: "Iperestensione del gomito >10°",
        thumb: "Pollice verso l'avambraccio",
        littleFinger: "Mignolo >90°",
        sublux: "Sublussazione precedente",
        dislocation: "Lussazione precedente",
        operative: "Trattamento chirurgico (se lussazione)",
        apprehension: "Test di apprensione positivo",
        skydiveTest: "Test Skydive funzionale positivo"
      },
      info: {
        elbow: "Il gomito si estende oltre i 10°?",
        thumb: "Il pollice tocca l'avambraccio?",
        littleFinger: "Il mignolo supera i 90°?",
        sublux: "Sublussazione della spalla in passato?",
        dislocation: "Lussazione completa ridotta manualmente?",
        operative: "È stato fatto un intervento chirurgico?",
        apprehension: "Instabilità in rotazione esterna?",
        skydiveTest: "Instabilità nella postura di Skydive?"
      }
    }
  };

  const t = translations[lang];

  const renderSwitch = (key, state, setter) => (
    <div className="flex justify-between items-start border-b py-4 hover:bg-blue-50 transition duration-200">
      <div className="text-sm w-4/5">
        <p className="font-semibold text-gray-800">{t.options[key]}</p>
        <p className="text-xs text-blue-500 mt-1 italic">{t.info[key]}</p>
      </div>
      <input
        type="checkbox"
        checked={state}
        onChange={(e) => setter(e.target.checked)}
        className="h-5 w-5 mt-1 accent-blue-600"
      />
    </div>
  );

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800"} min-h-screen p-6`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-center tracking-tight w-full">
            {t.title}
          </h1>
        </div>

        <div className="text-right mb-4">
          <select value={lang} onChange={e => setLang(e.target.value)} className="p-2 rounded border">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold">{t.age}</label>
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
              <label className="block text-sm font-bold">{t.sex}</label>
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
            {renderSwitch("elbow", elbow, setElbow)}
            {renderSwitch("thumb", thumb, setThumb)}
            {renderSwitch("littleFinger", littleFinger, setLittleFinger)}
            {renderSwitch("sublux", sublux, setSublux)}
            {renderSwitch("dislocation", dislocation, setDislocation)}
            {renderSwitch("operative", operative, setOperative)}
            {renderSwitch("apprehension", apprehension, setApprehension)}
            {renderSwitch("skydiveTest", skydiveTest, setSkydiveTest)}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowResult(true)}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              {t.showScore}
            </button>
          </div>

          {showResult && (
            <div className="text-center space-y-4 pt-6">
              <p className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                {t.riskScore}: <span className="font-bold">{score} / 10</span>
              </p>
              <div className="w-full h-6 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative shadow-inner">
                <div
                  style={{ width: `${(score / 10) * 100}%` }}
                  className="h-full bg-black/30 rounded-full transition-all duration-300"
                />
              </div>

              {process.env.NODE_ENV !== 'production' && (
                <button
                  onClick={exportCSV}
                  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-black"
                >
                  {t.export}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
