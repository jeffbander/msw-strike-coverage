import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Strike Coverage
          </h2>
          <p className="text-gray-600">
            Sign up for available cardiology coverage shifts
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/register"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
          >
            Register as Fellow
          </Link>

          <Link
            href="/sign-in"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center block"
          >
            Sign In (Returning Fellow)
          </Link>

          <div className="border-t pt-4 mt-6 space-y-2">
            <Link
              href="/test-mode"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm text-center block"
            >
              🧪 Test Mode (Skip Email)
            </Link>
            <Link
              href="/admin"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm text-center block"
            >
              Admin Access
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>Emergency coverage during active strike</p>
          <p>For technical support, contact IT</p>
        </div>
      </div>
    </div>
  )
}