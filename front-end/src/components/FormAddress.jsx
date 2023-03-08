import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { delLocalStorage, getLocalStorage } from '../services/localStorage';
import totalPriceContext from '../context/LoginContext';
import {
  CUSTOMER_CHECKOUT,
  ADDRESS,
  NUMBER_ADDRESS,
  SELLER,
  SUBMIT,
} from '../utils/Types';

function FormAddress({ products }) {
  const { price } = useContext(totalPriceContext);
  const [number, setNumber] = useState();
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
      const response = await axios.post(
        'http://localhost:3001/sales/register',
        sale,
        { headers: { Authorization: `${token}` } },
      );
      const { data } = response;
      if (data.id) {
        navigate(`/customer/orders/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
    delLocalStorage('products');
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
    <form className="form-address-container" onSubmit={ handleSubmit }>
      <h4 className="sub-title-page">Detalhes e Endereço para Entrega</h4>

      <section className="checkout-form-address">
        <label htmlFor="sellerInput" className="input-select-form-address">
          <select
            name="sellerInput"
            data-testid={ `${CUSTOMER_CHECKOUT}__${SELLER}` }
            onChange={ handleSellerChange }
            value={ selectedSeller }
            required
          >
            <option value="" disabled selected>
              -- Selecione o vendedor --
            </option>
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>

        <label className="input-text-form-address" htmlFor="addressInput">
          <input
            type="text"
            name="addressInput"
            value={ address }
            placeholder="Digite o seu endereço"
            data-testid={ `${CUSTOMER_CHECKOUT}__${ADDRESS}` }
            onChange={ handleAddressChange }
            required
          />
        </label>

        <label className="input-number-form-address" htmlFor="numberInput">
          <input
            type="number"
            name="numberInput"
            placeholder="Número"
            min="0"
            value={ number }
            data-testid={ `${CUSTOMER_CHECKOUT}__${NUMBER_ADDRESS}` }
            onChange={ handleNumberChange }
            required
          />
        </label>
      </section>
      <button
        className="btn-checkout-form-address"
        type="submit"
        data-testid={ `${CUSTOMER_CHECKOUT}__${SUBMIT}` }
        disabled={ !isRegisterFormValid() }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

FormAddress.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      quantity: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      totalPrice: PropTypes.number,
    }),
  ).isRequired,
};

export default FormAddress;
