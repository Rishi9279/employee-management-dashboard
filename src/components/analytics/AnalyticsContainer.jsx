import ActivityCard from "./ActivityCard";
import AnalyticsStats from "./AnalyticsStats";
import RevenueChart from "./RevenueChart";

const AnalyticsContainer = ({
  stats = [],
  revenue = [],
  labels = [],
  activities = [],
  dataSource = "",
}) => {
  return (
    <div className="space-y-5 p-4 md:p-6">
      <AnalyticsStats stats={stats} />

      <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="h-full">
          <RevenueChart revenue={revenue} labels={labels} />
        </div>

        <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1 xl:grid-rows-2">
          {activities.map((item) => (
            <ActivityCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1e293b] px-4 py-3">
        <p className="text-sm text-slate-400">Data source</p>
        <p className="mt-1 text-sm text-slate-200">{dataSource}</p>
      </div>
    </div>
  );
};

export default AnalyticsContainer;

