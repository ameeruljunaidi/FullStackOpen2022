import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((acc, part) => part.exercises + acc, 0)}</p>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => <>{parts.map(part => <Part key={part.id} part={part}/>)}</>

const Course = ({course}) =>
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>

const Courses = ({courses}) => <>{courses.map(course => <Course key={course.id} course={course}/>)}</>

export default Courses