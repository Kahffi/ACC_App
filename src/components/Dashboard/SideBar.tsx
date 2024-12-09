import { type ReactNode } from "react";

type SideBarProps = {
  children: ReactNode;
  className: string;
};

export default function SideBar({ children, className }: SideBarProps) {
  return <aside className={className}>{children}</aside>;
}
