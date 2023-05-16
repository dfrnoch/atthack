
const choose = ({pos, correctOne, onDone}:{pos:string[], correctOne:number, onDone:(b:boolean)=>void}) => {
    return (
        <div>
            <h1>Choose</h1>
            <div className="flex flex-row justify-center items-center">
                {pos.map((p, i) => {
                    return <button key={i} className={"cursor-pointer mx-8 my-4 hover:bg-slate-500 text-xl px-1 py-0.5 rounded-md"} onClick={()=>{
                        if (i === correctOne) onDone(true)
                        else onDone(false)
                    }}>{p}</button>
                })}
            </div>
        </div>
    );
}

export default choose;