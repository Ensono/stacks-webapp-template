import {
    AppBar,
    Button,
    Fab,
    makeStyles,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import {LocaleSwitcher, PrefixedLink as Link, ProfilePicture} from "components"
import {UserType} from "interfaces/auth.interface"
import {useRouter} from "next/router"
import React from "react"
import {useUser} from "../../lib/hooks"
import conf from "../../environment-configuration"

const useStyles = makeStyles(theme => ({
    authButton: {
        margin: theme.spacing(0, 1, 0),
    },
    styledLink: {
        textDecoration: "none",
        cursor: "pointer",
    },
}))

const title: string = `Yumido`
const authenticationEnabled =
    !!conf.AUTH0_CLIENT_SECRET && !!conf.AUTH0_CLIENT_ID
export const Header = props => {
    const user: UserType = useUser()
    const classes = useStyles()
    const isCreatePage = useRouter()?.pathname.split("/").pop() === "create"
    return (
        <AppBar position="fixed" color="secondary">
            <Toolbar>
                <a href="./blog">
                    <Tooltip title="Blog" aria-label="blog">
                        <Fab
                            size="small"
                            color="primary"
                            aria-label="blogs menu button"
                        >
                            <LibraryBooksIcon data-testid="blogs_button" />
                        </Fab>
                    </Tooltip>
                </a>
                <Typography variant="h2" style={{margin: "0 auto"}}>
                    <a href="/" className={classes.styledLink}>
                        {title}
                    </a>
                </Typography>
                {!isCreatePage && (
                    <a href="./create">
                        <Tooltip title="Create menu" aria-label="create menu">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="create menu button"
                            >
                                <AddIcon data-testid="create_button" />
                            </Fab>
                        </Tooltip>
                    </a>
                )}
                <LocaleSwitcher />
                {!!authenticationEnabled && (
                    <>
                        {!user ? (
                            <a href="./login">
                                <Button
                                    data-testid="auth_login_button"
                                    variant="contained"
                                    color="primary"
                                    aria-label="Login button"
                                    className={classes.authButton}
                                >
                                    Login
                                </Button>
                            </a>
                        ) : (
                            <>
                                <a href="./profile">
                                    <Button
                                        aria-label="profile button"
                                        data-testid="profile_image_button"
                                    >
                                        <ProfilePicture
                                            name={user.displayName}
                                            picture={{url: user.picture}}
                                            displayName={false}
                                        />
                                    </Button>
                                </a>
                                <a href="./logout">
                                    <Button
                                        data-testid="auth_logout_button"
                                        variant="contained"
                                        color="primary"
                                        aria-label="Logout button"
                                        className={classes.authButton}
                                    >
                                        logout
                                    </Button>
                                </a>
                            </>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
