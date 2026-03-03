import FileManager from "./FileManager";

const UserDashbaord = ({ folders, files, parentId,breadcrumb } :{folders: any, files: any, parentId?: string, breadcrumb?: any}) => {

  return (
    <div className="container pt-4">
      <FileManager folders={folders} files={files} parentId={parentId} breadcrumb={breadcrumb} />
    </div>
  );
};
export default UserDashbaord;
