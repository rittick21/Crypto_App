import { Button, Container, HStack, Box, RadioGroup, Radio, VStack, Text } from '@chakra-ui/react';
import axios from 'axios'
import { server } from '../index';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import Errorpage from './Errorpage';
import { useParams } from 'react-router-dom';

const Coindetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  //Fetching data
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id]);

  if (error) {
    return (
      <Errorpage message={"Error while fetching Coin chart"} />
    )
  }

  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : <>
          <Box w={"full"} borderWidth={1}>
            addas
          </Box>

          {/* ButtonsToDO */}


          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"eur"}>€ EURO</Radio>
              <Radio value={"usd"}>$ USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack
            spacing={"4"}
            p={"16"}
            alignItems={"flex-start"}
          >
            <Text fontSize={"small"}>
              Last Updated
            </Text>
          </VStack>
        </>
      }
    </Container>
  )
}

export default Coindetails
