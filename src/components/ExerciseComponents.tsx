import {PropsWithChildren} from "react";
import {Title} from "@mantine/core";


/**
 * Exercise container.
* */
function Exercise(props: PropsWithChildren<{}>) {
    return (
        <div className={""}>
            {props.children}
        </div>
    )
}

function ExerciseTitle(props: PropsWithChildren<{}>) {
    return (
        <Title size={"h2"} className={"pb-4"}>
            {props.children}
        </Title>
    )
}

function Description(props: PropsWithChildren<{}>) {
    return (
        <div className={"text-neutral-400"}>
            {props.children}
        </div>
    )
}

/**
 * A span that highlights the text inside it. Use to highlight important words.
* */
function Highlighted(props: PropsWithChildren<{}>) {
    return (
        <span className={"text-blue-300"}>
            {props.children}
        </span>
    )
}

Exercise.Title = ExerciseTitle;
Exercise.Description = Description;
Exercise.Highlighted = Highlighted;
export default Exercise;