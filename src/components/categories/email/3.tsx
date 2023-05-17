import Exercise from "../../ExerciseComponents";
import {List} from "@mantine/core";

/**
 * Scam email / fake nigerijský princ / fake autorita
 * */
export default function EmailExercise3() {
    return (
        <Exercise>
            <Exercise.Title>
                <Exercise.Highlighted>Podvodný</Exercise.Highlighted> e-mail - falešná autorita
            </Exercise.Title>
            <Exercise.Description>
                Někdy můžete dostat e-mail, ve kterém se daný člověk vydává za někoho jiného, aby dosáhl svého cíle.
                Tento podvod se nazývá "falešná autorita". Pokud vám někdo pošle e-mail, ve kterém vás nutí poskytnout
                peníze nebo důvěrné informace, buďte obezřetní a postupujte následovně:
                <br/>
                <br/>
                <List>
                    <List.Item>
                        Nikdy neklikejte na odkazy v podezřelých e-mailech nebo neotevírejte přílohy od neznámých
                        odesílatelů. Pokud vám přijde podezřelý e-mail, označte ho jako spam.
                    </List.Item>

                    <List.Item>
                        Pokud vám někdo pošle e-mail, ve kterém po vás žádá důvěrné informace, jako je například číslo
                        bankovního účtu nebo přihlašovací kód, ověřte si telefonicky, zda takový požadavek skutečně
                        pochází od uvedené instituce.
                    </List.Item>

                    <List.Item>
                        Vymažte podezřelé e-maily bez jejich otevírání a neodpovídejte na ně.
                    </List.Item>
                    <List.Item>
                        Instalujte na svém počítači kvalitní antivirový program a tzv. firewall a pravidelně je
                        aktualizujte.
                    </List.Item>
                </List>
            </Exercise.Description>
        </Exercise>
    );
}