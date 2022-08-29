import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import Form from "./components/Form";
import CryptoImage from "./img/imagen-criptos.png";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [selections, setSelections] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(selections).length > 0) {
      setLoading(true);
      setResult({});
      const readAPI = async () => {
        const { currency, crypto } = selections;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
        const response = await fetch(url);
        const result = await response.json();
        setResult(result.DISPLAY[crypto][currency]);
        setLoading(false);
      };
      readAPI();
    }
  }, [selections]);

  return (
    <Container>
      <Image src={CryptoImage} alt="Imagen Criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form setSelections={setSelections} />
        {loading && <Spinner />}
        {result.PRICE && <Result result={result} />}
      </div>
    </Container>
  );
}

export default App;
