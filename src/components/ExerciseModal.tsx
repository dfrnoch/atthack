import {PropsWithChildren} from "react";


/**
 * A test modal that will contain the exercise. Used to test how it will look.
* */
export default function ExerciseModal({children, title, description, sectionTitle}:{children: any, title: string, description: string, sectionTitle: string}) {


    return (
        <div className={"relative flex mx-8 h-[100vh]"}>
            <div className={"absolute m-4 w- bg-neutral-800 p-6 shadow-lg mx-auto self-center rounded-lg max-h-[60%] overflow-auto"}>
                <h1 className={"text-3xl"}>{title}</h1>
                <p className={"text-lg"}>{sectionTitle}</p>
                <p className={"text-md"}>{description}</p>
                <div className={"my-4"}>
                {children}
                </div>

                {/*FOR TEST*/}
                <div className={"h-60 w-60"}></div>
            </div>
        </div>
    )
}