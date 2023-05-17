import Exercise from "~/components/Exercise";

export const id = "email-security-4";
export default function EmailExercise4() {
    return (
        <Exercise>
            <Exercise.Header>
                <Exercise.Title>
                    E-mail od <Exercise.Highlighted>banky</Exercise.Highlighted>
                    <Exercise.Description>
                        E-mail může vypadat jako zpráva od banky, která žádá zaměstnance o ověření svých bankovních údajů,
                        aby se zabránilo údajnému podvodnému použití účtu.
                    </Exercise.Description>
                </Exercise.Title>
            </Exercise.Header>
        </Exercise>
    )
}