import {MenuItem, TextField, makeStyles} from "@material-ui/core"
import {getLanguages} from "../../lib/contentful-api"
import {useRouter} from "next/router"
import React, {useEffect} from "react"

const useStyles = makeStyles(theme => ({
    select: {
        padding: theme.spacing(0, 3, 0),
        width: "250px",
    },
}))

export const LocaleSwitcher: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()

    const [lang, setLang] = React.useState("en-GB")
    const [allLang, setAllLang] = React.useState([])

    useEffect(() => {
        setLang(router?.asPath?.split("/")[2])

        const fetchData = async () => {
            const allLangs = await getLanguages()
            setAllLang(allLangs.items)
        }
        if (router?.route?.startsWith("/posts")) fetchData()
    }, [])

    const handleChange = event => {
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
            {router?.route?.startsWith("/posts") && allLang?.length && (
                <TextField
                    className={classes.select}
                    id="select_lang"
                    value={lang}
                    onChange={handleChange}
                    variant="outlined"
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
