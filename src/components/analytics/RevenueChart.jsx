import { useMemo } from "react";
import { motion } from "framer-motion";

const chartWidth = 520;
const chartHeight = 240;
const paddingX = 24;
const paddingTop = 18;
const paddingBottom = 42;

const RevenueChart = ({ revenue = [], labels = [] }) => {
  const safeValues = useMemo(
    () => (revenue.length ? revenue : [34, 48, 42, 56, 50, 64]),
    [revenue],
  );
  const safeLabels = useMemo(
    () => (labels.length === safeValues.length ? labels : safeValues.map((_, i) => `P${i + 1}`)),
    [labels, safeValues],
  );

  const { linePath, areaPath, points, average, peak } = useMemo(() => {
    const maxValue = Math.max(...safeValues);
    const minValue = Math.min(...safeValues);
    const span = Math.max(1, maxValue - minValue);
    const drawableHeight = chartHeight - paddingBottom - paddingTop;
    const stepX =
      safeValues.length > 1
        ? (chartWidth - paddingX * 2) / (safeValues.length - 1)
        : chartWidth - paddingX * 2;

    const mapped = safeValues.map((value, index) => {
      const x = paddingX + stepX * index;
      const normalized = (value - minValue) / span;
      const y = chartHeight - paddingBottom - normalized * drawableHeight;
      return { x, y, value };
    });

    const line = mapped
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    const area = `${line} L ${mapped[mapped.length - 1].x} ${chartHeight - paddingBottom} L ${
      mapped[0].x
    } ${chartHeight - paddingBottom} Z`;

    const avg = Math.round(safeValues.reduce((sum, value) => sum + value, 0) / safeValues.length);
    const top = Math.max(...safeValues);

    return { linePath: line, areaPath: area, points: mapped, average: avg, peak: top };
  }, [safeValues]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Task Trend</h2>
          <p className="text-xs text-slate-400">Deadline-wise distribution from current task data</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-400">
            Avg {average}
          </span>
          <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-amber-400">
            Peak {peak}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/30 p-3">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-64 w-full">
          {[0, 1, 2, 3].map((step) => {
            const y = paddingTop + ((chartHeight - paddingBottom - paddingTop) / 3) * step;
            return (
              <line
                key={step}
                x1={paddingX}
                x2={chartWidth - paddingX}
                y1={y}
                y2={y}
                stroke="rgba(148, 163, 184, 0.2)"
                strokeDasharray="5 6"
              />
            );
          })}

          <defs>
            <linearGradient id="revenueAreaFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <motion.path
            d={areaPath}
            fill="url(#revenueAreaFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.path
            d={linePath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {points.map((point, index) => (
            <g key={`${point.value}-${index}`}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill="#f59e0b"
                stroke="#0f172a"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.08 * index }}
              />
              <text
                x={point.x}
                y={chartHeight - 12}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
              >
                {safeLabels[index]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;
