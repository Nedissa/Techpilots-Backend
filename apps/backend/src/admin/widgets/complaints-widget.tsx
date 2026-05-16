import { defineWidgetConfig } from "@medusajs/admin-sdk"

const ComplaintsWidget = ({ data }: any) => {
  // Read complaints directly from data object passed by Medusa
  const complaints = data?.metadata?.complaints || []

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-4">Felanmälningar</h2>

      {complaints.length === 0 ? (
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
