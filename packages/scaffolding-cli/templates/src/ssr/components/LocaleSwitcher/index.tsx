import {MenuItem, TextField, makeStyles} from "@material-ui/core"
import {getLanguages} from "../../lib/contentful-api"
import {useRouter} from "next/router"
import React, {useEffect} from "react"
import conf from "../../environment-configuration"

const useStyles = makeStyles(theme => ({
    select: {
        padding: theme.spacing(0, 3, 0),
        width: "250px",
    },
}))

export const LocaleSwitcher: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()

    const [lang, setLang] = React.useState(
        conf.NEXT_PUBLIC_CONTENTFUL_DEFAULT_LOCALE,
    )
    const [allLang, setAllLang] = React.useState([])
    const [containsLocale, setContainsLocale] = React.useState(false)

    useEffect(() => {
        setLang(router?.asPath?.split("/")[2])

        const fetchData = async () => {
            const locales = await getLanguages()
            setAllLang(locales.items)
            const justLangCodes = await locales.items.map(lang => lang.code)

            setContainsLocale(
                justLangCodes.length &&
                    justLangCodes.indexOf(router.asPath.split("/")[2]) > -1,
            )
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
            {router?.route?.startsWith("/posts") &&
                allLang?.length &&
                !!containsLocale && (
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
