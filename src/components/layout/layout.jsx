import FloatingActionButton from "./floating-action";
import FooterComponent from "./footer";
import Header from "./header";

export default function LayoutComponent({
  children,
  isBeforeLogin,
  isLoginPage,
}) {
  return (
    <>
      {isBeforeLogin ? "" : <Header />}

      <div
        className={`${isLoginPage ? `bg-[#73A556]` : `bg-[#F0F0F0]`}  flex flex-col items-center justify-center min-h-screen px-4`}
      >
        <div className="flex flex-col w-full h-full">
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
