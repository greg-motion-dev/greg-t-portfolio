export interface CvInlineListProps {
  readonly items: readonly string[];
}

export default function CvInlineList({ items }: CvInlineListProps) {
  return items.map((item, index) => (
    <span key={item}>
      <span className={item.length <= 24 ? "whitespace-nowrap" : undefined}>
        {item}
        {index < items.length - 1 ? "\u00a0·" : null}
      </span>
      {index < items.length - 1 ? " " : null}
    </span>
  ));
}
