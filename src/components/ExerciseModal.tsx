import {PropsWithChildren} from "react";


/**
 * A test modal that will contain the exercise. Used to test how it will look.
* */
export default function ExerciseModal(props: PropsWithChildren<{}>) {
    return (
        <div className={"flex m-8 h-screen"}>
            <div className={"max-w-6xl m-4 w-full bg-neutral-800 p-6 shadow-lg mx-auto self-center rounded-lg"}>
                {props.children}
            </div>
        </div>
    )
}