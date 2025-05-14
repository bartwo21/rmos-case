export const DashboardPreview = () => {
  return (
    <div className="w-1/2 p-8 bg-gradient-to-br from-white to-slate-100 rounded-br-md rounded-tr-md shadow-xl border flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-8 bg-slate-200 rounded"></div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-50 rounded-lg border border-slate-200 p-4"
            >
              <div className="w-16 h-3 bg-slate-200 rounded mb-2"></div>
              <div className="w-24 h-6 bg-slate-300 rounded"></div>
            </div>
          ))}
        </div>

        <div className="h-48 bg-slate-50 rounded-lg border border-slate-200 mb-6">
          <div className="flex items-end justify-between h-full p-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-12 bg-blue-200 rounded-t"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="w-32 h-4 bg-slate-200 rounded"></div>
              <div className="w-20 h-4 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
