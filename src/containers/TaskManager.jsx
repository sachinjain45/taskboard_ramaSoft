import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import Input from "../components/Input";
import BasicButtons from "../components/Buttons";
import StickyHeadTable from "../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useLocalStorage from "../customHooks/LocalStorage";
import dayjs from "dayjs";


const TaskManager = () => {
  const [taskManagerDetails, setTaskManagerDetails] = useState({
    name: "",
    description: "",
    deadLine: "",
    id :""
  });

  const [taskManagerData, setTaskMangerData] = useState([]);
  const [isError,setIsError] = useState(true);
  const [taskManagerLSD, setTaskManagerLSD] = useLocalStorage('taskManager');
  const [isEditData,setIsEditdata] = useState({
    ind:"",
    objData:""
  })
  const [buttonName, setButtonName] = useState({
    isEdit: false,
  });

  const onChangeHandler = (event) => {
    const data = new Date(event.$d);
    const deadLine = data?.getTime()
    setTaskManagerDetails((prev) => {
      return {
        ...prev,
        [event?.target?.id]: event?.target?.value,
        deadLine:deadLine ||isEditData?.objData?.deadLine,
        id: Date.now(),
      };
    });
  }

  const onSubmitHandler = (event) => {
    console.log("id in submit",isEditData)
    event.preventDefault(); 

    if(isEditData?.ind !=="")
    {
      const newTskManagerLSD = [...taskManagerLSD]
      newTskManagerLSD[isEditData?.ind] = {
        ...taskManagerDetails,
        deadLine:
          taskManagerDetails?.deadLine === isEditData?.objData?.deadLine
            ? isEditData?.objData?.deadLine
            : taskManagerDetails?.deadLine,
      };
      setTaskManagerLSD(newTskManagerLSD);
      setTaskManagerDetails({ name: "", description: "", deadLine: "",id:"" });
      setButtonName({ isEdit: false });
    }
    else
    {
      setTaskManagerLSD([...taskManagerData, taskManagerDetails]);
      setTaskManagerDetails({ name: "", description: "", deadLine: "",id:"" });
    }
  };

  const editRow = (ind,data) =>{
    setIsEditdata((prev) => {
      return {
        ...prev,
        ind: ind,
        objData: data,
      };
    });
   setTaskManagerDetails((prev) => {
     return {
       ...prev,
       id: data?.id,
       name: data?.name,
       description: data?.description,
       deadLine: data?.deadLine,
       
     };
   });
  }

  const cancelEdit =()=>{
    setButtonName({ isEdit: false });
    setTaskManagerDetails({ name: "", description: "", deadLine: "" });
  }
  const deleteRow = (id) => {
    const result = taskManagerLSD?.filter((localData) => localData?.id !== id);
    setTaskManagerLSD(result);
  };
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "deadLine", label: "DeadLine", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const style = {
    mainDiv: {
      margin: "5% 10% 1% 10%",
    },
    formDiv: { display: "flex", justifyContent: "space-between" },
    buttonDiv: { display: "flex" },
  };


  useEffect(() => {
    taskManagerLSD !== undefined && setTaskMangerData(taskManagerLSD);
  }, [taskManagerLSD]);

  
  return (
    <div style={style.mainDiv}>
      <form onSubmit={onSubmitHandler} style={style.formDiv}>
        <Input
          label="Name"
          id="name"
          value={taskManagerDetails?.name}
          onChange={onChangeHandler}
        />
        {/* <p>{isError&&"Name is required"}</p> */}
        <Input
          label="Description"
          id="description"
          value={taskManagerDetails?.description}
          onChange={onChangeHandler}
        />
        <DatePicker
          label="Deadline"
          value={taskManagerDetails?.deadLine}
          onChange={onChangeHandler}
        />

        <span style={style.buttonDiv}>
          <BasicButtons
            title={buttonName?.isEdit ? "Edit" : "Add +"}
            type="submit"
            // disable={isError && !buttonName?.isEdit}
          />
          &nbsp;
          {buttonName?.isEdit && (
            <BasicButtons
              title="cancel"
              color="error"
              variant="outlined"
              onClick={cancelEdit}
            />
          )}
        </span>
      </form>

      <div>
        <h3>Task Manager List</h3>

        <StickyHeadTable
          tableRows={taskManagerData}
          columns={columns}
          actions={{ EditIcon, DeleteIcon }}
          setButtonName={setButtonName}
          editRow={editRow}
          deleteRow={deleteRow}
        />
      </div>
    </div>
  );
};

export default TaskManager;
