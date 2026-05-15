import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const customerId = req.query.customer_id as string

  try {
    const db = req.scope.resolve("db") as any
    const complaints = await db.query.from("complaint").select(["*"]).where("customer_id", "=", customerId)

    res.json({
      complaints: complaints || [],
    })
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch complaints",
    })
  }
}
