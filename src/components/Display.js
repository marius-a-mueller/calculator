const Display = ({ text }) => {
  return (
    <div
      id="display"
      className="col-span-4 text-right text-6xl border p-2 select-none border-orange-900 bg-orange-950 text-orange-50"
    >
      {text}
    </div>
  );
};

export default Display;
