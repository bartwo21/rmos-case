import { DashboardPreview } from "@/components/home/DashboardPreview";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex items-stretch justify-between px-4 py-4 w-full my-auto lg:flex-row flex-col lg:px-20 lg:gap-0 gap-10">
      <HeroSection />
      <DashboardPreview />
    </div>
  );
}
