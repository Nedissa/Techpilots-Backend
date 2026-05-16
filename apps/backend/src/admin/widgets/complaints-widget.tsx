import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

const ComplaintsWidget = ({ data }: any) => {
  const [complaints, setComplaints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!data?.id) {
      setLoading(false)
      return
    }

    // Fetch customer data directly from API to get metadata
    fetch(`/admin/customers/${data.id}`)
      .then(res => res.json())
      .then(result => {
        const complaintsList = result.customer?.metadata?.complaints || []
        setComplaints(complaintsList)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load complaints:", err)
        setLoading(false)
      })
  }, [data?.id])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-4">Felanmälningar</h2>

      {loading ? (
        <p className="text-gray-500">Laddar...</p>
      ) : complaints.length === 0 ? (
        <p className="text-gray-500">Inga felanmälningar registrerade på denna kund.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint: any, index: number) => (
            <div key={index} className="border-b pb-3 last:border-b-0">
              <p className="font-medium text-sm text-gray-800">Beställning: {complaint.order_id}</p>
              <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString('sv-SE') : 'Inget datum'}
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
