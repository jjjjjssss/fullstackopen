const Course = ({course}) => {
    const {name, parts} = course
  
    const allParts = parts.map((part) => <Part key={part.id} part={part} />)
    const totalExercises = parts.reduce((sum, part) => (
      sum + part.exercises
    ), 0)
  
    return (
      <div>
        <h2>{name}</h2>
        <div>
          {allParts}
        </div>
        <p><b>total of {totalExercises} exercises</b></p>
      </div>
    )
  
  }
  
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>

  export default Course