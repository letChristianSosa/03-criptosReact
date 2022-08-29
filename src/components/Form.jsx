import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import useSelectCurrency from "../hooks/useSelectCurrency";
import { currencies } from "../data/currencies";

import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setSelections }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [currency, SelectCurrency] = useSelectCurrency(
    "Elige tu Moneda",
    currencies
  );

  const [crypto, SelectCrypto] = useSelectCurrency(
    "Elige tu Criptomoneda",
    cryptos
  );

  useEffect(() => {
    const readAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const cryptosArray = result.Data.map((crypto) => ({
        id: crypto.CoinInfo.Name,
        name: crypto.CoinInfo.FullName,
      }));
      setCryptos(cryptosArray);
    };
    readAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([currency, crypto].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setSelections({
      currency,
      crypto,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son Obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCrypto />
        <InputSubmit type="submit" value={`Cotizar`} />
      </form>
    </>
  );
};

export default Form;
