export default function formatPrice(price) {
  const formattedValue = price
    ?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/^(\D+)/, '$1 ');
  return formattedValue;
}
