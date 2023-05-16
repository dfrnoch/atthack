const getAiExercises = ({index, onDone}:{index:number, onDone: (b:boolean)=>void}) => {
    switch (index) {
        case 0:

        case 1:

        default: return <h3 onClick={()=>onDone(false)} className={"cursor-pointer"}>no exercise</h3>
    }
}

export default getAiExercises