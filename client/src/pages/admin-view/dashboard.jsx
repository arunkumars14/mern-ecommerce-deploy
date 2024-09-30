import ProductmageUpload from '@/components/admin-view/image-upload'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { addFeatureImage, getFeatureImages } from '@/store/common-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AdminDashboard() {

  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const {featureImageList} = useSelector(state => state.commonFeature)
  const {toast} = useToast()

  function handleUploadFeatureImage(){

    dispatch(addFeatureImage(uploadedImageUrl)).then(data => {
      if(data?.payload?.success){
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedImageUrl("")
        toast({
          title: "Image uploaded successfully"
        })
      }
    })
  }
  useEffect(()=>{
    dispatch(getFeatureImages())
  }, [dispatch])


  return (
    <div>
      <ProductmageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isCustomStyling={true}/>


      <Button disabled={uploadedImageUrl === ""} onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="">
        {featureImageList && featureImageList.length > 0 ? featureImageList.map(featureImgItem => <div key={featureImgItem?._id} className='flex flex-col gap-4 mt-5'>
          <img src={featureImgItem.image} alt="" className='w-full h-[300px] object-cover rounded-t-lg'/>
        </div>) : null}
      </div>
    </div>
  )
}

export default AdminDashboard
