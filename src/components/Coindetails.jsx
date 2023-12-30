import { Container, HStack, Box, RadioGroup, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Button } from '@chakra-ui/react';
import axios from 'axios'
import { server } from '../index';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import Errorpage from './Errorpage';
import CustomBar from './CustomBar';
import Item from './Item';
import { useParams } from 'react-router-dom';
import Chart from './Chart';

const Coindetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;

      case "1y":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  //Fetching data
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`); //For coin data

        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`); //For coin graph data

        // console.log(chartData);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id, currency, days]);

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
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={"4"} overflowX={"auto"}>
            {
              btns.map((i) => {
                return <Button key={i} onClick={() => { switchChartStats(i) }}>
                  {i}
                </Button>
              })
            }
          </HStack>

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
              highValue = {coin.market_data.high_24h[currency]}
              lowValue = {coin.market_data.low_24h[currency]}
            />
            <Box
              w={"full"}
              p={"4"}
            >
              <Item title={"Max Supply"} value={coin.market_data.max_supply === null ? "Not available" : coin.market_data.max_supply} />

              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply === null ? "Not available" : coin.market_data.circulating_supply} />

              <Item title={"Market Capital"} value={coin.market_data.market_cap[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.market_cap[currency]}`} />

              <Item title={"All Time Low"} value={coin.market_data.atl[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.atl[currency]}`} />

              <Item title={"All Time High"} value={coin.market_data.ath[currency] === null ? "Not available" : `${currencySymbol} ${coin.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

export default Coindetails
