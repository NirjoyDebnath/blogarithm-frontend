interface xp{
  buttonName: string;
  backgroundColor: string;
}

const Button = ({buttonName, backgroundColor}: xp) => {
  return (
    <div className="">
      <button
        type="button"
        className={`w-1/10 rounded-md ${backgroundColor} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/85 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
