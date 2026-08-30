import type { Dedication } from "./dedications";

export const ALL_TEACHERS = "All Teachers";

const isAll = (name: string) =>
  name.trim().toLowerCase() === ALL_TEACHERS.toLowerCase();

/** Group already-fetched dedications by teacher_name, client-side only. */
export function groupByTeacher(dedications: Dedication[]) {
  const groups = new Map<string, Dedication[]>();
  for (const d of dedications) {
    const key = isAll(d.teacher_name) ? ALL_TEACHERS : d.teacher_name.trim();
    const list = groups.get(key);
    if (list) list.push(d);
    else groups.set(key, [d]);
  }

  const names = [...groups.keys()].sort((a, b) => {
    if (a === ALL_TEACHERS) return -1;
    if (b === ALL_TEACHERS) return 1;
    return a.localeCompare(b);
  });

  return { groups, names };
}
