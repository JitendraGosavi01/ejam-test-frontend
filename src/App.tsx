import { useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Col,
  Container,
  Row,
  Navbar,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import * as actions from "./redux/Action";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { AgGridReact } from "ag-grid-react";
import DeleteCellRenderer from "./redux/deleteCellRenderer";
import { toast } from "react-toastify";
import _ from "lodash";
import * as yup from "yup";
toast.configure();

function App() {
  const dispatch = useDispatch();
  const [fields, setFields] = useState<any>({
    url: "",
    templateName: "",
    version: "",
  });
  const [errors, setErrors] = useState<any>({
    url: "",
    templateName: "",
    version: "",
  });
  const [gridApi, setGridApi] = useState<any>({});
  const { createDeployment, loadDeployment } = bindActionCreators(
    actions,
    dispatch
  );
  let deploymentData = useSelector(
    (state: RootStateOrAny) => state.deploymentData.data
  );

  const deletedDeployment = useSelector(
    (state: RootStateOrAny) => state.deletedDeployment
  );

  const createdDeployment = useSelector(
    (state: RootStateOrAny) => state.createdDeployment
  );
  // console.log(deploymentData, { deletedDeployment }, createdDeployment);
  useEffect(() => {
    loadDeployment();
  }, []);

  const showToast = (indicator: number, str: string) => {
    if (indicator !== -1) {
      toast.success(`Deployment ${str}..`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    createdDeployment.callsInProgress > 0 &&
      showToast(createdDeployment.callsInProgress, "created");
    createdDeployment.status === "SUCCESS" &&
      gridApi.updateRowData({ add: [createdDeployment.data] });
  }, [createdDeployment]);

  useEffect(() => {
    deletedDeployment.callsInProgress > 0 &&
      showToast(deletedDeployment.callsInProgress, "deleted");
    let selectedRows =
      deletedDeployment.status === "INPROGRESS" && gridApi.getSelectedRows();

    deletedDeployment.status === "INPROGRESS" &&
      gridApi.applyTransaction({ remove: selectedRows });
  }, [deletedDeployment]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const handleFields = (value: string, fieldName: string) => {
    setFields((prevState: any) => ({ ...prevState, [fieldName]: value }));
    console.log(fields);
    handleError();
  };

  const handleSubmit = (e: any) => {
    e && e.preventDefault();
    if (validateForm()) {
      createDeployment(fields);
      setFields((prev: any) => ({
        ...fields,
        url: "",
        templateName: "",
        version: "",
      }));
    } else {
      handleError();
    }
  };

  const handleFormClear = () => {
    setFields((prev: any) => ({
      ...fields,
      url: "",
      templateName: "",
      version: "",
    }));
    setErrors((prev: any) => ({
      ...fields,
      url: "",
      templateName: "",
      version: "",
    }));
  };

  const validateForm = () => {
    let valid = false;
    Object.keys(errors).forEach((error) =>
      fields[error].length === 0 ? (valid = false) : (valid = true)
    );
    return valid;
  };

  const validateFieldData = (field: any) => {
    if (field === "url") {
      let expression =
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
      let regex = new RegExp(expression);
      let t = fields[field];

      if (t.match(regex)) {
        setErrors((prev: any) => ({ ...prev, [field]: "" }));
        return true;
      } else {
        setErrors((prev: any) => ({ ...prev, [field]: "Invalid URL" }));
        return false;
      }
    }
    if (field === "version") {
      let expression =
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gi;
      let regex = new RegExp(expression);
      let t = fields[field];

      if (t.match(regex)) {
        setErrors((prev: any) => ({ ...prev, [field]: "" }));
        return true;
      } else {
        setErrors((prev: any) => ({
          ...prev,
          [field]: "Invalid semantic versioning",
        }));
        return false;
      }
    }
  };

  const handleError = () => {
    for (const field in fields) {
      if (fields[field].trim() === "") {
        setErrors((prev: any) => ({
          ...prev,
          [field]: `${_.startCase(field)} must be populated`,
        }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          [field]: "",
        }));
        validateFieldData(field);
      }
    }
  };

  const columnDefs: Array<object> = [
    {
      headerName: "Id",
      field: "_id",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "URL",
      field: "url",
      flex: 0.4,
      width: 300,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Template Name",
      field: "templateName",
      sortable: true,
      width: 200,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Version",
      field: "version",
      sortable: true,
      filter: true,
      resizable: true,
      width: 120,
    },
    {
      headerName: "Deployed on",
      field: "deployed",
      sortable: true,
      filter: true,
      resizable: true,
    },

    { headerName: "Action", cellRenderer: "DeleteCellRenderer", width: 100 },
  ];

  const renderNavBar = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Deployment Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
    );
  };

  const renderTable = () => {
    return (
      <Container style={{ paddingTop: "20px" }}>
        <div
          className="ag-theme-alpine"
          style={{
            height: "60vh",
            width: "100%",
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={deploymentData || []}
            frameworkComponents={{
              DeleteCellRenderer: DeleteCellRenderer,
            }}
            onGridReady={onGridReady}
            rowSelection="single"
          />
        </div>
      </Container>
    );
  };

  const renderForm = () => {
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3" style={{ width: "130px" }}>
                    URL
                  </InputGroup.Text>
                  <Form.Control
                    id="basic-url"
                    name="url"
                    type="text"
                    value={fields.url}
                    onChange={(e) => handleFields(e.target.value, "url")}
                  />
                </InputGroup>
                {errors.url && (
                  <span style={{ color: "red" }}>{errors.url}</span>
                )}
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="inputGroup-sizing-lg"
                    style={{ width: "130px" }}
                  >
                    Template name
                  </InputGroup.Text>
                  <FormControl
                    id="basic-url"
                    name="templateName"
                    type="text"
                    aria-describedby="basic-addon3"
                    value={fields.templateName}
                    onChange={(e) =>
                      handleFields(e.target.value, "templateName")
                    }
                  />
                </InputGroup>
                {errors.templateName && (
                  <span style={{ color: "red" }}>{errors.templateName}</span>
                )}
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="inputGroup-sizing-lg"
                    style={{ width: "130px" }}
                  >
                    Version
                  </InputGroup.Text>
                  <FormControl
                    id="basic-url"
                    name="version"
                    type="text"
                    value={fields.version}
                    aria-describedby="basic-addon3"
                    onChange={(e) => handleFields(e.target.value, "version")}
                  />
                </InputGroup>
                {errors.version && (
                  <span style={{ color: "red" }}>{errors.version}</span>
                )}
                {/* <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3" style={{ width: "130px" }}>
                    Deployed date
                  </InputGroup.Text>
                  <FormControl
                    type="date"
                    id="basic-url"
                    name="deployedDate"
                    value={fields.deployedDate}
                    aria-describedby="basic-addon3"
                    onChange={(e) =>
                      handleFields(e.target.value, "deployedDate")
                    }
                  />
                </InputGroup> */}
                <span style={{ color: "red" }}>{errors.deployedDate}</span>
              </Form.Group>
              <Button className="float-end" variant="primary" type="submit">
                Submit
              </Button>

              <Button
                style={{ marginRight: "20px" }}
                className="float-end"
                variant="primary"
                type="reset"
                onClick={handleFormClear}
              >
                Clear
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {renderNavBar()}
      {renderForm()}
      {renderTable()}
    </>
  );
}
export default App;
