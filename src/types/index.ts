export interface IPackage {
  id: number;
  name: string;
  total_max_folder: number;
  max_nesting_folder: number;
  allowed_file_type: string[];
  max_file_size: number;
  total_file_limit: number;
  file_per_folder_limit: number;
  created_at: Date;
  updated_at: Date;
}


export interface IFolder {
  id: number;
  name: string;
  user_id: number;
  parent_folder_id?: number | null; // nullable because root folder
  nesting_level: number;
  total_files: number;

  // relational fields
  parent?: IFolder | null;
  folders?: IFolder[];
  files?: IFile[];
}


// Example File interface
export interface IFile {
  id: number;
  name: string;
  folder_id?: number | null; // nullable for root-level files
  user_id: number;
  file_type?: string | null;
  size?: number | null;
  url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}