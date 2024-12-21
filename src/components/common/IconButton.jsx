import React from 'react'

function IconButton({
        text,
        onClick,
        children,
        disabled,
        outLine=false,
        customClasses,
        type
}) {
  return (
    <button 
    disabled={disabled}
    onClick={onClick}
    type={type}
    >
        {
                children ? (<>
                <span>
                        {text} 
                </span>
                {children}
                </>):(
                        {text}
                )
        }
    </button>
  )
}

export default IconButton