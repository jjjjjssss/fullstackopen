
import { useState } from 'react'

// // COMPLEX STATE
// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleLeftClick = () => {
//     setClicks({
//       ...clicks,
//       left: clicks.left + 1
//     })
//   }

//   const handleRightClick = () => {
//     setClicks({
//       ...clicks,
//       right: clicks.right + 1
//     })
//   }
  
//   return (
//     <div>
//       {clicks.left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {clicks.right}
//     </div>
//   )
// }

// const Button = ({onClick, text}) => {
//   return (
//     <button onClick={onClick}>
//       {text}
//     </button>
//   )
// }

// HANDLING ARRAYS

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const History = ({allClicks}) => {
  if (allClicks.length == 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

export default App