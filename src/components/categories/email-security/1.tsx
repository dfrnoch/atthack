import Exercise from "~/components/Exercise";

export const id = "email-security-1";
export default function EmailExercise1() {


    return (
        <Exercise>
            <Exercise.Header>
                <Exercise.Title>
                    E-mail s žádostí o <Exercise.Highlighted>změnu hesla</Exercise.Highlighted>
                </Exercise.Title>

                <Exercise.Description>
                    Tento e-mail může vypadat jako oficiální zpráva od IT oddělení firmy a žádat zaměstnance o změnu
                    svého hesla. Odkaz však může vést na falešnou stránku, kde bude požadováno zadání citlivých
                    informací, jako jsou přihlašovací údaje.
                </Exercise.Description>
            </Exercise.Header>

            <Exercise.Content>
                <div className={"flex flex-col my-12"}>
                    <EmailInboxRow/>
                </div>
            </Exercise.Content>
        </Exercise>
    )
}

function EmailInboxRow(props: {name: string, message: string, date: string, selected?: boolean}) {
    return (
        <div className={`hover:bg-white/5 rounded-lg px-4 py-3 select-none flex flex-row w-full justify-between ${props.selected ? "text-gray-100" : "text-gray-400"}`}>
            <p className={"w-32"}>Jane Cooper</p>
            <p className={"truncate"}>Lorem ipsum dolor sit amet, ametusat gandhat kokot šumalin dajkokovsi</p>
            <p className={"w-32 text-right"}>23. 5. 2023</p>
        </div>
    )
}