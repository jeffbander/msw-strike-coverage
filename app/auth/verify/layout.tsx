import { Suspense } from 'react'

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading verification...</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  )
}