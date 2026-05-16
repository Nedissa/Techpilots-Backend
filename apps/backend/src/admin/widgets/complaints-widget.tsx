import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

interface Complaint {
  id: string
  customer_id: string
  order_number: string
  description: string
  created_at: string
  status: string
}

const ComplaintsWidget = ({ data }: any) => {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!data?.id) return

    fetch(`/admin/complaints?customer_id=${data.id}`)
      .then(res => res.json())
      .then(data => {
        setComplaints(data.complaints || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load complaints:', err)
        setLoading(false)
      })
  }, [data?.id])

  return (
    <div className="border border-blue-500/50 rounded p-6" style={{ backgroundColor: 'rgb(33, 33, 36)' }}>
      <h2 className="text-base font-semibold mb-6">Issue Reports</h2>

      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-300 font-medium">No issue reports</p>
          <p className="text-gray-500 text-sm mt-1">There are no issue reports to show</p>
        </div>
      ) : (
        <div className="space-y-2">
          {complaints.map(complaint => (
            <div key={complaint.id} className="p-3 border border-gray-700 rounded">
              <p className="text-sm font-medium">Order: {complaint.order_number}</p>
              <p className="text-sm text-gray-400 mt-1">{complaint.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(complaint.created_at).toLocaleDateString('en-US')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.details.after",
})

export default ComplaintsWidget
