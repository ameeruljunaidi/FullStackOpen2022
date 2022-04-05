const Header = (title) => {
    return (<h1>{title.course}</h1>)
}

const Part = (part) => {
    return (<p>{part.part} {part.exercise}</p>)
}

const Content = (content) => {
    return (<div>
        <Part part={content.parts[0].name} exercise={content.parts[0].exercises}/>
        <Part part={content.parts[1].name} exercise={content.parts[1].exercises}/>
        <Part part={content.parts[2].name} exercise={content.parts[2].exercises}/>
    </div>)
}

const Total = (amount) => {
    return (
        <p>
            Number of exercises {amount.parts[0].exercises + amount.parts[1].exercises + amount.parts[2].exercises}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            name: "Fundamentals of React", exercises: 10
        }, {
            name: "Using props to pass data", exercises: 7
        }, {
            name: "State of a component", exercises: 14
        }]
    }

    return (<div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>)
}

export default App