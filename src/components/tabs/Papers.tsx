import { publications } from "@/data/publications";
import { DocList } from "./Documents";

export function Papers() {
  return (
    <DocList
      items={publications}
      base="publications"
      title="Papers"
      description="Papers written during the PhD, newest first, with the stage each one has reached from first draft to publication. Drafts can be viewed here."
      unit="paper"
    />
  );
}
