import { ModeToggle } from "../ModeToggle";
import HeaderMenuButton from "./HeaderMenuButton";

type HeaderProps = {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const menuConfig = [
    {
      id: "summary",
      label: "Summary",
    },
    {
      id: "table",
      label: "Table",
    },
    {
      id: "history",
      label: "History",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 backdrop-blur-xs shadow-md z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between p-4 text-center h-16 items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold">WYD</span>
          {menuConfig.map((item) => (
            <HeaderMenuButton
              key={item.id}
              id={item.id}
              label={item.label}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          ))}
        </div>

        <ModeToggle />
      </div>
    </div>
  );
}
