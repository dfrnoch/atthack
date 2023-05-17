import Exercise from "~/components/Exercise";

export const id = "email-security-4";
export default function EmailExercise4() {
    return (
        <Exercise>
            <Exercise.Header>
                <Exercise.Title>
                    E-mail s údajnou <Exercise.Highlighted>nabídkou práce</Exercise.Highlighted>
                    <Exercise.Description>
                        Tento typ e-mailu může vypadat jako zpráva od potenciálního zaměstnavatele, který nabízí zaměstnanci
                        práci. E-mail může žádat o osobní informace a dokumenty, jako jsou kopie pasu nebo platební údaje,
                        aby se údajně ověřila identita nebo provedly platby za služby.
                    </Exercise.Description>
                </Exercise.Title>
            </Exercise.Header>
        </Exercise>
    )
}