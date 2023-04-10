// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {time: 25, seconds: '00', start: true}

  timer = () => {
    const {start} = this.state

    if (start === true) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState({start: !start})
    } else {
      clearInterval(this.timerId)
      this.setState({start: !start})
    }
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.seconds === '00' && prevState.time === 0) {
        clearInterval(this.timerId)
        return {start: true}
      }
      if (prevState.seconds === '0' || prevState.seconds === '00') {
        return {
          time: prevState.time - 1,
          seconds: '59',
        }
      }
      if (parseInt(prevState.seconds) <= 10) {
        return {
          seconds: '0'.concat((parseInt(prevState.seconds) - 1).toString()),
        }
      }
      return {
        seconds: (parseInt(prevState.seconds) - 1).toString(),
      }
    })
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState({time: 25, seconds: '00', start: true})
  }

  onClickPlus = () => {
    this.setState(prevState => {
      if (prevState.start !== false) {
        return {time: prevState.time + 1, seconds: '00'}
      }
      return null
    })
  }

  onClickMinus = () => {
    this.setState(prevState => {
      if (prevState.time === 0) {
        return {time: 0}
      }
      if (prevState.start !== false) {
        return {time: prevState.time - 1, seconds: '00'}
      }
      return null
    })
  }

  render() {
    const {time, seconds, start} = this.state
    const altValue = start ? 'play icon' : 'pause icon'
    const imgUrl = start
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const timeDesc = start ? 'Paused' : 'Running'
    const text = start ? 'Start' : 'Pause'

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="time-container">
          <div className="time">
            <div className="time-description">
              <h1 className="digital-time">
                {time}:{seconds}
              </h1>
              <p className="digital-time-description"> {timeDesc}</p>
            </div>
          </div>

          <div className="start-pause-reset-set-container">
            <div className="start-reset-container">
              <div className="start-pause-container">
                <img
                  src={imgUrl}
                  alt={altValue}
                  className="start-img"
                  onClick={this.timer}
                />
                <button type="button" onClick={this.timer} className="start">
                  {text}
                </button>
              </div>

              <div className="start-pause-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="start-img"
                  onClick={this.onClickReset}
                />
                <button
                  type="button"
                  className="start"
                  onClick={this.onClickReset}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="set-timer-container">
              <p>Set Timer limit </p>
              <div className="set-time">
                <button
                  type="button"
                  className="set-min"
                  onClick={this.onClickMinus}
                >
                  -
                </button>
                <p className="min">{time}</p>
                <button
                  type="button"
                  className="set-min"
                  onClick={this.onClickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
