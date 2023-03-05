export default function formattedNumber(number) {
  const formatted = Number(number).toFixed(2).toString().replace('.', ',');
  return formatted;
}
