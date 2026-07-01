type FormattedDateProps = {
  date: string | Date;
};

export default function FormattedDate({ date }: FormattedDateProps) {
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    <time dateTime={d.toISOString()}>
      {d.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </time>
  );
}

