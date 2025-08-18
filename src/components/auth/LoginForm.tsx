import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import logoImage from "@/assets/logo_2.png"
import backgroundImage from "@/assets/background.png"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Light blur overlay with dark edges */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/30 backdrop-blur-sm"></div>
      
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative z-10 scale-105">
        <div className="text-center">
          <Link to="/">
            <img
              src={logoImage}
              alt="Vaayura"
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold font-display text-brand-grey-green">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-brand-dark-grey font-body">
            Sign in to your Vaayura account
          </p>
        </div>
        
        <form className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-brand-grey-green font-heading">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-brand-grey-green font-heading">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm text-brand-pastel-green hover:text-brand-grey-green transition-colors underline-offset-4 hover:underline font-body"
                >
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-brand-pastel-green hover:bg-brand-grey-green text-white font-heading"
            >
              Sign In
            </Button>
          </div>
          <div className="text-center text-sm font-body">
            <span className="text-brand-dark-grey/70">Don't have an account? </span>
            <Link to="/signup" className="text-brand-pastel-green hover:text-brand-grey-green transition-colors underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}