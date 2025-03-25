import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className="h-full">{children}</div>;
}
