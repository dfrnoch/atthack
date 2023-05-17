import Exercise from "~/components/Exercise";

export const id = "email-security-3";
export default function EmailExercise3() {
    return (
        <Exercise>
            <Exercise.Header>
                <Exercise.Title>
                    E-mail o <Exercise.Highlighted>problému v produkci</Exercise.Highlighted>
                    <Exercise.Description>
                        Tento typ e-mailu může vypadat jako zpráva od kolegy, který má problém s produkčním systémem a
                        potřebuje pomoc. E-mail může žádat o přihlašovací údaje, aby se údajně mohl přihlásit do systému
                        a
                        vyřešit problém.
                    </Exercise.Description>
                </Exercise.Title>
            </Exercise.Header>

            <div>

            </div>
        </Exercise>
    )
}