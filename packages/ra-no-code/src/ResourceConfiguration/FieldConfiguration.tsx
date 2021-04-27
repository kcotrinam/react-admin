import * as React from 'react';
import { InferenceTypes } from 'ra-core';
import { SelectInput, TextInput } from 'ra-ui-materialui';
import { CardContent } from '@material-ui/core';

export const FieldConfiguration = props => {
    const { index } = props;

    return (
        <CardContent>
            <TextInput
                source={`fields[${index}].props.label`}
                label="Label"
                fullWidth
            />
            <SelectInput
                source={`fields[${index}].type`}
                label="Type"
                fullWidth
                choices={InferenceTypes.map(type => ({
                    id: type,
                    name: type,
                }))}
            />
        </CardContent>
    );
};
