import {PropsWithChildren} from "react";


/**
 * A test modal that will contain the exercise. Used to test how it will look.
* */
export default function ExerciseModal({children, title, description, sectionTitle}:{children: any, title: string, description: string, sectionTitle: string, sectionDescription: string}) {
    return (
        <div className={"flex m-8 h-screen"}>
            <div className={"max-w-6xl m-4 w-full bg-neutral-800 p-6 shadow-lg mx-auto self-center rounded-lg"}>
                <h1 className={"text-3xl"}>{title}</h1>
                <p className={"text-lg"}>{sectionTitle}</p>
                <p className={"text-md"}>{description}</p>
                <div className={"my-4"}>
                {children}
                </div>
            </div>
        </div>
    )
}