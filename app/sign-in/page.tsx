'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Call API to send magic link
      const response = await fetch('/api/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'signin'
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`Magic link sent to ${email}! Check your email and click the link to sign in.`)
        setEmail('')
      } else {
        setMessage(result.error || 'Failed to send magic link. Please try again.')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setMessage('Failed to send magic link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Fellow Sign In
          </h2>
          <p className="text-gray-600">
            Enter your email to receive a magic link
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('sent') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@mountsinai.org"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/register" className="text-sm text-blue-600 hover:text-blue-800 block">
            New fellow? Register here →
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800 block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}