import React from 'react'
import { Input } from 'react-native-elements'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from "../../styles/globalStyles";

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
                // leftIconContainerStyle={globalStyles.leftIconStyle}
                placeholderTextColor='grey'
                name={name}
                placeholder={placeholder}
                {...rest}
            // style={globalStyles.InputField}
            />
        </View>
    )

export default FormInput