import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

function StarRatingComponent({rating, handleRatingChange}) {
  return (
    [1, 2, 3, 4, 5].map((star, index) => <Button onClick={handleRatingChange ? () => handleRatingChange(star) : null} key={index} variant="outline" size="icon" className={`p-2 rounded-full transition-colors ${star <= rating ? "text-yellow-500 hover:bg-black hover:text-yellow-500" : "text-black hover:bg-primary hover:text-primary-foreground"}`}>
        <StarIcon className={`w-6 h-6 ${star <= rating ? "fill-yellow-500" : "fill-black"}`}/>
    </Button>)
  )
}

export default StarRatingComponent
