import { Input, Modal } from "antd";

const CreateFolderModel = ({
  visible,
  onCancel,
  onOk,
  loading,
  folderName,
  setFolderName,
}: {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  loading: boolean;
  folderName: string;
  setFolderName: (name: string) => void;
}) => {
  return (
    <Modal
      title="Create Folder"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Save"
      confirmLoading={loading}
    >
      <Input
        placeholder="Folder name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
    </Modal>
  );
};

export default CreateFolderModel;
