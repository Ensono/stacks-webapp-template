import {MenuItem, TextField} from "@material-ui/core"
import {getLanguages} from "lib/contentful-api"
import {useRouter} from "next/router"
import React, {useEffect} from "react"

export const LocaleSwitcher: React.FC = () => {
    const router = useRouter()

    const [lang, setLang] = React.useState("en-GB")
    const [allLang, setAllLang] = React.useState([])

    useEffect(() => {
        if (localStorage.getItem("locale"))
            setLang(localStorage.getItem("locale"))
        else localStorage.setItem("locale", "en-GB")

        const fetchData = async () => {
            const allLangs = await getLanguages()
            setAllLang(allLangs.items)
        }
        fetchData()
    }, [])

    const handleChange = event => {
        localStorage.setItem("locale", event.target.value)
        setLang(event.target.value)
        const justLangCodes = allLang.map(lang => lang.code)
        const regex = new RegExp(`(${justLangCodes.join("|")})`)
        router.push(
            router.pathname,
            router.asPath.replace(regex, `${event.target.value}`),
        )
    }

    return (
        <>
            {allLang?.length && (
                <TextField
                    id="select"
                    value={lang}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={!router.route.startsWith("/posts")}
                    select
                >
                    {allLang.map(locale => (
                        <MenuItem key={locale.code} value={locale.code}>
                            {locale.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </>
    )
}
