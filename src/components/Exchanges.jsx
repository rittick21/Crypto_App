import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import Errorpage from './Errorpage';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]); //Exchange fetching
  const [loading, setLoading] = useState(true); //Loading 
  const [error, setError] = useState(false); //Error 

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const exchangeObject = await axios.get(`${server}/exchanges`);
        setExchanges(exchangeObject.data);
        // console.log(exchangeObject.data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, []);

  //Errorpage Code
  if(error){
    return(
      <Errorpage message = {"Error while fetching Exchanges"}/>
    )
  }

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
      </>
      }
    </Container>
  )
}

export default Exchanges
