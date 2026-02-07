'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link - no token provided')
      return
    }

    // Decode and verify token (basic implementation)
    try {
      const decoded = Buffer.from(token, 'base64url').toString()
      const [email, timestamp] = decoded.split(':')
      const tokenAge = Date.now() - parseInt(timestamp)
      
      // Check if token is expired (15 minutes = 900000ms)
      if (tokenAge > 900000) {
        setStatus('expired')
        setMessage('This magic link has expired. Please request a new one.')
        return
      }

      // Token is valid - simulate successful authentication
      // In production, this would:
      // 1. Look up the user in database
      // 2. Create proper session/JWT
      // 3. Set authentication cookies
      
      setStatus('success')
      setMessage(`Welcome! Authenticated as ${email}`)
      
      // Redirect to shifts dashboard after 2 seconds
      setTimeout(() => {
        router.push('/shifts')
      }, 2000)
      
    } catch (error) {
      setStatus('error')
      setMessage('Invalid or corrupted magic link')
    }
  }, [token, router])

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Verifying Magic Link...
              </h2>
              <p className="text-gray-600">Please wait while we authenticate you.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-green-600 text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Authentication Successful!
              </h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-red-600 text-5xl mb-4">❌</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Authentication Failed
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center"
                >
                  Request New Magic Link
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-center"
                >
                  Return to Home
                </Link>
              </div>
            </>
          )}

          {status === 'expired' && (
            <>
              <div className="text-yellow-600 text-5xl mb-4">⏰</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Link Expired
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center"
                >
                  Get New Magic Link
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-center"
                >
                  Return to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}