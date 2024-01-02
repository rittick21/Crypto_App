import React from 'react'
import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import avaterSrc from '../assets/rkImg.jpeg'

const Footer = () => {
    return (
        <Box
            bgColor={"blackAlpha.900"}
            color={"whiteAlpha.700"}
            minH={"48"}
            px={"16"}
            py={["16", "8"]}
        >
            <Stack
                direction={["column", "row"]}
                height={"full"}
                alignItems={"centerS"}
            >
                <VStack
                    w={"full"}
                    alignItems={["center", "flex-start"]}
                >
                    <Text fontWeight={"bold"}>About Us</Text>
                    <Text
                        fontSize={"sm"}
                        letterSpacing={"widest"}
                        textAlign={["center", "left"]}
                    >
                        The world's most popular cripto trading app now available in India, We provide proper guidance  at a very cheap price.
                    </Text>
                </VStack>

                <VStack>
                    <Avatar boxSize={"28"} mt={["4", "0"]} src={avaterSrc}/>
                    <Text>Our Investor</Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer
