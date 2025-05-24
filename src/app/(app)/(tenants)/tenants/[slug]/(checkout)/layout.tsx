import { CheckoutNavbar } from "@/modules/checkout/ui/navbar";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const CheckoutLayout = async ({ children, params }: CheckoutLayoutProps) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen  flex flex-col">
      <CheckoutNavbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
