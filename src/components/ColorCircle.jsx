export function ColorCircle({ id, color, onClick, size = 25 }) {
  return (
    <div
      id={id}
      onClick={onClick}
      style={{ backgroundColor: color, width: size, height: size }}
      className="rounded-full size-5 "
    ></div>
  );
}
