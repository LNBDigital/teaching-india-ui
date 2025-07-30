import { useEffect, useState } from "react";
import { FormSelect } from "./FormSelect";
import { getHelperData } from "src/lib/getApi";

export const DemoFormSelect = ({ api, name = "name", id="id", value, onChange,label="Select" }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({ id: null, name: "" });
  useEffect(() => {
    getHelperData(api).then((data) => setData(data));
  }, []);

  useEffect(() => {
  if(value){
      const match = data.find((item) => item[id] === value);
    if (match) {
      setSelected({ id: match[id], name: match[name] });
    }
  }
  }, [value, data]);

  return (
    <FormSelect select={selected.name || label }>
      {data.map((item) => (
        <li
          key={item[id]}
          onClick={() => {
            setSelected({ id: item[id], name: item[name] });
            onChange({ id: item[id] });
          }}
        >
          {item[name]}
        </li>
      ))}
    </FormSelect>
  );
};

export const DemoFormBoards = ({onChange}) =>{
    return(
        <DemoFormSelect api={"boards"} onChange={onChange} />
    )
}
export const DemoFormClasses = ({onChange}) =>{
    return(
        <DemoFormSelect api={"classes"} onChange={onChange} />
    )
}