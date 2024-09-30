import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './address-card'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: ""
}

function Address({setCurrentSelectedAddress, selectedId}) {
    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)
    const {toast} = useToast()

    function handleManageAddress(event) {
        event.preventDefault()
        if(addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData)
            toast({
                title: "You can add only 3 address maximum",
                variant: "destructive"
            })
            return;
        }
        currentEditedId !== null ? dispatch(editaAddress({
            userId: user?.id, 
            addressId: currentEditedId,
            formData
        })).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
                setCurrentEditedId(null)
                setFormData(initialAddressFormData)
                toast({
                    title: "Address Updated successfully"
                })
            }
        }) :
            dispatch(addNewAddress({
                ...formData,
                userId: user?.id
            })).then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title: "Address Added successfully"
                    })
                }
            })
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id))
                toast({
                    title: "Address deleted successfully"
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
        })
    }

    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item)
    }

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ? addressList.map(singleAddressItem => <AddressCard key={singleAddressItem?._id} addressInfo={singleAddressItem} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={selectedId}/>) : null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {
                        currentEditedId !== null ? "Edit Address" : "Add New Address"
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={
                        currentEditedId !== null ? "Edit" : "Add"
                    }
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />

            </CardContent>

        </Card>
    )
}

export default Address
