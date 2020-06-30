import {MenuItem, TextField, makeStyles} from "@material-ui/core"
import {useRouter} from "next/router"
import React, {useEffect} from "react"
import conf from "../../environment-configuration"

const useStyles = makeStyles(theme => ({
    select: {
        padding: theme.spacing(0, 3, 0),
        width: "250px",
    },
}))

const BLOG_PATH_STRING = "/blog/posts"
const LOCALE_STRING_LOCATION = 3

export const LocaleSwitcher: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()

    const [lang, setLang] = React.useState(
        conf.NEXT_PUBLIC_CONTENTFUL_DEFAULT_LOCALE,
    )
    const [allLang, setAllLang] = React.useState([])
    const [containsLocale, setContainsLocale] = React.useState(false)

    useEffect(() => {
        setLang(router?.asPath?.split("/")[LOCALE_STRING_LOCATION])

        const fetchData = async () => {
            const locales = await getLanguages()
            setAllLang(locales.items)
            const justLangCodes = await locales.items.map(lang => lang.code)
            setContainsLocale(
                justLangCodes.length &&
                    justLangCodes.indexOf(
                        router.asPath.split("/")[LOCALE_STRING_LOCATION],
                    ) > -1,
            )
        }
        if (router?.route?.startsWith(BLOG_PATH_STRING)) fetchData()
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
            {router?.route?.startsWith(BLOG_PATH_STRING) &&
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
