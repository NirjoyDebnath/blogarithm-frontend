interface IButton {
  type:"submit" | "reset" | "button",
  buttonName: string;
  backgroundColor: string;
  textColour: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({type, buttonName, backgroundColor, textColour, handleClick }: IButton) => {
  return (
    <button
      type={type}
      className={`rounded-md ${backgroundColor} ${textColour} px-3 py-2 text-sm font-semibold shadow-sm ${`hover:${backgroundColor}/85`} hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all`}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;
