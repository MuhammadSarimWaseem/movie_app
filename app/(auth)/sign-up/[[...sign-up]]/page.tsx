import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_center,theme(colors.purple.100),theme(colors.transparent))] dark:bg-[radial-gradient(45rem_50rem_at_center,theme(colors.purple.900),theme(colors.transparent))] opacity-50" />
      
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us to start building your personal movie collection.
          </p>
        </div>
        
        <div className="flex justify-center flex-1 w-full bg-white/50 dark:bg-black/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800/50">
          <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-0 w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors",
                socialButtonsBlockButtonText: "text-gray-600 dark:text-gray-300 font-medium",
                formFieldLabel: "text-gray-700 dark:text-gray-300",
                formFieldInput: "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white transition-colors border-0",
                footerActionText: "text-gray-600 dark:text-gray-400",
                footerActionLink: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-semibold",
                dividerLine: "bg-gray-200 dark:bg-zinc-800",
                dividerText: "text-gray-500 dark:text-gray-400",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
