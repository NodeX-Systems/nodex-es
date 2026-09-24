import LangSetter from "@/components/LangSetter";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LangSetter lang="en" />
      {children}
    </>
  );
}
