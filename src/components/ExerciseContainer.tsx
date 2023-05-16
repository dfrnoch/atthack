import {PropsWithChildren} from "react";
import {Title} from "@mantine/core";

export default function ExerciseContainer(props: PropsWithChildren<{title: string}>) {
    return (
        <div className={"bg-gray-800 rounded-lg shadow-lg p-4"}>
            <Title>{props.title}</Title>
            {props.children}
        </div>
    )
}