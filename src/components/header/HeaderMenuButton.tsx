import { Button } from "../ui/button";

type HeaderMenuButtonProps = {
  id: string;
  label: string;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export default function HeaderMenuButton({
  id,
  label,
  currentTab,
  setCurrentTab,
}: HeaderMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`m-0 p-0 cursor-pointer hover:bg-background dark:text-zinc-300 text-zinc-500 hover:text-black dark:hover:text-white ${
        currentTab === id ? "dark:text-white text-black" : ""
      }`}
      onClick={() => setCurrentTab(id)}
    >
      {label}
    </Button>
  );
}
