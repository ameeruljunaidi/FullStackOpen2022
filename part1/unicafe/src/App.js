import {useState} from 'react'

const Header = ({title}) => (<h1>{title}</h1>)

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text}</button>

const StatisticsLine = ({text, value, post}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {post}</td>
        </tr>
    )
}


const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = (good / total) * 100

    if (total === 0) return (<div>No feedback given</div>)
    return (
        <div>
            <table>
                <tbody>
                <StatisticsLine text={"good"} value={good}/>
                <StatisticsLine text={"neutral"} value={neutral}/>
                <StatisticsLine text={"bad"} value={bad}/>

                <StatisticsLine text={"all"} value={total}/>
                <StatisticsLine text={"average"} value={average}/>
                <StatisticsLine text={"positive"} value={positive} post={"%"}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header title={"give feedback"}/>

            <Button handleClick={() => setGood(good + 1)} text={"good"}/>
            <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
            <Button handleClick={() => setBad(bad + 1)} text={"bad"}/>

            <Header title={"statistics"}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
