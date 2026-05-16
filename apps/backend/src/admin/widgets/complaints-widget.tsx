import { defineWidgetConfig } from "@medusajs/admin-sdk"

interface Complaint {
  id: string
  order_id: string
  description: string
  created_at: string
  status: string
}

const ComplaintsWidget = ({ data }: any) => {
  const complaints: Complaint[] = data?.metadata?.complaints || []

  return (
    <div className="border border-blue-500/50 rounded p-6" style={{ backgroundColor: 'rgb(33, 33, 36)' }}>
      <h2 className="text-base font-semibold mb-6">Felanmälningar</h2>

      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-300 font-medium">Inga felanmälningar</p>
          <p className="text-gray-500 text-sm mt-1">Det finns inga felanmälningar att visa</p>
        </div>
      ) : (
        <div className="space-y-2">
          {complaints.map((complaint: Complaint) => (
            <div key={complaint.id} className="p-3 border border-gray-700 rounded">
              <p className="text-sm font-medium">Beställning: {complaint.order_id}</p>
              <p className="text-sm text-gray-400 mt-1">{complaint.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Status: {complaint.status}
              </p>
              <p className="text-xs text-gray-500">
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
