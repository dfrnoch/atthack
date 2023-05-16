import json from "./categories/OnlineKonv/socialEngeneering.json"
import {useEffect, useState} from "react";
import ExerciseModal from "./ExerciseModal";
import Choose from "./exercisisTypes/Choose";

const ExerciseComp = ({index = 0, onDone, exercise}: {exercise:any, index?: number, onDone:(b:boolean)=>void}) => {
    const currentSlide = json.exercises[index]
    const ex = exercise({index, onDone})

    return (
        <ExerciseModal title={json.title} description={currentSlide.text} sectionTitle={currentSlide.title}>
            <div className="text-center h-full w-full">
                {ex}
            </div>
        </ExerciseModal>

    );
};
export default ExerciseComp;

