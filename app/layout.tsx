import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mount Sinai Strike Coverage',
  description: 'Cardiology fellows strike coverage signup platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <div className="min-h-screen">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Mount Sinai Strike Coverage
              </h1>
              <p className="text-sm text-gray-600">
                Cardiology Fellows Coverage Signup
              </p>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}