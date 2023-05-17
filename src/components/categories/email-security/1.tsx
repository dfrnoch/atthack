import Exercise from "~/components/Exercise";
import {useState} from "react";
import {api} from "~/utils/api";
import {Button, Divider, MultiSelect, Title} from "@mantine/core";
import {RxAvatar} from "react-icons/rx";

export const id = "email-security-1";
export default function EmailExercise1(onCompleted?: () => void) {
    function onCorrect() {
        if (typeof onCompleted === "function") onCompleted();
    }

    const {data} = {
        data: {
            subject: "Podezřelá aktivita v účtu | FIO",
            content: `
Dobrý den pane Pešle,
Tuto zprávu vám posíláme, protože jsme zaznamenali aktivitu ve vašem účtu, která by mohla indikovat, že vaše heslo bylo ohroženo. Chceme vás tedy požádat o okamžitou změnu hesla, aby se váš účet stal bezpečnějším.

Pro změnu hesla klikněte na následující odkaz: odkaz. Odkaz vás přesměruje na stránku, kde můžete zadat své stávající heslo a následně vytvořit nové.

Pokud nezměníte heslo do 24 hodin od obdržení této zprávy, bude váš účet uzamčen a nebude možné se k němu přihlásit.

Děkujeme vám za pochopení.

S pozdravem,
Tým technické podpory
`,
        }}
    const [showContent, setShowContent] = useState(false);

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
                    {
                        !showContent
                            ? <BogusInbox name={"Lucie Jablůnková"}
                                          message={"Dobrý den pane Pešle, Tuto zprávu vám posíláme, protože..."}
                                          onClick={() => setShowContent(true)}/>
                            : (data?.subject ? <ShownComponent onCorrect={onCorrect} data={data}/> : null)
                    }
                </div>
            </Exercise.Content>
        </Exercise>
    )
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function  ShownComponent(props: { data: any, onCorrect?: () => void }) {
    return (
        <div className={"fade-in"}>
            <InboxContent message={props.data?.content}
                          subject={props.data?.subject}
                          fromName={"Fio Bank Česko"}
                          fromAddress={"banka@fiobank.xyz"}/>

            <Title size={"h3"} className={"pt-6 pb-2"}>Co na zprávě poukazuje na hoax?</Title>
            <MultiSelect
                data={["adresa", "jméno", "předmět", "obsah", "rozloučení", "profilový obrázek"]}
                label=""
                placeholder="Vyberte všechny platné možnosti"
                defaultValue={["profilový obrázek"]}
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                clearable
            />
            <Button className={"max-w-lg ml-auto my-4"} onClick={props.onCorrect}>Vyhodnotit</Button>
        </div>
    )
}

function InboxContent(props: {subject: string, message: string, fromAddress: string, fromName: string}) {
    return (
        <div className={"rounded-md p-4 bg-neutral-800"}>
            <div className={"flex items-center gap-2"}>
                <RxAvatar size={"70px"}/>
                <div>
                    <p className={"font-bold"}>{props.fromName}</p>
                    <p className={"text-gray-400"}>{props.fromAddress}</p>
                </div>
            </div>
            <Line className={"my-4"}/>
            <Title size={"h3"}>{props.subject}</Title>
            <Line className={"my-4"}/>
            <p className={"whitespace-pre-line"}>
                {props.message}
            </p>
        </div>
    )
}

function BogusInbox(props: {name: string, message: string, onClick: () => void}) {
    return (
        <div className={"flex flex-col mb-8"}>
            {
                [
                    {
                        name: props.name,
                        message: props.message,
                        date: new Date(Date.now()),
                        selected: true,
                        onClick: props.onClick
                    },
                    {
                        name: "Jan Ámos",
                        message: "Dobrý den, chtěl bych se zeptat na vaše možnosti ohledně doučování ...",
                        date: getRandomDate()
                    },
                    {
                        name: "Marek Vašek",
                        message: "Dobrý den, rád bych se informoval o vašich službách školního doučování ...",
                        date: getRandomDate()
                    },
                    {
                        name: "Honza Puk",
                        message: "Dobrý den, mám zájem o vaše služby doučování a chtěl bych se zeptat na podrobnosti ...",
                        date: getRandomDate()
                    },
                    {
                        name: "Jana Sklpová",
                        message: "Dobrý den, zajímalo by mě, zda poskytujete doučování z konkrétního předmětu ...",
                        date: getRandomDate()
                    },
                    {
                        name: "Vašut Mihaj",
                        message: "Dobrý den, rád bych se informoval o cenách vašich služeb doučování ...",
                        date: getRandomDate()
                    }
                ].map((item, index) => {
                    return (
                        <div>
                            <EmailInboxRow key={item.name} {...item}/>
                            <div className={"h-[1px] bg-neutral-800"}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Line = (props: {className?: string}) => <div className={`h-[1px] w-full bg-neutral-700 ${props.className}`}/>

function EmailInboxRow(props: {name: string, message: string, date: Date, selected?: boolean, onClick?: () => void}) {
    return (
        // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={props.onClick} className={`${props.selected && "hover:bg-white/5 cursor-pointer"} rounded-lg px-4 py-3 select-none flex flex-row w-full justify-between ${props.selected ? "text-gray-100" : "text-gray-500"}`}>
            <p className={"w-32"}>{props.name}</p>
            <p className={"truncate text-gray-500"}>{props.message}</p>
            <p className={"w-32 text-right"}>{props.date.toLocaleDateString("cs-CZ")}</p>
        </div>
    )
}

// Get random date 0-1 month before today.
function getRandomDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 1));
    return date;
}