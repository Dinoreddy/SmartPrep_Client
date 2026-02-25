import { Link } from "react-router-dom";
import TextInput from "@/components/ui/TextInput";
import { routes } from "@/routes/paths";

interface Step1RegisterProps {
  onNext: () => void;
}

export default function Step1Register({ onNext }: Step1RegisterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="px-8 py-10 sm:px-10">
        <div className="text-center mb-8">
          <h1 className="text-slate-900 text-3xl font-bold tracking-tight mb-2">
            Create your account
          </h1>
          <p className="text-slate-500 text-sm">
            Start your journey to acing technical interviews.
          </p>
        </div>

        <form className="space-y-5" noValidate>
          <TextInput
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            }
          />
          <TextInput
            label="Email Address"
            id="email"
            type="email"
            placeholder="you@example.com"
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            }
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            hint="Must be at least 8 characters with one number."
            inputClassName="bg-slate-50 focus:ring-indigo-600/30 focus:border-indigo-600"
            leftIcon={
              <span className="material-symbols-outlined text-[20px]">
                lock
              </span>
            }
          />

          <div className="pt-6">
            <button
              type="button"
              onClick={onNext}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-lg shadow-indigo-200"
            >
              Create Account
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to={routes.login}
            className="font-bold text-indigo-600 hover:underline transition-all"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
