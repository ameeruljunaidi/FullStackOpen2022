import { CoursePart } from "./App";

interface ContentProps {
    courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => (
    <>
        {courses.map(course => {
            switch (course.type) {
                case "normal":
                    return (
                        <>
                            <h2>
                                {course.name} {course.exerciseCount}
                            </h2>
                            <p>Course Description: {course.description} </p>
                        </>
                    );
                case "groupProject":
                    return (
                        <>
                            <h2>
                                {course.name} {course.exerciseCount}
                            </h2>
                            <p>Course Description: {course.description}</p>
                            <p>Group Project Count: {course.groupProjectCount}</p>
                        </>
                    );
                case "submission":
                    return (
                        <>
                            <h2>
                                {course.name} {course.exerciseCount}
                            </h2>
                            <p>Course Description: {course.description}</p>
                            <p>Group Project Submission Link: {course.exerciseSubmissionLink}</p>
                        </>
                    );
                case "special":
                    return (
                        <>
                            <h2>
                                {course.name} {course.exerciseCount}
                            </h2>
                            <p>Course Description: {course.description}</p>
                            <p>Group Project Count: {course.requirements.join(", ")}</p>
                        </>
                    );
                default:
                    return <></>;
            }
        })}
    </>
);
export default Content;
