import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export const App = () => {
    return <div>Welcome to Feeder client.</div>;

};

export const helloButton = () => {
    return <Button variant="contained" color="primary">Hello world button</Button>;
};

export const cardContainer = () => {
    return
    <Grid container justify="center">
        <Grid
            alignItems="center"
            justify="center"
        >
            <Grid lg={12} item>Content Here</Grid>
        </Grid>
    </Grid>;
}