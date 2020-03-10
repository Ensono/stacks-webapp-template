import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {FC, useCallback} from "react"
import {connect} from "react-redux"
import {isLoading, getError, addMenuRoutine} from "../../ducks/add-menu"
import {openSnackbar} from "components/Notifier"

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
    }
}

const mapDispatchToProps = dispatch => ({
    addMenuItem: payload => dispatch(addMenuRoutine.trigger(payload)),
})

interface Props
    extends ReturnType<typeof mapStateToProps>,
        ReturnType<typeof mapDispatchToProps> {}

const CreateForm: FC<Props> = ({ isLoading, error, addMenuItem }) => {
    const handleFormSubmit = () => {
            openSnackbar({message: "menu created"})
            return addMenuItem({
                name: "test1",
                description: "test desc",
                enabled: "true",
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
                        autoComplete="menu_name"
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
                        autoComplete="description"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox value="remember" color="secondary" />
                        }
                        label="Activate"
                    />
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                href="/"
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