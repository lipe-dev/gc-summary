import { useState } from "react";
import { Icon } from "@iconify/react";

interface FragmentRequirement {
  current: number;
  target: number;
  cost: number;
}

export function FragmentCalculator() {
  const [requirements, setRequirements] = useState<FragmentRequirement>({
    current: 0,
    target: 0,
    cost: 0,
  });

  const calculateTotalFrags = () => {
    const needed = requirements.target - requirements.current;
    return needed > 0 ? needed : 0;
  };

  const calculateTotalCost = () => {
    return calculateTotalFrags() * requirements.cost;
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0000] to-[#1a0000] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Current Fragments</label>
          <input
            type="number"
            value={requirements.current}
            onChange={(e) => setRequirements({ ...requirements, current: parseInt(e.target.value) || 0 })}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Target Fragments</label>
          <input
            type="number"
            value={requirements.target}
            onChange={(e) => setRequirements({ ...requirements, target: parseInt(e.target.value) || 0 })}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Cost per Fragment</label>
          <input
            type="number"
            value={requirements.cost}
            onChange={(e) => setRequirements({ ...requirements, cost: parseInt(e.target.value) || 0 })}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-blue-400"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Fragments Needed:</span>
          <span className="text-blue-400 font-bold">{calculateTotalFrags()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Cost:</span>
          <span className="text-blue-400 font-bold">{calculateTotalCost().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
} 