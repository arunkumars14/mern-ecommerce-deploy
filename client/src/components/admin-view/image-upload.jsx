import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

function ProductmageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode, isCustomStyling=false}) {

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setImageFile(selectedFile)
    }

    function handleDragOver(event) {
        event.preventDefault()
    }
    function handleDrop(event) {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) setImageFile(droppedFile)
    }
    function handleRemoveImage() {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    const inputRef = useRef(null)

    async function uploadImageToCloudinary() {
        setImageLoadingState(true)
        const data = new FormData()
        data.append("my_file", imageFile)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Ensure the correct headers are set
            }
        })

        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false)
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])


    return (
        <div className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}>
                <Input id="image-upload" className="hidden" type="file" ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}/>
                {
                    !imageFile ? (<Label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed " : "cursor-pointer"} flex flex-col items-center justify-center h-32`}>
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                        <span>Drag & Drop or Click to upload image</span>
                    </Label>) : (
                        imageLoadingState ? <Skeleton className="h-10 bg-gray-100"/> : 
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center"><FileIcon className='w-7 h-8 text-primary mr-2' /></div>
                            <p className='text-sm font-medium'>{imageFile.name}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                <XIcon className='w-4 h-4' />
                                <span className='sr-only'>Remove</span>
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductmageUpload
