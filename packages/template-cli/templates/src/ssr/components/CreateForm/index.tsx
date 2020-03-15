import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {FC, useState, useEffect} from "react"
import {connect} from "react-redux"
import {
    addMenuRoutine,
    getError,
    isLoading,
    getNewlycreatedMenuId,
    getMenuAdded,
} from "../../ducks/add-menu"
import getConfig from "next/config"
import {openSnackbar} from "components/Notifier"

const {publicRuntimeConfig} = getConfig()
const { APP_BASE_PATH } = publicRuntimeConfig

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const mapStateToProps = state => {
    return {
        isLoading: isLoading(state),
        error: getError(state),
        menuId: getNewlycreatedMenuId(state),
        added: getMenuAdded(state),
    }
}

const mapDispatchToProps = dispatch => ({
    addMenuItem: payload => dispatch(addMenuRoutine.trigger(payload)),
})

interface Props
    extends ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const CreateForm: FC<Props> = ({
    isLoading,
    error,
    addMenuItem,
    menuId,
    added,
}) => {
    const initialFormState = {
        menu_name: "",
        description: "",
        enabled: false,
    }
    const [values, setValues] = useState(initialFormState)
    useEffect(
        () =>
            menuId && added
                ? openSnackbar({message: `${menuId} menu created`})
                : undefined,
        [menuId, added],
    )

    const handleInputChange = e => {
        const {name, value, type, checked} = e.target
        setValues({...values, [name]: type === "checkbox" ? checked : value})
    }
    const handleFormSubmit = () => {
        const {menu_name, description, enabled} = values

        if (!menu_name || !description) return

        return addMenuItem({
            name: menu_name,
            description: description,
            enabled: enabled,
        })
    }
    const classes = useStyles()
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h3" variant="h5">
                    Create new menu
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Menu name"
                        name="menu_name"
                        onChange={handleInputChange}
                        value={values.menu_name}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline={true}
                        rows={4}
                        placeholder="Description (max 200 chars)"
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        onChange={handleInputChange}
                        value={values.description}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="enabled"
                                color="secondary"
                                checked={values.enabled}
                                onChange={handleInputChange}
                            />
                        }
                        label="Activate"
                    />
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                href={`/${APP_BASE_PATH}`}
                            >
                                CANCEL
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleFormSubmit}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)
