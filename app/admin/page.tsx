'use client'

import { useState } from 'react'

// Mock data
const mockAllShifts = [
  {
    id: '1',
    date: '2026-02-08',
    shiftType: 'ADS AM',
    location: 'MSH',
    startTime: '7:00 AM',
    endTime: '7:00 PM',
    fellowName: null,
    fellowEmail: null
  },
  {
    id: '2',
    date: '2026-02-08', 
    shiftType: 'Tele PM',
    location: 'MSW',
    startTime: '7:00 PM',
    endTime: '7:00 AM (+1)',
    fellowName: null,
    fellowEmail: null
  },
  {
    id: '99',
    date: '2026-02-07',
    shiftType: 'Tele AM',
    location: 'MSH',
    startTime: '7:00 AM',
    endTime: '7:00 PM',
    fellowName: 'Dr. John Smith',
    fellowEmail: 'john.smith@mountsinai.org'
  }
]

interface Shift {
  id: string
  date: string
  shiftType: string
  location: string
  startTime: string
  endTime: string
  fellowName: string | null
  fellowEmail: string | null
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [allShifts, setAllShifts] = useState<Shift[]>(mockAllShifts)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newShift, setNewShift] = useState({
    date: '',
    location: 'MSH',
    shiftType: 'ADS AM',
    quantity: 1
  })
  const [loading, setLoading] = useState(false)

  // Admin password check (in real app, this would be secure)
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Replace with env variable check
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Invalid admin password')
    }
  }

  // Check for existing auth on load
  useState(() => {
    const authStatus = localStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  })

  const getLocationColor = (location: string) => {
    switch (location) {
      case 'MSH': return 'bg-msh text-white'
      case 'MSW': return 'bg-msw text-white'
      case 'MSM': return 'bg-msm text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getShiftTimes = (shiftType: string) => {
    if (shiftType.includes('AM')) {
      return { startTime: '7:00 AM', endTime: '7:00 PM' }
    } else {
      return { startTime: '7:00 PM', endTime: '7:00 AM (+1)' }
    }
  }

  const handleCreateShifts = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const times = getShiftTimes(newShift.shiftType)
      const newShifts: Shift[] = []

      for (let i = 0; i < newShift.quantity; i++) {
        newShifts.push({
          id: `new-${Date.now()}-${i}`,
          date: newShift.date,
          shiftType: newShift.shiftType,
          location: newShift.location,
          startTime: times.startTime,
          endTime: times.endTime,
          fellowName: null,
          fellowEmail: null
        })
      }

      setAllShifts(prev => [...prev, ...newShifts])
      setNewShift({ date: '', location: 'MSH', shiftType: 'ADS AM', quantity: 1 })
      setShowCreateForm(false)
    } catch (error) {
      console.error('Failed to create shifts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFellow = async (shiftId: string) => {
    if (!confirm('Are you sure you want to remove this fellow from the shift?')) {
      return
    }

    setAllShifts(prev => 
      prev.map(shift => 
        shift.id === shiftId 
          ? { ...shift, fellowName: null, fellowEmail: null }
          : shift
      )
    )
  }

  const groupShiftsByDate = (shifts: Shift[]) => {
    const grouped: { [key: string]: Shift[] } = {}
    shifts.forEach(shift => {
      if (!grouped[shift.date]) {
        grouped[shift.date] = []
      }
      grouped[shift.date].push(shift)
    })
    return grouped
  }

  // Auth gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Access
          </h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium"
            >
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  const groupedShifts = groupShiftsByDate(allShifts)
  const sortedDates = Object.keys(groupedShifts).sort()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="space-x-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Shifts
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuth')
              setIsAuthenticated(false)
            }}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Shifts Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Shifts</h3>
          <form onSubmit={handleCreateShifts} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newShift.date}
                onChange={(e) => setNewShift(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={newShift.location}
                onChange={(e) => setNewShift(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="MSH">MSH</option>
                <option value="MSW">MSW</option>
                <option value="MSM">MSM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type</label>
              <select
                value={newShift.shiftType}
                onChange={(e) => setNewShift(prev => ({ ...prev, shiftType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="ADS AM">ADS AM</option>
                <option value="ADS PM">ADS PM</option>
                <option value="Tele AM">Tele AM</option>
                <option value="Tele PM">Tele PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                max="10"
                value={newShift.quantity}
                onChange={(e) => setNewShift(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* All Shifts by Date */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">All Shifts</h2>
        {sortedDates.map(date => (
          <div key={date} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {formatDate(date)}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedShifts[date].map(shift => (
                <div key={shift.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLocationColor(shift.location)}`}>
                      {shift.location}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {shift.shiftType}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {shift.startTime} – {shift.endTime}
                  </div>
                  
                  {shift.fellowName ? (
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        {shift.fellowName}
                      </div>
                      <div className="text-xs text-green-600">
                        {shift.fellowEmail}
                      </div>
                      <button
                        onClick={() => handleRemoveFellow(shift.id)}
                        className="mt-2 text-xs text-red-600 hover:text-red-800"
                      >
                        Remove Fellow
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded border">
                      <div className="text-sm text-gray-600 text-center">
                        Available
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {sortedDates.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">No shifts created yet.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Create First Shift
            </button>
          </div>
        )}
      </div>
    </div>
  )
}