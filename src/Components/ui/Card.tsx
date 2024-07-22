interface IProps {
  name: string;
  number: number;
  Coolor:string
}

const Card = ({ name, number , Coolor }: IProps) => {
  return (
    <div className="bg-white h-[190px] border-[2px] rounded-lg py-[20px] px-[10px] mb-[26px]">
      <p className={`text-start font-bold truncate ${Coolor} text-[18px]`}>
        {name}
      </p>
      <p className={`text-center  font-bold ${Coolor} text-[34px] mt-[20px]`}>
        {number}<sub>%</sub>
        <br />
        {number * 100}
      </p>
    </div>
  );
};
export default Card;
