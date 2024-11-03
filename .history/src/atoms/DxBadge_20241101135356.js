import React from 'react'

function DxBadge({ count, style }) {
  return (
    <div
    style={{
      display: count > 0 ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#52c41a",
      color: "#fff",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      fontSize: "12px",
      ...style,
    }}
  >
    {count}
  </div>  )
}

export default DxBadge