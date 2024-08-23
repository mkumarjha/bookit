import React from "react";

const RoomImageSlider = ({ images }) => {
    return <div style={{width: '100%', height: '460px'}}>
    <img
      className="d-block m-auto"
      src="./images/default_room_image.jpg"
      alt="images/default_room_image.jpg"
      layout="fill"
    />
  </div>
}


export default RoomImageSlider;