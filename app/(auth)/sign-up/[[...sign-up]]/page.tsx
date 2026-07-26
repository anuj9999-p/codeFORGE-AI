import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-950 bg-forge-grid bg-[size:44px_44px] p-6">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 bg-ember-glow" />
      <SignUp
        appearance={{
          elements: {
            rootBox: "relative z-10",
            card: "bg-graphite-800 border border-white/[0.06] shadow-2xl",
          },
        }}
      />
    </div>
  );
}
