import {PropsWithChildren} from "react";
import {Title} from "@mantine/core";

function Exercise(props: PropsWithChildren<{}>) {
    return (
        <div className={"bg-gray-800 rounded-lg shadow-lg p-4"}>
            {props.children}
        </div>
    )
}

function ExerciseTitle(props: PropsWithChildren<{}>) {
    return (
        <Title>
            {props.children}
        </Title>
    )
}

function Description(props: PropsWithChildren<{}>) {
    return (
        <p>
            {props.children}
        </p>
    )
}

Exercise.Title = ExerciseTitle;
Exercise.Description = Description;
export default Exercise;