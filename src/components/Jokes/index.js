import React from 'react'


import './index.css'

const Jokes = (props) => {
  const {jokesData, handleNext} = props
  const {category, jokeValue} = jokesData
 
  

  const onNextJokeClick = () => {
    handleNext(category)
  }

  return (
    <div className='joke-container'>
        <p className='joke'>" {jokeValue} "</p>
        <button className='next-button' type='button' onClick={onNextJokeClick}>Next Joke</button>
    </div>  
  )
}

export default Jokes