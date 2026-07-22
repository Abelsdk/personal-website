import Image from "next/image";

type Props = {
  name: string;
};

export function Headshot({ name }: Props) {
  return (
    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5 sm:h-32 sm:w-32">
      <Image
        src="/headshot.svg"
        alt={`Portrait of ${name}`}
        fill
        className="object-cover"
        sizes="128px"
        priority
      />
    </div>
  );
}
