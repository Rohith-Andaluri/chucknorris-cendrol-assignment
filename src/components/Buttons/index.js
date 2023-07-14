import React from 'react'

import './index.css'

const Buttons = (props) => {
  const {buttonValue, handleButton} = props

  const onClickButton = () => {
    handleButton(buttonValue)
  }

  return (
    <li className='button-container'>
        <button type='button' onClick={onClickButton} className='button'>{buttonValue}
          <span className='desc'>Unlimited Jokes on {buttonValue}</span>
        </button>
    </li>
  )
}

export default Buttons