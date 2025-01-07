import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavItemProps = {
  icon: string;
  text: string;
};

function NavItem({ icon, text }: NavItemProps) {
  const { pathname: currentPage } = useLocation();

  const doNavigate = useNavigate();

  const isActive = useMemo(() => {
    if (
      currentPage === "/" + text.toLocaleLowerCase() ||
      (currentPage === "/" && text.toLowerCase() === "dashboard")
    ) {
      return true;
    }
    return false;
  }, [currentPage, text]);

  function handleClick() {
    const destination =
      text.toLocaleLowerCase() === "dashboard" ? "/" : text.toLocaleLowerCase();
    doNavigate(destination);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center hover gap-2 px-2 py-2 cursor-pointer group hover:bg-blue-800 hover:text-white rounded-md transition-all 
          ${
            isActive
              ? "bg-blue-800 text-white drop-shadow-md font-semibold"
              : ""
          }
        `}
    >
      <Icon
        icon={icon}
        className={`text-blue-600 text-lg group-hover:text-white transition-colors ${
          isActive ? "text-white" : ""
        }`}
      />
      <span>{text}</span>
    </button>
  );
}

export default function NavBar() {
  return (
    <div className="flex flex-col gap-2 bg-white px-2 py-3 mt-3 rounded-md shadow-black/40 shadow-md">
      <NavItem
        icon="cuida:dashboard-outline"
        text="Dashboard"
        key="Dashboard"
      />
      <NavItem icon="lsicon:report-outline" text="Report" key="Report" />
      <NavItem
        icon="hugeicons:analysis-text-link"
        text="Analysis"
        key="Analysis"
      />
    </div>
  );
}
