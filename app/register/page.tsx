'use client'

import { useState } from 'react'
import Link from 'next/link'

const fellowshipOptions = [
  'MSH',
  'MSW', 
  'MSM',
  'Elmhurst',
  'Bronx',
  'EP MSM',
  'EP MSH', 
  'Cath MSH',
  'Cath MSW',
  'Other'
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cell: '',
    fellowship: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // TODO: Integrate with Convex or your backend
      console.log('Registration data:', formData)
      
      // Simulate magic link send
      setMessage(`Magic link sent to ${formData.email}! Check your email and click the link to sign in.`)
      
      // Reset form
      setFormData({ name: '', email: '', cell: '', fellowship: '' })
    } catch (error) {
      setMessage('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Fellow Registration
          </h2>
          <p className="text-gray-600">
            Register to sign up for strike coverage shifts
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.smith@mountsinai.org"
            />
          </div>

          <div>
            <label htmlFor="cell" className="block text-sm font-medium text-gray-700 mb-2">
              Cell Phone *
            </label>
            <input
              type="tel"
              id="cell"
              name="cell"
              required
              value={formData.cell}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="fellowship" className="block text-sm font-medium text-gray-700 mb-2">
              Fellowship Program *
            </label>
            <select
              id="fellowship"
              name="fellowship"
              required
              value={formData.fellowship}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your program</option>
              {fellowshipOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Sending Magic Link...' : 'Register & Send Magic Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}