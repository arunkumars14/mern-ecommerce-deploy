import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function PaymentSuccessPage() {
  const navigate = useNavigate()
  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">
          Payment Successful
        </CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={()=> navigate("/shop/account")}>
        Go to Orders Page
      </Button>
    </Card>
  )
}

export default PaymentSuccessPage
