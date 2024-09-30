import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'


function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) {
  return (
    <Card onClick={setCurrentSelectedAddress ? ()=> setCurrentSelectedAddress(addressInfo) : null} className={`cursor-pointer ${selectedId?._id === addressInfo?._id ? "border-black border-[4px]" : ""}`}>
        <CardContent className={`grid p-4 gap-4`}>
            <Label className="">
                Address: {addressInfo?.address}
            </Label>
            <Label className="">
                City: {addressInfo?.city}
            </Label>
            <Label className="">
                Pincode: {addressInfo?.pincode}
            </Label>
            <Label className="">
                Phone: {addressInfo?.phone}
            </Label>
            <Label className="">
                Notes: {addressInfo?.notes}
            </Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
                <Button onClick={()=> handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={()=> handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
    </Card>
  )
}

export default AddressCard
