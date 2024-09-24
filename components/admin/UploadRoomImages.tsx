import { IRoom } from '@/backend/models/room'
import React, { useState } from 'react'

interface Props{
    data: {
        room: IRoom
    } 
}


const UploadRoomImages = ({data}: Props) => {

    const [image, setImage] = useState([]);


  return (
    <div>UploadRoomImages</div>
  )
}

export default UploadRoomImages