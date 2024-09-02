import FloatingActionButton from "./floating-action";
import FooterComponent from "./footer";
import Header from "./header";

export default function LayoutComponent({ children, isBeforeLogin }) {
  return (
    <>
      {isBeforeLogin ? "" : <Header />}

      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#F0F0F0]">
        <div className="flex flex-col h-screen w-full h-full">
          <div className="wrap flex flex-col items-center justify-center px-4 py-8">
            {children}
          </div>
        </div>
      </div>
      <FooterComponent isBeforeLogin={isBeforeLogin} />
      {isBeforeLogin ? "" : <FloatingActionButton />}
    </>
  );
}
