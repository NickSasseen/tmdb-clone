type RadialProgressProps = {
  value: number;
  size?: string;
  thickness?: number;
};
const RadialProgress = ({ value, size, thickness }: RadialProgressProps) => {
  const style: { [key: string]: string | number } = {
    "--value": value,
    "--size": size ?? "5rem",
    "--thickness": thickness ?? "10%",
  };

  return (
    <div
      className="radial-progress text-primary"
      style={style}
      role="progressbar"
    >
      {value}%
    </div>
  );
};

export default RadialProgress;
