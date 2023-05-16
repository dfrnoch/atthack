const phishingEmails = [
    {
        subject: "IT Oddělení - Aktualizace Windows",
        content: `Zdravíme {oslovení} {jméno},
Vaše verze Windows je zastaralá. Prosím aktualizujte systém na nejnovější verzi.
Pokud tento email čtete, je nutné ihned aktualizovat systém. V opačném případě může dojít k zablokování vašeho účtu.
Klikněte na tento odkaz pro aktualizaci: <a href="{target_link}" style="word-wrap: break-word;">{target_link}</a>
Děkujeme za pochopení,
IT oddělení`
    },
    {
        subject: "Office 365 - Aktualizace",
        content: `Dobrý den {oslovení} {jméno},
Je potřeba aktualizovat váš balíček Office 365.
Váš balíček Office 365 můžete aktualizovat kliknutím na tento odkaz: <a href="{target_link}" style="word-wrap: break-word;">{target_link}</a>
Děkujeme,
IT oddělení`
    },
    {
        subject: "Účetní Oddělení - Neshody v daňovém přiznání",
        content: `Dobrý den {oslovení} {jméno},
Byli nalezeny nějaké neshody ve vašem daňovém přiznání. Prosím otevřete přiložený odkaz a opravte chyby.
Je ovšem nutné, aby jste se přihlásili do systému přes vaše přihlašovací údaje.
Přihlášení: <a href="{target_link}" style="word-wrap: break-word;">{target_link}</a>
Děkujeme,
Účetní oddělení`
    },
    {
        subject: "Změna odměn zaměstnancům",
        content: `Dobrý den {oslovení} {jméno},
Plánované změny odměn zaměstnancům jsou k dispozici na tomto odkazu: <a href="{target_link}" style="word-wrap: break-word;">{target_link}</a>
Nezapomeňte že je nutné se přihlásit do systému přes vaše přihlašovací údaje.
Děkujeme,
Vedení společnosti`
    }
];

export default phishingEmails;