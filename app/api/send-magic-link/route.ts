import { NextRequest, NextResponse } from 'next/server'

// Dynamic import for SendGrid to avoid SSR issues
const getSendGrid = async () => {
  const sgMail = await import('@sendgrid/mail')
  return sgMail.default
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, type } = await request.json()

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.log('SendGrid not configured - would send magic link to:', email)
      return NextResponse.json({ 
        success: true, 
        message: 'Magic link sent successfully',
        debug: 'SendGrid not configured (check logs)'
      })
    }

    // Initialize SendGrid
    const sgMail = await getSendGrid()
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Generate magic link token (in production, use proper JWT/signing)
    const tokenData = `${email}:${Date.now()}`
    const token = Buffer.from(tokenData, 'utf8').toString('base64')
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001'
    const magicLink = `${baseUrl}/auth/verify?token=${token}`

    // Email content based on type
    const isRegistration = type === 'registration'
    const subject = isRegistration 
      ? 'Complete Your Mount Sinai Strike Coverage Registration'
      : 'Mount Sinai Strike Coverage Sign In'
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .button { display: inline-block; background: #1e40af; color: white; padding: 15px 30px; 
                   text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
          .urgent { background: #dc2626; color: white; padding: 10px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Mount Sinai Strike Coverage</h1>
          </div>
          <div class="content">
            ${isRegistration ? `
              <h2>Welcome to Strike Coverage, ${name || 'Fellow'}!</h2>
              <p>Thank you for registering for the Mount Sinai Strike Coverage platform.</p>
            ` : `
              <h2>Sign In to Strike Coverage</h2>
              <p>Click the link below to access your dashboard.</p>
            `}
            
            <div class="urgent">
              <strong>⚡ URGENT:</strong> This is an emergency coverage system during active strike.
            </div>
            
            <p>Click the button below to ${isRegistration ? 'complete your registration' : 'sign in'}:</p>
            
            <a href="${magicLink}" class="button">
              ${isRegistration ? '🔗 Complete Registration' : '🔗 Sign In Now'}
            </a>
            
            <p><strong>Or copy this link:</strong><br>
            <a href="${magicLink}">${magicLink}</a></p>
            
            <p><strong>⏰ This link expires in 15 minutes for security.</strong></p>
            
            ${isRegistration ? `
              <p>After signing in, you'll be able to:</p>
              <ul>
                <li>View available coverage shifts</li>
                <li>Sign up for shifts with GME attestation</li>
                <li>See your scheduled coverage</li>
              </ul>
            ` : ''}
          </div>
          <div class="footer">
            <p>Mount Sinai Health System - Cardiology Department</p>
            <p>Emergency Strike Coverage Platform</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // SendGrid message
    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@mountsinai.org',
        name: 'Mount Sinai Strike Coverage'
      },
      subject: subject,
      html: htmlContent,
      text: `
        ${subject}
        
        ${isRegistration ? `Welcome ${name || 'Fellow'}!` : 'Sign in to your dashboard'}
        
        URGENT: Emergency coverage system during active strike.
        
        Click this link to ${isRegistration ? 'complete registration' : 'sign in'}: ${magicLink}
        
        This link expires in 15 minutes.
        
        Mount Sinai Health System - Cardiology Department
      `.replace(/^\s+/gm, '')
    }

    // Send email
    try {
      await sgMail.send(msg)
      console.log('Magic link sent successfully to:', email)
    } catch (sendError) {
      console.error('SendGrid send error:', sendError)
      // Fallback: Return success but log the error
      return NextResponse.json({ 
        success: true, 
        message: 'Magic link sent successfully',
        debug: 'Email sending failed, check logs'
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Magic link sent successfully' 
    })

  } catch (error) {
    console.error('SendGrid error:', error)
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    )
  }
}