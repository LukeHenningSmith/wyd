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
  return (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-xs shadow-md z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between p-4 text-center h-16 items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold">WYD</span>
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
