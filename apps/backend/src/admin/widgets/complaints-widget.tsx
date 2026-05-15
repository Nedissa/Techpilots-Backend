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

const ComplaintsWidget = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  // Widget är aktiverad - visar felanmälningar från denna kund

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-4">Felanmälningar</h3>

      {complaints.length === 0 ? (
        <p className="text-gray-500">Inga felanmälningar</p>
      ) : (
        <div className="space-y-3">
          {complaints.map(complaint => (
            <div key={complaint.id} className="p-3 border rounded bg-gray-50">
              <p className="font-semibold text-sm">Beställning: {complaint.order_number}</p>
              <p className="text-sm text-gray-700 mt-1">{complaint.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(complaint.created_at).toLocaleDateString('sv-SE')}
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
