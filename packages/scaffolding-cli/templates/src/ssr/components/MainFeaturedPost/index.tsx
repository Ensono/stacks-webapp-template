import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import {PrefixedLink as Link} from "components"

const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {
        position: "relative",
        padding: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}))

export default function MainFeaturedPost(props) {
    const classes = useStyles()
    const {title, coverImage, date, excerpt, author, slug} = props

    return (
        <Paper
            className={classes.mainFeaturedPost}
            style={{backgroundImage: `url(${coverImage.url})`}}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{display: "none"}} src={coverImage.url} alt={title} />}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {excerpt}
                        </Typography>
                        <Link as={`/posts/${slug}`} href="/posts/[slug]">
                            <a>{title}</a>
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}
