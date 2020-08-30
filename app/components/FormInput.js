import React from 'react'
import { Input } from 'react-native-elements'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//This component helps with the password fields in our forms

const FormInput = ({
    iconName,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    ...rest
}) => (
        <View >
            <Input

                leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
                placeholderTextColor='grey'
                name={name}
                placeholder={placeholder}
                {...rest}
            // style={globalStyles.InputField}
            />
        </View>
    )

export default FormInput