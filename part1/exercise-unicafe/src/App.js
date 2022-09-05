
import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1) / total
  const positive = (good / total)*100 + ' %'
  if (total == 0) {
    return ('No feedback given')
  }
  return (
    <table>
      <tbody>
        <StatisticLine label='good' value={good} />
        <StatisticLine label='neutral' value={neutral} />
        <StatisticLine label='bad' value={bad} />
        <StatisticLine label='all' value={total} />
        <StatisticLine label='average' value={average} />
        <StatisticLine label='positive' value={positive} />
      </tbody>
    </table>
  )
}

export default App