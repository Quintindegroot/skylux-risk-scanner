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
    elbow: "Does the elbow extend more than 10° past straight?",
    thumb: "Can the thumb touch the forearm?",
    littleFinger: "Can the pinky extend back beyond 90°?",
    sublux: "History of a partial shoulder dislocation (subluxation)?",
    dislocation: "Has there been a full shoulder dislocation needing reduction?",
    operative: "Was the dislocation treated surgically?",
    apprehension: "Fear or instability in external rotation (Apprehension Test)?",
    skydiveTest: "Instability or fear in a simulated skydive posture?"
  };

  const renderSwitch = (label, state, setter, infoKey) => (
    <div className="flex justify-between items-start border-b py-4 hover:bg-blue-50 transition duration-200">
      <div className="text-sm w-4/5">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-blue-500 mt-1 italic">{infoText[infoKey]}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight">
          SkyLux Shoulder Risk Tool
        </h1>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">Age Group</label>
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
              <label className="block text-sm font-bold text-gray-700">Sex</label>
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
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Show My Risk Score
            </button>
          </div>

          {showResult && (
            <div className="text-center space-y-4 pt-6">
              <p className="text-xl font-semibold text-indigo-700">
                Your Risk Score: <span className="font-bold">{score} / 10</span>
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
