import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Tabs,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    FormWithRedirect,
    InferredElementDescription,
    RecordContextProvider,
    SaveContextProvider,
} from 'ra-core';
import { SaveButton, TextInput } from 'ra-ui-materialui';
import { ResourceConfiguration } from './ResourceConfigurationContext';
import { useResourceConfiguration } from './useResourceConfiguration';
import { FieldConfiguration } from './FieldConfiguration';
import { FieldConfigurationTab } from './FieldConfigurationTab';

export const ResourceConfigurationPage = ({
    resource,
}: {
    resource: string;
}) => {
    const [definition, actions] = useResourceConfiguration(resource);
    const [activeField, setActiveField] = useState<
        InferredElementDescription
    >();
    const classes = useStyles();

    const save = (values: ResourceConfiguration) => {
        actions.update(values);
    };
    const saveContext = {
        save,
        setOnFailure: () => {},
        setOnSuccess: () => {},
    };

    const handleTabChange = (event, newValue) => {
        const newField = definition.fields.find(
            f => f.props.source === newValue
        );
        setActiveField(newField);
    };

    useEffect(() => {
        if (definition && definition.fields) {
            setActiveField(definition.fields[0]);
        }
    }, [definition]);

    if (!definition || !activeField) {
        return null;
    }

    return (
        <RecordContextProvider value={definition}>
            <SaveContextProvider value={saveContext}>
                <FormWithRedirect
                    save={save}
                    initialValues={definition}
                    render={({ handleSubmitWithRedirect }) => (
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        {
                                            // Here will go an icon selector
                                            (
                                                definition.label ||
                                                definition.name
                                            ).substr(0, 1)
                                        }
                                    </Avatar>
                                }
                                action={
                                    // Will display a menu to delete the resource maybe ?
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={`Configuration of ${
                                    definition.label || definition.name
                                }`}
                            />

                            <CardContent>
                                <TextInput
                                    source="label"
                                    initialValue={
                                        definition.label || definition.name
                                    }
                                />
                            </CardContent>
                            <Divider />
                            <div className={classes.fields}>
                                <Tabs
                                    orientation="vertical"
                                    value={activeField.props.source}
                                    onChange={handleTabChange}
                                    className={classes.fieldList}
                                >
                                    {definition.fields.map(field => (
                                        <FieldConfigurationTab
                                            key={field.props.source}
                                            field={field}
                                            value={field.props.source}
                                        />
                                    ))}
                                </Tabs>
                                {definition.fields.map((field, index) => (
                                    <div
                                        role="tabpanel"
                                        hidden={
                                            activeField.props.source !==
                                            field.props.source
                                        }
                                        id={`nav-tabpanel-${field.props.source}`}
                                        aria-labelledby={`nav-tab-${field.props.source}`}
                                    >
                                        {activeField.props.source ===
                                        field.props.source ? (
                                            <FieldConfiguration
                                                key={field.props.source}
                                                field={field}
                                                index={index}
                                                className={classes.fieldPanel}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                            <CardActions className={classes.actions}>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                />
                            </CardActions>
                        </Card>
                    )}
                />
            </SaveContextProvider>
        </RecordContextProvider>
    );
};

const useStyles = makeStyles(theme => ({
    fields: {
        display: 'flex',
    },
    fieldList: {
        backgroundColor: theme.palette.background.default,
    },
    fieldTitle: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        textTransform: 'none',
        minHeight: 0,
    },
    fieldPanel: {
        flexGrow: 1,
    },
    actions: {
        backgroundColor: theme.palette.background.default,
    },
}));
