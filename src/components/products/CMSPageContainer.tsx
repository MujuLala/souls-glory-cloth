interface CMSPageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CMSPageContainer({
  children,
  className = "",
}: CMSPageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[92vw] px-0 py-5 sm:py-6 ${className}`}
    >
      {children}
    </div>
  );
}