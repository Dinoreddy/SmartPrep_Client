import { useState } from "react";
import Step1Register from "./steps/Step1Register";
import Step2ResumeUpload from "./steps/Step2ResumeUpload";
import Step3Success from "./steps/Step3Success";

type Step = 1 | 2 | 3;

const STEP_META: Record<
  Step,
  { left: string; right: string; progress: string; maxWidth: string }
> = {
  1: {
    left: "Step 1 of 2",
    right: "Registration",
    progress: "50%",
    maxWidth: "max-w-md",
  },
  2: {
    left: "Step 2 of 2",
    right: "Resume Analysis",
    progress: "100%",
    maxWidth: "max-w-xl",
  },
  3: {
    left: "Step 2 of 2 Complete",
    right: "100%",
    progress: "100%",
    maxWidth: "max-w-2xl",
  },
};

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);

  const goNext = () => setStep((s) => Math.min(s + 1, 3) as Step);

  const meta = STEP_META[step];

  return (
    <div className="bg-slate-50 font-display antialiased min-h-screen flex flex-col">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-50/60 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[35%] h-[35%] bg-indigo-50/60 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 flex flex-col items-center pt-12 md:pt-20 px-4 pb-12">
        {/* Outer container — width transitions with the step */}
        <div
          className={`w-full ${meta.maxWidth} flex flex-col transition-all duration-500`}
        >
          {/* ── Shared progress bar ── */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                {meta.left}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {meta.right}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: meta.progress }}
              />
            </div>
          </div>

          {/* ── Step content ── */}
          {step === 1 && <Step1Register onNext={goNext} />}
          {step === 2 && <Step2ResumeUpload onNext={goNext} />}
          {step === 3 && <Step3Success onNext={goNext} />}

          <p className="mt-8 text-center text-sm text-slate-400">
            Facing issues?{" "}
            <a className="text-indigo-600 font-medium hover:underline" href="#">
              Contact Support
            </a>
          </p>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          © 2024 SmartPrep AI • Trusted by 10k+ Engineers
        </p>
      </footer>
    </div>
  );
}
