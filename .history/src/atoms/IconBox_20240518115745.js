import React from 'react'
import "./IconBox.css"
import { IoBookmarkOutline } from "react-icons/io5";

function IconBox({name, ic}) {
  return (
    <div className='iconBox'>
<IoBookmarkOutline className='ic'/>
<p className='ic-name'>{name || "Icon Name"}</p>
    </div>
  )
}

export default IconBox