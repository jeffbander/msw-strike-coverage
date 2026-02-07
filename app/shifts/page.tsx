'use client'

import { useState } from 'react'

// Mock data - replace with Convex queries
const mockAvailableShifts = [
  {
    id: '1',
    date: '2026-02-08',
    shiftType: 'ADS AM',
    location: 'MSH',
    startTime: '7:00 AM',
    endTime: '7:00 PM'
  },
  {
    id: '2', 
    date: '2026-02-08',
    shiftType: 'Tele PM',
    location: 'MSW',
    startTime: '7:00 PM',
    endTime: '7:00 AM (+1)'
  },
  {
    id: '3',
    date: '2026-02-09',
    shiftType: 'ADS PM',
    location: 'MSM',
    startTime: '7:00 PM', 
    endTime: '7:00 AM (+1)'
  }
]

const mockMyShifts = [
  {
    id: '99',
    date: '2026-02-07',
    shiftType: 'Tele AM',
    location: 'MSH',
    startTime: '7:00 AM',
    endTime: '7:00 PM'
  }
]

interface Shift {
  id: string
  date: string
  shiftType: string
  location: string
  startTime: string
  endTime: string
}

export default function ShiftsPage() {
  const [availableShifts, setAvailableShifts] = useState<Shift[]>(mockAvailableShifts)
  const [myShifts, setMyShifts] = useState<Shift[]>(mockMyShifts)
  const [showAttestationModal, setShowAttestationModal] = useState(false)
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleSignUpClick = (shift: Shift) => {
    setSelectedShift(shift)
    setShowAttestationModal(true)
  }

  const handleConfirmSignUp = async () => {
    if (!selectedShift) return
    
    setLoading(true)
    try {
      // TODO: API call to sign up for shift
      console.log('Signing up for shift:', selectedShift)
      
      // Move shift from available to my shifts
      setAvailableShifts(prev => prev.filter(s => s.id !== selectedShift.id))
      setMyShifts(prev => [...prev, selectedShift])
      
      setShowAttestationModal(false)
      setSelectedShift(null)
    } catch (error) {
      console.error('Signup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const ShiftCard = ({ shift, isMyShift = false }: { shift: Shift, isMyShift?: boolean }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLocationColor(shift.location)}`}>
            {shift.location}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {shift.shiftType}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {formatDate(shift.date)}
          </div>
          <div className="text-xs text-gray-500">
            {shift.startTime} – {shift.endTime}
          </div>
        </div>
      </div>
      
      {!isMyShift && (
        <button
          onClick={() => handleSignUpClick(shift)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Sign Up
        </button>
      )}
      
      {isMyShift && (
        <div className="w-full bg-green-50 text-green-800 py-2 px-4 rounded-lg text-center font-medium">
          ✓ Signed Up
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* My Shifts Section */}
      {myShifts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Shifts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} isMyShift={true} />
            ))}
          </div>
        </div>
      )}

      {/* Available Shifts Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Shifts</h2>
        {availableShifts.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">No available shifts at this time.</p>
            <p className="text-sm text-gray-500 mt-2">Check back later or contact admin.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} />
            ))}
          </div>
        )}
      </div>

      {/* GME Attestation Modal */}
      {showAttestationModal && selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Shift Signup
            </h3>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                {selectedShift.location} • {selectedShift.shiftType}
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(selectedShift.date)}
              </div>
              <div className="text-sm text-gray-600">
                {selectedShift.startTime} – {selectedShift.endTime}
              </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>GME Attestation:</strong> By confirming, you attest that you are not in violation of your GME duty hours and you are authorized to work to the best of your knowledge.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowAttestationModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignUp}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Confirming...' : 'Confirm Signup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}