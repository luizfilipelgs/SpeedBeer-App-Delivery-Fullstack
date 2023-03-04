import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../services/localStorage';
import totalPriceContext from '../context/LoginContext';

const ROUTE = 'customer_checkout';
const ADDRESS = 'input-address';
const NUMBER = 'input-address-number';
const SELLER = 'select-seller';
const SUBMIT = 'button-submit-order';

function FormAddress({ products }) {
  const { price } = useContext(totalPriceContext);
  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState('');
  const [seller, setSeller] = useState('');

  const navigate = useNavigate();

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
  };

  const handleNumberChange = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSellerChange = ({ target: { value } }) => {
    setSeller(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = getLocalStorage('user');

    const sale = {
      userId: id,
      sellerId: 1,
      totalPrice: Number(price),
      deliveryAddress: address,
      deliveryNumber: number,
      products,
    };

    console.log(sale);

    /* try {
      const response = await fetch('http://localhost:3001/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      const data = await response.json();
      if (data.id) {
        navigate(`/customer/orders/${data.id}`);
      } else {
        setRegisterError(data.message);
      }
    } catch (error) {
      console.error(error);
      setRegisterError('Ocorreu um erro ao tentar fazer registro');
    } */
  };

  const isRegisterFormValid = () => {
    const isValid = address && number;
    return isValid;
  };

  return (
    <div>
      <h4>Detalhes e Endereço para Entrega</h4>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="sellerInput">
          <select
            type="select"
            name="sellerInput"
            value={ seller }
            data-testid={ `${ROUTE}__${SELLER}` }
            onChange={ handleSellerChange }
            required
          >
            <option value={ 1 }>Opção 1</option>
          </select>
        </label>

        <label htmlFor="addressInput">
          Endereço
          <input
            type="text"
            name="addressInput"
            value={ address }
            placeholder="Av.x, Bairro Y"
            data-testid={ `${ROUTE}__${ADDRESS}` }
            onChange={ handleAddressChange }
            required
          />
        </label>

        <label htmlFor="numberInput">
          Número
          <input
            type="text"
            name="numberInput"
            value={ number }
            data-testid={ `${ROUTE}__${NUMBER}` }
            onChange={ handleNumberChange }
            required
          />
        </label>
        <button
          type="submit"
          data-testid={ `${ROUTE}__${SUBMIT}` }
          disabled={ !isRegisterFormValid() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default FormAddress;
