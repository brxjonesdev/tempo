import FocusButton from "@/features/focus-mode/components/focus-btn";
import SessionsButton from "@/features/sessions/components/sessions-btn";
import { Button } from "@/shared/components/ui/button";
import { Settings } from "lucide-react";


export default function Home() {
  return (
   <main className="bg-[#e7f3f0] min-h-screen flex flex-col items-center p-4 w-full">
    <section className="w-3xl h-full flex-1 flex flex-col items-center justify-between">
      {/* App Header */}
      <div className="flex items-center mb-8 flex-row justify-between w-full">
        <h4 className="font-heading font-semibold text-2xl tracking-wider">Bloq</h4>
        <div className="font-body text-xs text-gray-600 flex gap-2">
          <FocusButton/>
          <SessionsButton/>
          <Button className="text-xs font-semibold">
            Settings
            <Settings className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full font-body">

      </div>
    </section>

   </main>
  );
}
