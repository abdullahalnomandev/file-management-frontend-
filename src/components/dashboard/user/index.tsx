import { IFile, IFolder } from "@/types";
import FileManager from "./FileManager";

const UserDashbaord = ({ folders, files } :{folders: any, files: any}) => {

  return (
    <div className="container pt-4">
      <FileManager folders={folders} files={files}  />
    </div>
  );
};
export default UserDashbaord;
