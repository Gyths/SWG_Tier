export const gradeCategories = [
  { label: "S", min: 8, max: 10 },
  { label: "A", min: 6, max: 8 },
  { label: "B", min: 4, max: 6 },
  { label: "C", min: 2, max: 4 },
  { label: "D", min: 0.1, max: 2 },
  { label: "F", min: 0, max: 0.1 },
];

export const getGradeLabel = (grade: number) => {
  return gradeCategories.find(c => grade >= c.min && grade < c.max)?.label ?? "F";
};
