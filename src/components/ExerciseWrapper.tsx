import {useState} from "react";
import ExerciseComp from "~/components/ExerciseComp";

export default function ({json, exercise}:{json:any, exercise?:any}) {
    const [done, setDone] = useState(-1)
    const [index, setIndex] = useState(0)
    const [active, setActive] = useState(false)

    const Path = () => {
        const Button = ({children}) => {
            return <button disabled={done+2<parseInt(children)}
                           className={"disabled:opacity-30 w-20 h-20 rounded-full text-black text-2xl font-extrabold shadow-inner my-5 hover:bg-emerald-400 transition-all duration-300 ease-in-out "
                               + (done+1>=parseInt(children) ?" bg-emerald-400":" bg-gray-100") + (parseInt(children) % 2? " self-start":" self-end")} onClick={()=>{
                setIndex(parseInt(children) - 1)
                setActive(true)}
            }>{children}</button>
        }
        return (
            <div className={"relative flex flex-col w-[400px] mx-auto my-auto h-70%"}>
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
                    setDone(index)
                }
                setActive(false)
            }}/> : <Path/>
            }
        </div>
    )
}