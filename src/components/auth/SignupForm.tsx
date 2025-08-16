import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import logoImage from "@/assets/logo_2.png"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <Link to="/">
            <img
              src={logoImage}
              alt="Vaayura"
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold font-display text-brand-grey-green">
            Create account
          </h2>
          <p className="mt-2 text-sm text-brand-dark-grey font-body">
            Join Vaayura for cleaner air and healthier living
          </p>
        </div>
        
        <form className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="text-brand-grey-green font-heading">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="John" 
                  required 
                  className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className="text-brand-grey-green font-heading">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Doe" 
                  required 
                  className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
                />
              </div>
            </div>
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
              <Label htmlFor="password" className="text-brand-grey-green font-heading">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Choose a strong password"
                required 
                className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
              />
              <p className="text-xs text-brand-dark-grey/70 font-body">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword" className="text-brand-grey-green font-heading">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password"
                required 
                className="bg-white border-brand-pastel-green/30 focus:border-brand-pastel-green focus:ring-brand-pastel-green"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-brand-pastel-green/30" />
              <Label htmlFor="terms" className="text-sm text-brand-dark-grey font-body">
                I agree to the{" "}
                <a href="#" className="text-brand-pastel-green hover:text-brand-grey-green transition-colors underline underline-offset-4">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-pastel-green hover:text-brand-grey-green transition-colors underline underline-offset-4">
                  Privacy Policy
                </a>
              </Label>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-brand-pastel-green hover:bg-brand-grey-green text-white font-heading"
            >
              Create Account
            </Button>
          </div>
          <div className="text-center text-sm font-body">
            <span className="text-brand-dark-grey/70">Already have an account? </span>
            <Link to="/login" className="text-brand-pastel-green hover:text-brand-grey-green transition-colors underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}