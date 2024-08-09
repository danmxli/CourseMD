import { useFileStore } from "@/lib/store";
import { TFilePhase } from "@/lib/store";
import LandingPrompt from "@/components/landing";
import Dashboard from "@/components/dashboard";

export default function Home() {
  const filePhase = useFileStore((state) => state.filePhase);

  type PagePhases = {
    [key in TFilePhase]: React.ReactNode;
  };

  const curr: PagePhases = {
    new: <LandingPrompt />,
    uploading: <LandingPrompt />,
    finished: <Dashboard />
  }

  return (
    <>
      {curr[filePhase]}
    </>
  )
}
