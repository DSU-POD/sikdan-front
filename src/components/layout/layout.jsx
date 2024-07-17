import FooterComponent from "./footer";

export default function LayoutComponent({ children }) {
  return (
    <>
      {children}
      <FooterComponent />
    </>
  );
}
