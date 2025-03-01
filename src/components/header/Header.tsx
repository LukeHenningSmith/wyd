import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../theme/ModeToggle";
import HeaderMenuButton from "./HeaderMenuButton";

type HeaderProps = {
  config: {
    id: string;
    label: string;
    path: string;
  }[];
};

export default function Header({ config }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-xs shadow-md z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between p-4 text-center h-16 items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <button
            className="text-2xl font-bold hover:scale-110 hover:ease-in-out hover:duration-300 hover:transform cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            WYD
          </button>
          {config.map((item) => (
            <HeaderMenuButton
              key={item.id}
              path={item.path}
              label={item.label}
            />
          ))}
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}
