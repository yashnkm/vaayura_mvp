import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-heading text-brand-grey-green mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-brand-dark-grey font-body">First Name</Label>
                  <Input id="firstName" type="text" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-brand-dark-grey font-body">Last Name</Label>
                  <Input id="lastName" type="text" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-brand-dark-grey font-body">Email</Label>
                <Input id="email" type="email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-brand-dark-grey font-body">Subject</Label>
                <Input id="subject" type="text" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message" className="text-brand-dark-grey font-body">Message</Label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent"
                />
              </div>
              <Button variant="brand-primary" size="brand-default" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-heading text-brand-grey-green mb-4">Contact Information</h3>
              <div className="space-y-4 text-brand-dark-grey font-body">
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>hello@vaayura.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p>+91 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p>123 Clean Air Street<br />Mumbai, Maharashtra 400001<br />India</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-heading text-brand-grey-green mb-4">Business Hours</h3>
              <div className="space-y-2 text-brand-dark-grey font-body">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}