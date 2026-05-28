import React from "react";
import AnalyticsStats from "./AnalyticsStats";
import RevenueChart from "./RevenueChart";
import ActivityCard from "./ActivityCard";

const AnalyticsContainer = () => {
  return (
    <div className="p-10 space-y-8">
      {/* Stats */}
      <AnalyticsStats />

      {/* Chart + Activity */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2">
          <RevenueChart />
        </div>

        {/* Activity */}
        <div className="space-y-6">
          <ActivityCard title="New Users" value="+245" growth="+18%" />

          <ActivityCard title="Revenue Growth" value="$12,450" growth="+32%" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContainer;
