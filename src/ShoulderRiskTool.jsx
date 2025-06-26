import React, { useState } from "react";

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

  const exportCSV = () => {
    const data = {
      Timestamp: new Date().toISOString(),
      Age: age,
      Sex: sex,
      ElbowHyperextension: elbow,
      ThumbToForearm: thumb,
      LittleFinger: littleFinger,
      PreviousSubluxation: sublux,
      PreviousDislocation: dislocation,
      OperativeTreatment: operative,
      ApprehensionTest: apprehension,
      SkydiveTest: skydiveTest,
      RiskScore: score
    };
    const csv = Object.keys(data).join(",") + "\n" + Object.values(data).join(",");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `skylux_risk_${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const infoText = {
    elbow: "Check if the elbow extends more than 10\u00b0 beyond straight.",
    thumb: "Check if the thumb can touch the forearm.",
    littleFinger: "Check if the little finger bends back beyond 90\u00b0.",
    sublux: "Previous partial shoulder dislocation (subluxation).",
    dislocation: "Previous full shoulder dislocation requiring reduction.",
    operative: "If dislocated, was surgical treatment done?",
    apprehension: "Positive apprehension test (pain/fear with ER).",
    skydiveTest: "Instability or fear in simulated skydive posture."
  };

  const renderSwitch = (label, state, setter, infoKey) => (
    <div className="flex justify-between items-start border-b py-3">
      <div className="text-sm w-4/5">
        <p className="font-medium leading-tight">{label}</p>
        <p className="text-xs text-gray-500 mt-1 italic">{infoText[infoKey]}</p>
      </div>
      <input
        type="checkbox"
        checked={state}
        onChange={(e) => setter(e.target.checked)}
        className="h-4 w-4 mt-1"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          SkyLux: Shoulder Risk Scanner
        </h1>

        <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age Group</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              >
                <option value="<16">Under 16</option>
                <option value="16-25">16–25</option>
                <option value="25-30">25–30</option>
                <option value="30-35">30–35</option>
                <option value=">35">Over 35</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {renderSwitch("Elbow Hyperextension >10°", elbow, setElbow, "elbow")}
            {renderSwitch("Thumb to Forearm", thumb, setThumb, "thumb")}
            {renderSwitch("Little Finger >90°", littleFinger, setLittleFinger, "littleFinger")}
            {renderSwitch("Previous Subluxation", sublux, setSublux, "sublux")}
            {renderSwitch("Previous Dislocation", dislocation, setDislocation, "dislocation")}
            {renderSwitch("Operative Treatment (if dislocation)", operative, setOperative, "operative")}
            {renderSwitch("Positive Apprehension Test", apprehension, setApprehension, "apprehension")}
            {renderSwitch("Positive Functional Skydive Test", skydiveTest, setSkydiveTest, "skydiveTest")}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowResult(true)}
              className="mt-4 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Show Risk Score
            </button>
          </div>

          {showResult && (
            <div className="text-center space-y-3 pt-6">
              <p className="text-lg font-semibold">
                Risk Score: <span className="font-bold text-blue-700">{score} / 10</span>
              </p>
              <div className="w-full h-6 rounded overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative">
                <div
                  style={{ width: `${(score / 10) * 100}%` }}
                  className="h-full bg-black/30"
                />
              </div>

              {process.env.NODE_ENV !== 'production' && (
                <button
                  onClick={exportCSV}
                  className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Export Data as CSV
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
