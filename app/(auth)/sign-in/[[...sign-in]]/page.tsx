import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white dark:bg-[#0a0a0a]">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
          alt="Cinema background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-20 p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <h2 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
            Your Personal <br />
            <span className="text-indigo-400">Movie Universe</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
            Discover, track, and save your favorite films in one beautifully designed platform.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 relative">
         <div className="absolute inset-0 lg:hidden -z-10 bg-[radial-gradient(45rem_50rem_at_center,theme(colors.indigo.50),theme(colors.transparent))] dark:bg-[radial-gradient(45rem_50rem_at_center,theme(colors.indigo.900),theme(colors.transparent))] opacity-50" />
        
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your account to continue.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-indigo-500/5 dark:shadow-none border border-gray-100 dark:border-zinc-800">
            <SignIn 
              path="/sign-in" 
              routing="path" 
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none w-full p-0 m-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-all",
                  socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-200 font-semibold",
                  formFieldLabel: "text-gray-700 dark:text-gray-300 font-medium",
                  formFieldInput: "bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all rounded-xl",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white transition-colors border-0 shadow-md shadow-indigo-500/20 rounded-xl h-10 font-medium",
                  footerActionText: "text-gray-500 dark:text-gray-400",
                  footerActionLink: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold transition-colors",
                  dividerLine: "bg-gray-200 dark:bg-zinc-800",
                  dividerText: "text-gray-400 dark:text-gray-500",
                  identityPreviewText: "text-gray-700 dark:text-gray-200",
                  identityPreviewEditButtonIcon: "text-indigo-600 dark:text-indigo-400",
                  formResendCodeLink: "text-indigo-600 dark:text-indigo-400",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
