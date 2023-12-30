import { Badge, HStack, Progress, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const CustomBar = ({high, low, highValue, lowValue}) => {

  highValue = Number.parseInt(highValue);
  lowValue = Number.parseInt(lowValue);

  let progress = (highValue - lowValue)/ lowValue * 100;
  // console.log(highValue);
  // console.log(lowValue);
  // console.log(progress);

  return (
    <VStack w={"full"}>
        <Progress value={progress} colorScheme={progress > 0 ?"teal": "red"} w={"full"}/>
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme={"red"}/>
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"}/>
        </HStack>
    </VStack>
  )
}

export default CustomBar
