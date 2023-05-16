import jason from "./texts.json"
import Exercise from "../../ExerciseComponents";
import {useEffect, useState} from "react";
import ExerciseModal from "../../ExerciseModal";
import Choose from "../../exercisis/Choose";

const comp = ({index = 0}: { index?: number }) => {
    const [i, setI] = useState(index)
    const currentSlide = jason.texts[0]!.slides[i]!;




    const Exercise = () => {
        switch (currentSlide.title) {
            case "Malware":
                return <button onClick={() => {
                    console.log(i)
                    if (i + 1 >= jason.texts[0]!.slides.length) setI(0)
                    else setI(i + 1)
                }}>next</button>
            case "Pretexting":
                return <Choose pos={["ano", "ne"]} correctOne={0} onDone={(b)=>{
                    if (b) {
                        if (i + 1 >= jason.texts[0]!.slides.length) setI(0)
                        else setI(i + 1)
                    }else {
                        //TODO: ERROR
                        setI(0)}
                }}/>
            case "Phishing":


            default: return <div>no exercise</div>
        }
    }


    return (
        <ExerciseModal title={jason.texts[0]!.title} description={jason.description} sectionTitle={currentSlide.title} sectionDescription={currentSlide.text}>
            <div className="text-center">
                <Exercise/>
            </div>
        </ExerciseModal>

    );
};
export default comp;