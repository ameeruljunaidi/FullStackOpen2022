import { CoursePart } from "./App";

interface TotalProps {
    courses: CoursePart[];
}

const Total = ({ courses }: TotalProps) => {
    const total = courses.reduce((acc, course) => acc + course.exerciseCount, 0);

    return <h2>Number of exercises {total}</h2>;
};

export default Total;
