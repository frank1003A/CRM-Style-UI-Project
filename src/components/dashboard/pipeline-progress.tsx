"use client";

import { PipelineProgressProps } from "@/utils/type";

const PipelineProgress = ({
  target = 45000000,
  stages = [
    { name: "Won", amount: 18000000, color: "bg-emerald-500" },
    { name: "Committed", amount: 8000000, color: "bg-blue-500" },
    { name: "Best case", amount: 7000000, color: "bg-purple-500" },
    { name: "Qualified", amount: 3000000, color: "bg-amber-500" },
    { name: "Leads", amount: 75000000, color: "bg-gray-300" },
  ],
}: PipelineProgressProps) => {
  const totalAmount = stages
    .filter((stage) => stage.name !== "Leads")
    .reduce((sum, stage) => sum + stage.amount, 0);

  const percentageAchieved = Math.round((totalAmount / target) * 100);

  const calculateWidth = (amount: number) => {
    return `${(amount / target) * 100}%`;
  };
  return (
    <div className="w-full max-w-4xl p-1 min-w-[520px] md:min-w-0">
      <div className="flex justify-between items-center mb-1">
        <div className="text-[10px] text-gray-600">1 month until Q4 ends</div>
        <div className="flex items-center gap-2">
          <span className="text-[10px]">Target</span>
          <span className="font-semibold">
            ${(target / 1000000).toFixed(0)} million
          </span>
          <span className="text-[10px] text-gray-600">
            {percentageAchieved}% of target achieved
          </span>
        </div>
      </div>

      <div className="relative h-2 flex rounded-full overflow-hidden">
        {stages.map((stage) => (
          <div
            key={stage.name}
            style={{ width: calculateWidth(stage.amount) }}
            className={`${stage.color} h-full transition-all duration-300 ease-in-out`}
          />
        ))}
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4 mt-1">
        {stages.map((stage) => (
          <div key={stage.name} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${stage.color}`} />
            <span className="text-[10px] text-gray-600">{stage.name}</span>
            <span className="text-[10px] font-medium">
              ${(stage.amount / 1000000).toFixed(0)}m
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineProgress;
