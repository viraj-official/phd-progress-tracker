// My to-do list, shown on the Overview page.
// The Overview also adds, automatically: open action items from the Log Book and
// the parts of the documents (ethics, progress review) that are not done yet.
// Add only extra tasks here; tick them off by setting done: true (they disappear).

export type Todo = {
  task: string;
  due?: string; // YYYY-MM-DD
  done: boolean;
  link?: string; // part of this site, e.g. "documents/progress-review-1"
};

export const todos: Todo[] = [
  {
    task: "Get supervisor feedback on the Introduction, Literature Review and Research Methodology (v1.1)",
    done: false,
    link: "documents/progress-review-1",
  },
  {
    task: "Book the next supervision meeting and record it in the Log Book",
    done: false,
    link: "logbook",
  },
];
