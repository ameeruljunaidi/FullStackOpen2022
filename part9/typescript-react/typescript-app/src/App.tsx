import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
    description?: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartWithDescription {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartWithDescription {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the easy course part",
            type: "normal",
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the hard course part",
            type: "normal",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
            type: "submission",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special",
        },
    ];

    return (
        <div>
            <Header title={courseName} />
            <Content courses={courseParts} />
            <Total courses={courseParts} />
        </div>
    );
};

export default App;
