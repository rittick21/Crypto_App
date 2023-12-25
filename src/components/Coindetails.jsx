import { Container, HStack, Box, RadioGroup, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge } from '@chakra-ui/react';
import axios from 'axios'
import { server } from '../index';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import Errorpage from './Errorpage';
import CustomBar from './CustomBar';
import Item from './Item';
import { useParams } from 'react-router-dom';

const Coindetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

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
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on {coin.market_data.last_updated}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_percentage_24h} %
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
              borderRadius={"10px"}
            >
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />
            <Box
              w={"full"}
              p={"4"}
            >
              <Item title={"Max Supply"} value={coin.market_data.max_supply === null ? "Not available" : coin.market_data.max_supply}/>

              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply === null ? "Not available" : coin.market_data.circulating_supply}/>

              <Item title={"Market Capital"} value={coin.market_data.market_cap[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.market_cap[currency]}`}/>

              <Item title={"All Time Low"} value={coin.market_data.atl[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.atl[currency]}`}/>

              <Item title={"All Time High"} value={coin.market_data.ath[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

export default Coindetails
