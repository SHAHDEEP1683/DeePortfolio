import { Construction } from "lucide-react";

/**
 * "Under renovation" tag for the header: a caution-tape border that slowly slides,
 * a blinking amber work-light and a monospace label.
 */
const RenovationTag = () => (
  <span className="reno-tag" role="status" title="This portfolio is being rebuilt — new things are landing">
    <span className="reno-tag__inner">
      <span className="reno-tag__light" aria-hidden="true" />
      <Construction className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Under renovation</span>
      <span className="sr-only sm:hidden">Under renovation</span>
    </span>
  </span>
);

export default RenovationTag;
