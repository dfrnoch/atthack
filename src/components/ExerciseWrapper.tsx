import {useState} from "react";
import ExerciseComp from "~/components/ExerciseComp";
import swcLoader from "next/dist/build/webpack/loaders/next-swc-loader";

export default function ({json, exercise}:{json:any, exercise?:any}) {
    const [done, setDone] = useState(-1)
    const [index, setIndex] = useState(0)
    const [active, setActive] = useState(false)

    const Path = () => {
        const Button = ({children}) => {
            return <button disabled={done+2<parseInt(children)}
                           className={"disabled:opacity-30 w-20 h-20 rounded-full text-black text-2xl font-extrabold shadow-inner my-5 hover:bg-emerald-400 transition-all duration-300 ease-in-out "
                               + (done+1>=parseInt(children) ?" bg-emerald-400":" bg-gray-100") + posSwitcher(parseInt(children-1))} onClick={()=>{
                setIndex(parseInt(children) - 1)
                setActive(true)}
            }>{children}</button>
        }
        return (
            <div className={"relative flex flex-col w-[200px] mx-auto my-auto h-70%"}>
                {json && json.slides ?Array.from({length:json.slides!.length}).map((_,i) => {
                    return <Button key={i}>{i+1}</Button>
                }) : <div>no data</div>}

            </div>
        )
    }
    return (
        <div className={"h-[100vh] w-full"}>
            {active ? <ExerciseComp exercise={exercise} index={index} onDone={(b) => {
                if (b) {
                    if (done < index) {
                        setDone(index)
                    }
                }
                setActive(false)
            }}/> : <Path/>
            }
        </div>
    )
}

const posSwitcher = (pos: number) => {
    switch (pos) {
        case 0:
            return " self-center"
        case 1:
            return " self-start"
        case 2:
            return " self-center"
        case 3:
            return " self-end"
        case 4:
            return " self-center"
        case 5:
            return " self-start"
        case 6:
            return " self-center"
        case 7:
            return " self-end"
        case 8:
            return " self-center"
        case 9:
            return " self-start"

            default: return ""


    }
}