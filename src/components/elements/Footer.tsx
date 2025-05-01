import { Separator } from '../ui/separator';

export const Footer = ({ className }: { className: string }) => {
  return (
    <div className={`${className}`}>
      <Separator className="mt-12" />
      <div className="pt-8 text-center">
        <p className="">
          © {new Date().getFullYear()} GiziSnaps. Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  );
};
