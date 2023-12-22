const Button = ({ callback, id, text, customClass }) => {
  return (
    <div
      id={id}
      onClick={(event) => callback(event, text)}
      className={
        "flex justify-center items-center select-none border border-orange-900 text-6xl p-3 cursor-pointer active:bg-gray-800 " +
        customClass
      }
    >
      {text}
    </div>
  );
};

export default Button;
