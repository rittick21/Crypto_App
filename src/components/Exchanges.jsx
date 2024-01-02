import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { Container, HStack, Box, Button } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import Errorpage from './Errorpage';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]); //Exchange fetching
  const [page, setPage] = useState(1); //Pagination
  const [loading, setLoading] = useState(true); //Loading 
  const [error, setError] = useState(false); //Error 

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const exchangeObject = await axios.get(`${server}/exchanges?&page=${page}`);
        setExchanges(exchangeObject.data);
        // console.log(exchangeObject.data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [page]);

  //Errorpage Code
  if(error){
    return(
      <Errorpage message = {"Error while fetching Exchanges"}/>
    )
  }

  //Changing page function
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1); //Below buttons array variable

  //If not error then...
  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : <>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((i) => {
              return (
                <ExchangeCard name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>
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
                key={index}
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

export default Exchanges
