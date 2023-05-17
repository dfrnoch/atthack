import {PropsWithChildren, useEffect, useState} from "react";
import {Title} from "@mantine/core";

export function Exercise(props: PropsWithChildren<{}>) {
    return (
        <div>
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

function Header(props:PropsWithChildren<{}>) {
    return (
        <div>
            {props.children}
            <div className={"h-[1px] bg-neutral-700 text-neutral-700 w-full"}></div>
        </div>
    )
}

function Content(props: PropsWithChildren<{}>) {
    const [opacity, setOpacity] = useState("opacity-0");

    // Change opacity to 100 after 1 second.
    useEffect(() => {
        setTimeout(() => {
            setOpacity("opacity-100");
        }, 600);
    }, []);

    return (
        <div className={`transition duration-1000 ${opacity}`}>
            {props.children}
        </div>
    )
}

function ExerciseDescription(props: PropsWithChildren<{}>) {
    return (
        <p className={"text-gray-400 pb-8"}>
            {props.children}
        </p>
    )
}

function ExerciseCategoryTitle(props: PropsWithChildren<{}>) {
    return (
        <Title size={"h3"}>
            {props.children}
        </Title>
    )
}

function Highlighted(props: PropsWithChildren<{}>) {
    return (
        <span className={"text-blue-300"}>
            {props.children}
        </span>
    )
}

Exercise.Title = ExerciseTitle;
Exercise.CategoryTitle = ExerciseTitle;
Exercise.Highlighted = Highlighted;
Exercise.Description = ExerciseDescription;
Exercise.Header = Header;
Exercise.Content = Content;
export default Exercise;

/*
function ExerciseSubtitle(props: PropsWithChildren<{}>) {
    return (
        <Title size={"H5"} className={"text-gray-400"}>
            {props.children}
        </Title>
    )
}*/
