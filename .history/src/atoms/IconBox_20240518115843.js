import React from 'react'
import "./IconBox.css"
import { IoBookmarkOutline } from "react-icons/io5";

function IconBox({name, icon:Icon}) {
  return (
    <div className='iconBox'>
      {Icon && <Icon className='ic' />}
<p className='ic-name'>{name || "Icon Name"}</p>
    </div>
  )
}

export default IconBox