export const Loader = ({ size }: { size: "large" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "large" ? "36" : "24"}
      height={size === "large" ? "36" : "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"animate-spin"}
      data-testid="loader"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
