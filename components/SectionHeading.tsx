type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, text, light = false }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-600">{eyebrow}</p>
      <h1 className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${light ? "text-white" : "text-slate-950"}`}>{title}</h1>
      {text ? <p className={`mt-4 text-base leading-7 ${light ? "text-slate-300" : "text-slate-600"}`}>{text}</p> : null}
    </div>
  );
}
