import React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as action from "./Action";
type deleteProps = { data?: any };
function DeleteCellRenderer(props: deleteProps) {
  const dispatch = useDispatch();
  const { deleteDeployment } = bindActionCreators(action, dispatch);
  console.log(props);
  const deploymentId = props.data._id;

  const handleDelete = () => {
    deleteDeployment(deploymentId);
  };

  return (
    <div>
      <svg
        onClick={handleDelete}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-archive-fill"
        viewBox="0 0 16 16"
      >
        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
      </svg>
    </div>
  );
}

export default DeleteCellRenderer;
