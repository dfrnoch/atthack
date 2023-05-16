import {PropsWithChildren} from "react";


/**
 * A test modal that will contain the exercise. Used to test how it will look.
* */
export default function ExerciseModal(props: PropsWithChildren<{}>) {
    return (
        <div className={"bg-black/10 w-full h-screen flex"}>
            <div className={"max-w-2xl w-full bg-neutral-800 p-6 shadow-lg mx-auto self-center rounded-lg"}>
                {props.children}
            </div>
        </div>
    )
}