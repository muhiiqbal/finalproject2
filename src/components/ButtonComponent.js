import React from 'react'

const ButtonComponent = (props) => {
  return (
    <button
    type={props.buttonType === "submit" ? "submit" : "button"}
    onClick={props.OnPress}
    className={props.className}
    to={props.to}
    >
      {props.label}
    </button>
  )
}

export default ButtonComponent