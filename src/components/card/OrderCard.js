import React from 'react'
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 24,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default ({ work_order }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} >
                    ID: {work_order.work_order_id}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    Created At: {work_order.created_at}
                    <br />
                    Updated At: {work_order.updated_at}
                </Typography>

            </CardContent>
        </Card>
    )
}
