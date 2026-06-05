const nums = [1, 2, 3];

function Number() {
  return (
    <>
      {nums.map((num) => (
        <h1>{num}</h1>
      ))}
    </>
  );
}
export default Number;
