import * as React from 'react';
import { Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const FieldConfigurationTab = ({ field, ...props }) => {
    const classes = useStyles();

    return (
        <Tab
            {...props}
            key={field.props.source}
            label={field.props.label}
            id={`nav-tab-${field.props.source}`}
            aria-controls={`nav-tabpanel-${field.props.source}`}
            classes={classes}
        />
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textTransform: 'none',
        minHeight: 0,
        fontWeight: 'normal',
    },
    selected: {
        fontWeight: 'bold',
    },
}));
