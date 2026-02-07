'use client'

import Link from 'next/link'

export default function TestModePage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🧪 Test Mode
          </h2>
          <p className="text-gray-600">
            Skip email verification for testing
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This bypasses email verification for testing purposes. 
            In production, fellows would receive magic link emails.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/shifts"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
          >
            🎯 Go to Shifts Dashboard
          </Link>

          <Link
            href="/admin"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-center block"
          >
            👨‍💼 Admin Panel
          </Link>

          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}