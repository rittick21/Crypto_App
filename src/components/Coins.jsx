import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { Button, Container, HStack, Box, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import Errorpage from './Errorpage';
import CoinCard from './CoinCard';

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  }, [currency, page]);

  if (error) {
    return (
      <Errorpage message={"Error while fetching Coins"} />
    )
  }

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1);

  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : <>
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>₹ INR</Radio>
            <Radio value={"eur"}>€ EURO</Radio>
            <Radio value={"usd"}>$ USD</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={"wrap"}>
          {
            coins.map((i) => {
              return (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                  price={i.current_price}
                />
              )
            })
          }
        </HStack>
        <HStack
          p={"8"}
          w={"125px"}
          h={"10"}
          bgColor={"gray.100"}
          borderRadius={"10px"}
          ml={"20px"}
        >
          <Box>
            <b>Page {page}</b>
          </Box>
        </HStack>
        <HStack w={"full"} overflowX={"auto"} p={"8"}>
          {btns.map((item, index) => {
            return (
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => {
                  changePage(index + 1);
                }}
              >
                {index + 1}
              </Button>
            )
          })}
        </HStack>
      </>
      }
    </Container>
  )
}

export default Coins
