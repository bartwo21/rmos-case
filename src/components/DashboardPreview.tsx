import Image from "next/image";

export const DashboardPreview = () => {
  return (
    <div className="w-1/2 p-8 bg-gradient-to-tr from-white to-slate-100 rounded-br-md rounded-tr-md shadow-xl border flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 w-full overflow-hidden">
        <div className="relative w-full h-[500px] overflow-hidden">
          <Image
            src="/table.png"
            alt="Forecast Table Preview"
            width={1600}
            height={1200}
            className="absolute top-0 left-0 w-auto h-auto max-w-none filter blur-[1.5px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};
