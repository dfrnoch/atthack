import Choose from "~/components/exercisisTypes/Choose";


//JUST EXAMPLE!!!
const getSocExercises = ({index, onDone}: { index: number, onDone: (b: boolean) => void }) => {
    switch (index) {
        case 0:
            return <button onClick={() => {
                onDone(true)
            }}>next</button>
        case 1:
            return <Choose pos={["ano", "ne"]} correctOne={0} onDone={(b) => {
                onDone(b)
            }}/>

        default:
            return <h3 onClick={() => onDone(false)} className={"cursor-pointer"}>no exercise</h3>
    }
}

export default getSocExercises