import logo from './logo.svg';
import './App.css';
import { useGetEmployeesQuery, useGetEmployeeQuery, useAddEmployeeMutation } from './services/employeesApi'

function App() {
  const { data, error, isLoading, isSuccess } = useGetEmployeesQuery();

  return (
    <div className="App">
      { error && (
        <div>
        Oh no ! there is error</div>
      )}
      { isLoading && (
        <div>Loading...</div>
      )}
      
      { isSuccess && (
        data.data.map((emp) => 
          <pre key={emp.id}>
            <div>{emp.employee_name}</div>
            <ul><EmployeeDetail id={emp.id}/></ul>
          </pre>
        )
        
      ) }    
      <div>
        <AddEmployee/> 
      </div>
    </div>
  );
}

export const EmployeeDetail = (props) => {
  //const { data, error, isLoading, isSuccess } = useGetEmployeeQuery(props.id)
  const { employee } = useGetEmployeesQuery(undefined,
      {
        selectFromResult: ({ data }) => ({
          employee: data?.data?.find((emp) => emp.id === props.id),
        }),
      }
    )

    return <li>{employee?.employee_salary}</li>

  // return (
  //   <div>
  //     { error && (
  //       <div>
  //       Oh no ! there is error</div>
  //     )}
  //     { isLoading && (
  //       <div>Loading...</div>
  //     )}
  //     {isSuccess && JSON.stringify(data.data)}
  //   </div>
  // )
}

export const AddEmployee = (props) => {
  const employeeBody = {"name":"test","salary":"123","age":"23"}
  const [addEmployee] = useAddEmployeeMutation()
  const addHandler = async() => {
    await addEmployee(employeeBody)
  }
  
  return(
    <>
      <button onClick={addHandler}>Add employee</button>
    </>
  )
}



export default App;
