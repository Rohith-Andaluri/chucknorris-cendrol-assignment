import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {RotatingLines} from 'react-loader-spinner'
import {RxCross2} from 'react-icons/rx'

import './App.css'
import Buttons from './components/Buttons';
import Jokes from './components/Jokes';

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const App = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
  }) 
  const [buttonsData, setButtonsData] = useState([]);
  const [joke, setJoke] = useState({category: null, jokeValue: null});
  const [isButtonClicked, setButtonClick] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.chucknorris.io/jokes/categories';
      const options = {
        method : 'GET',
      }
      const response = await fetch(url, options);
      const data = await response.json()
      setButtonsData(prevData => [...data])
      
    }
    fetchData()
  }, [])


  const handleButton = async (categoryValue) => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
    })
    const url = `https://api.chucknorris.io/jokes/random?category=${categoryValue}`;
    console.log(url)
    const options = {
      method : 'GET',
    }
    const response = await fetch(url, options);
    const data = await response.json()
    const jokeValue = data.value
    if(response.ok) {
      setApiResponse(prevApiDetails => ({
        ...prevApiDetails,
        status: apiStatusConstants.success,
      }))
      setJoke(prevData => ({...prevData, category: categoryValue, jokeValue}))
      setButtonClick(prevState => !prevState)
    }
    else {
      setApiResponse(prevApiDetails => ({
        ...prevApiDetails,
        status: apiStatusConstants.failure,
      }))
    }    
  }

  const onCloseClick = () => {
    setButtonClick(!isButtonClicked)
  }

  const handleNext = () => {
    handleButton(joke.category)
    setButtonClick(!isButtonClicked)
  }

  const renderLoadingView = () => (
    <div className='loader-container'>
      <RotatingLines type='RotatingLines' color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    return <Jokes jokesData={joke} handleNext={handleNext} renderLoadingView={renderLoadingView}/>
  }


  const renderJoke = () => {
    const {status} = apiResponse

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }


  return (
    <div className='main-container'>
      <h1 className='heading bounce'>Chuck Norries</h1>
      <ul className='buttons-container'>
        {buttonsData.map(eachItem => (
          <Buttons key={uuidv4()} handleButton={handleButton} buttonValue={eachItem} />
        ))}
      </ul>
      {isButtonClicked && 
        <div className='jokes-container'>
          <div className='head-container'>
              <h1 className='joke-heading'>{joke.category}</h1>
              <button className='cross-button' onClick={onCloseClick}>
                  <RxCross2 className='cross'/>
              </button>
          </div>
          {renderJoke()}
        </div>
      }
    </div>
  )
}

export default App