type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-lg text-fg-muted">{description}</p>
      ) : null}
    </div>
  );
}
