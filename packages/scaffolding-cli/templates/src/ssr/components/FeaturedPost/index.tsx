import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Hidden,
    makeStyles,
    Typography,
} from "@material-ui/core"
import DateElement from "components/Date"

const useStyles = makeStyles({
    card: {
        display: "flex",
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
})

export default function HeroPost({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
}) {
    const classes = useStyles()
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                <DateElement dateString={date} />
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {excerpt}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia
                            className={classes.cardMedia}
                            image={coverImage.url}
                            title={title}
                        />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    )
}
