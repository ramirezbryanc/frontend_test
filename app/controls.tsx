import Select from "react-select";
import { useState } from "react";

interface ControlsProps {
  onSortChange: (sortBy: undefined | string, sortOrder: undefined | string ) => void;
}

const Controls: React.FC<ControlsProps> = ({ onSortChange }) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const [sortField, setSortField] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);

  const handleFieldChange = (selectedOption: any) => {
    const selectedField = selectedOption ? selectedOption.value : undefined;
    setSortField(selectedField);
    onSortChange(selectedField, sortOrder); // Call parent with both values
  };


  const handleOrderChange = (selectedOption: any) => {
    const selectedOrder = selectedOption ? selectedOption.value : undefined;
    setSortOrder(selectedOrder);
    onSortChange(sortField, selectedOrder); // Call parent with both values
  };

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select 
          options={fieldOptions} 
          inputId="sort-field" 
          className="input" 
          onChange={handleFieldChange}
          value={sortField ? fieldOptions.find(option => option.value === sortField) : null}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={handleOrderChange}
          value={sortOrder ? directionOptions.find(option => option.value === sortOrder) : null}
        />
      </div>
    </div>
  );
};

export default Controls;
