export interface ProjectLog {
  id: number;
  field: string;
  old_value: string | null;
  new_value: string;
  created_at: string;
  project: number;
}
