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
            <Exercise>


            </Exercise>
        </Exercise>
    )
}