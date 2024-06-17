import React from 'react'
import "./IconBox.css"
import { IoBookmarkOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";

function IconBox({name}) {
  return (
    <div className='iconBox'>
<FaLocationDot className='ic'/>
<p className='ic-name'>IconName</p>
    </div>
  )
}

export default IconBox