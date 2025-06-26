import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";

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
  const getColor = () => `hsl(${120 - (score * 12)}, 100%, 45%)`;

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
    const csv =
      Object.keys(data).join(",") +
      "\n" +
      Object.values(data).join(",");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `skylux_risk_${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const infoText = {
    elbow: "Check if the elbow extends more than 10° beyond straight.",
    thumb: "Check if the thumb can touch the forearm.",
    littleFinger: "Check if the little finger bends back beyond 90°.",
    sublux: "Previous partial shoulder dislocation (subluxation).",
    dislocation: "Previous full shoulder dislocation requiring reduction.",
    operative: "If dislocated, was surgical treatment done?",
    apprehension: "Positive apprehension test (pain/fear with ER).",
    skydiveTest: "Instability or fear in simulated skydive posture."
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">SkyLux: Shoulder Risk Scanner</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label>Age Group</Label>
            <select value={age} onChange={e => setAge(e.target.value)} className="w-full border rounded p-2">
              <option value="<16">Under 16</option>
              <option value="16-25">16–25</option>
              <option value="25-30">25–30</option>
              <option value="30-35">30–35</option>
              <option value=">35">Over 35</option>
            </select>
          </div>

          <div>
            <Label>Sex</Label>
            <select value={sex} onChange={e => setSex(e.target.value)} className="w-full border rounded p-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {[{
            label: "Elbow Hyperextension >10°",
            state: elbow,
            setter: setElbow,
            info: infoText.elbow
          }, {
            label: "Thumb to Forearm",
            state: thumb,
            setter: setThumb,
            info: infoText.thumb
          }, {
            label: "Little Finger >90°",
            state: littleFinger,
            setter: setLittleFinger,
            info: infoText.littleFinger
          }, {
            label: "Previous Subluxation",
            state: sublux,
            setter: setSublux,
            info: infoText.sublux
          }, {
            label: "Previous Dislocation",
            state: dislocation,
            setter: setDislocation,
            info: infoText.dislocation
          }, {
            label: "Operative Treatment (if dislocation)",
            state: operative,
            setter: setOperative,
            info: infoText.operative
          }, {
            label: "Positive Apprehension Test",
            state: apprehension,
            setter: setApprehension,
            info: infoText.apprehension
          }, {
            label: "Positive Functional Skydive Test",
            state: skydiveTest,
            setter: setSkydiveTest,
            info: infoText.skydiveTest
          }].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Label>{item.label}</Label>
                <Tooltip>
                  <TooltipTrigger className="text-sm text-blue-600 cursor-pointer">ⓘ</TooltipTrigger>
                  <TooltipContent>{item.info}</TooltipContent>
                </Tooltip>
              </div>
              <Switch checked={item.state} onCheckedChange={item.setter} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center space-y-2">
        <p className="text-lg font-medium">Risk Score: <span className="font-bold">{score} / 10</span></p>
        <div className="w-full h-6 bg-gray-200 rounded overflow-hidden">
          <div style={{ width: `${(score / 10) * 100}%`, backgroundColor: getColor() }} className="h-full" />
        </div>
        {process.env.NODE_ENV !== 'production' && (
          <Button onClick={exportCSV} className="mt-4">Export Data as CSV</Button>
        )}
      </div>
    </div>
  );
}

