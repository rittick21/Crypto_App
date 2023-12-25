import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Item = (props) => {
    return (
        <HStack
            justifyContent={"space-between"}
            w={"full"}
            my={"4"}
        >
            <Text
                fontFamily={"Bebas Neue"}
                letterSpacing={"widest"}
            >
                {props.title}
            </Text>
            <Text>{props.value}</Text>
        </HStack>
    )
}

export default Item
