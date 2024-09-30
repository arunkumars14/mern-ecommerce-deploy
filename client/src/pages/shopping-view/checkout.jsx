import React, { useState } from 'react'
import img from "../../assets/account.jpg"
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'

function ShoppingCheckout() {

  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const { approvalURL } = useSelector(state => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  function handleInitialPaypalPayment() {

    if(cartItems.length === 0){
      toast({
        title: "Your cart is empty",
        variant: "destructive"
      })
      return
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed",
        variant: "destructive"
      })
      return
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singlecartItem => ({
        productId: singlecartItem?.productId,
        title: singlecartItem?.title,
        image: singlecartItem?.image,
        price: singlecartItem?.salePrice > 0 ? singlecartItem?.salePrice : singlecartItem?.price,
        quantity: singlecartItem?.quantity
      })),
      addressInfo: {
        ddressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: ""
    }

    dispatch(createNewOrder(orderData)).then(data => {
      if (data?.payload?.success) {
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
    })
  }

  if (approvalURL) {
    window.location.href = approvalURL
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="" className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map(item => <UserCartItemsContent key={item.productId} cartItem={item} />) : null
          }
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitialPaypalPayment} className="w-full">
              {
                isPaymentStart ? "Processing Paypal payment" : "Pay with Paypal"
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout