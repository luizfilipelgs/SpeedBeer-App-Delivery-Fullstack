import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');

  const navigate = useNavigate();

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
  };

  const handleNumberChange = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSellerChange = ({ target: { value } }) => {
    setSelectedSeller(value);
  };

  const { token } = getLocalStorage('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = getLocalStorage('user');

    const sale = {
      userId: id,
      sellerId: selectedSeller,
      totalPrice: Number(price),
      deliveryAddress: address,
      deliveryNumber: parseInt(number, 10),
      products,
    };
    try {
      const response = await fetch('http://localhost:3001/sales/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
        body: JSON.stringify(sale),
      });
      const data = await response.json();
      if (data.id) {
        navigate(`/customer/orders/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/sales/seller')
      .then((response) => response.json())
      .then((data) => {
        setSellers(data);
      });
  }, []);

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
            data-testid={ `${ROUTE}__${SELLER}` }
            onChange={ handleSellerChange }
            value={ selectedSeller }
            required
          >
            <option>Selecione</option>
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{ seller.name }</option>
            ))}
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

FormAddress.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default FormAddress;
