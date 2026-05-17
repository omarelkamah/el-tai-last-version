import Image from "next/image";

export const LoaderS1 = () => {
  return (
    <div className="fixed bottom-0 left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-primary">
      <Image
        src="/images/logo.png"
        alt="Sand Studio Logo"
        width={200}
        height={100}
      />
    </div>
  );
};
