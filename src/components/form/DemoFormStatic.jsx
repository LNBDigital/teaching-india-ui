import { FormSelect } from "./FormSelect";

export const DemoFormStaticSelect = ({ data = [], value, onChange }) => {
  const dataset = data;
  return (
    <FormSelect select={value}>
      {dataset.map((item, index) => (
        <div key={index}>
          <li onClick={() => onChange(item)}>{item}</li>
        </div>
      ))}
    </FormSelect>
  );
};


export const FormGender= ({onChange,value})=>{
    return(
        <DemoFormStaticSelect data={["male","female"]} value={value} onChange={onChange} />
    )
}