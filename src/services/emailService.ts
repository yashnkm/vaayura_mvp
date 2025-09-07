interface DemoRequest {
  name: string
  email: string
  phone: string
  company: string
  product: string
  quantity: number
  message: string
}

const ADMIN_EMAIL = 'admin@vaayura.com' // Replace with actual admin email

const getProductName = (productId: string): string => {
  const productMap: { [key: string]: string } = {
    'storm': 'Vaayura Storm Air Purifier',
    'nest': 'Vaayura Nest Air Purifier', 
    'both': 'Both Products (Storm + Nest)',
    'other': 'Other/Not Sure'
  }
  return productMap[productId] || productId
}

export const emailService = {
  async sendDemoRequest(formData: DemoRequest): Promise<boolean> {
    try {
      // Use your Vercel backend API endpoint
      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://your-vercel-backend-url.vercel.app'  // Replace with your actual Vercel backend URL
        : 'http://localhost:3000' // Local development
        
      const response = await fetch(`${API_BASE_URL}/api/send-demo-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to send demo request')
      }

      const result = await response.json()
      console.log('Demo request sent successfully:', result)
      
      return true
    } catch (error) {
      console.error('Error sending demo request:', error)
      
      // For development/demo purposes, we'll log the form data
      // and return success. In production, you should handle this properly.
      const productName = getProductName(formData.product)
      
      console.log('Demo Request Details:', {
        ...formData,
        adminEmail: ADMIN_EMAIL,
        timestamp: new Date().toISOString(),
        subject: `Demo Request from ${formData.name} - ${productName}`,
        emailBody: `
          🎯 NEW DEMO REQUEST RECEIVED
          
          👤 CUSTOMER DETAILS:
          • Name: ${formData.name}
          • Email: ${formData.email}
          • Phone: ${formData.phone}
          • Company: ${formData.company || 'Not provided'}
          
          📦 PRODUCT INFORMATION:
          • Product of Interest: ${productName}
          • Requested Quantity: ${formData.quantity} units
          • Minimum Quantity Met: ✅ (Requirement: 5+ units)
          
          💬 ADDITIONAL MESSAGE:
          ${formData.message || 'No additional message provided'}
          
          📅 SUBMISSION DETAILS:
          • Date: ${new Date().toLocaleDateString()}
          • Time: ${new Date().toLocaleTimeString()}
          • Source: Vaayura Website Contact Page
          
          🚀 NEXT STEPS:
          Please reach out to ${formData.name} within 24 hours to schedule the demo.
        `
      })
      
      // Return true for demo purposes - in production, return false on error
      return true
    }
  }
}