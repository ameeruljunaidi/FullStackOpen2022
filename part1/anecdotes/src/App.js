import {useState} from 'react'

const Header = ({title}) => (<h1>{title}</h1>)

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text}</button>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [max, setMax] = useState(0)
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

    return (
        <div>
            <Header title={"Anecdote of the day"}/>

            <div>{anecdotes[selected]}</div>
            <div>has {points[selected]} votes</div>

            <div>
                <Button text={"vote"} handleClick={() => {
                    setPoints(() => {
                        const newVote = [...points]
                        newVote[selected] += 1
                        return newVote
                    })
                    setMax(() => {
                        const max = Math.max(...points)
                        return points.indexOf(max)
                    })
                }}/>
                <Button text={"next anecdote"} handleClick={() => {
                    setSelected(() => Math.floor(Math.random() * anecdotes.length))
                }}/>
            </div>

            <Header title={"Anecdote with the most votes"}/>
            <div>{anecdotes[max]}</div>
            <div>has {points[max]} votes</div>
        </div>
    )
}

export default App
