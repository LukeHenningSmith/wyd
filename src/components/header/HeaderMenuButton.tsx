import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

type HeaderMenuButtonProps = {
  label: string;
  path: string;
};

export default function HeaderMenuButton({
  label,
  path,
}: HeaderMenuButtonProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path}>
      <Button
        variant="ghost"
        className={`m-0 p-0 cursor-pointer hover:bg-background dark:text-zinc-300 text-zinc-500 hover:text-black dark:hover:text-white ${
          isActive ? "dark:text-white text-black" : ""
        }`}
      >
        {label}
      </Button>
    </Link>
  );
}
