import { DashboardPreview } from "@/components/DashboardPreview";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex items-stretch justify-between px-20 py-4 w-full">
      <HeroSection />
      <DashboardPreview />
    </div>
  );
}
