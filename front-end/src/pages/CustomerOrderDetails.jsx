import NavBar from '../components/navbar';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import TableOrder from '../components/tableOrder';

function CustomerOrder() {
  return (

    <div>
      <NavBar />

      <h3>Detalhe do Pedido</h3>
      <section>
        <OrderDetailsHeader
          id={ data.id }
          sellerName={ data.seller?.name }
          saleDate={ new Date(Date.parse(data.saleDate)) }
          saleStatus={ data.status }
          newStatus={ updateStatus }
        />
      </section>
      <TableOrder products={ products } />

    </div>
  );
}

export default CustomerOrder;
