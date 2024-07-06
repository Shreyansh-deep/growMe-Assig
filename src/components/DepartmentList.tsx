import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface Department {
  id: number;
  name: string;
  subDepartments: Department[];
  isSelected: boolean;
}

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'customer_service',
      subDepartments: [
        { id: 2, name: 'support', subDepartments: [], isSelected: false },
        { id: 3, name: 'customer_success', subDepartments: [], isSelected: false },
      ],
      isSelected: false,
    },
    {
      id: 4,
      name: 'design',
      subDepartments: [
        { id: 5, name: 'graphic_design', subDepartments: [], isSelected: false },
        { id: 6, name: 'product_design', subDepartments: [], isSelected: false },
        { id: 7, name: 'web_design', subDepartments: [], isSelected: false },
      ],
      isSelected: false,
    },
  ]);

  const handleToggle = (department: Department) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      const index = updatedDepartments.findIndex((d) => d.id === department.id);
      if (index!== -1) {
        updatedDepartments[index].isSelected =!department.isSelected;
        if (department.subDepartments.length > 0) {
          department.subDepartments.forEach((subDepartment) => {
            subDepartment.isSelected = updatedDepartments[index].isSelected;
          });
        }
      }
      return updatedDepartments;
    });
  };

  const handleSubDepartmentToggle = (subDepartment: Department) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      const departmentIndex = updatedDepartments.findIndex((d) => d.subDepartments.some((sd) => sd.id === subDepartment.id));
      if (departmentIndex!== -1) {
        const subDepartmentIndex = updatedDepartments[departmentIndex].subDepartments.findIndex((sd) => sd.id === subDepartment.id);
        if (subDepartmentIndex!== -1) {
          updatedDepartments[departmentIndex].subDepartments[subDepartmentIndex].isSelected =!subDepartment.isSelected;
          const allSubDepartmentsSelected = updatedDepartments[departmentIndex].subDepartments.every((sd) => sd.isSelected);
          updatedDepartments[departmentIndex].isSelected = allSubDepartmentsSelected;
        }
      }
      return updatedDepartments;
    });
  };

  const renderTree = (departments: Department[]) => {
    return departments.map((department) => (
      <Accordion key={department.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            control={<Checkbox checked={department.isSelected} onChange={() => handleToggle(department)} />}
            label={department.name}
          />
        </AccordionSummary>
        <AccordionDetails>
          {department.subDepartments.length > 0 && (
            <ul>
              {department.subDepartments.map((subDepartment) => (
                <li key={subDepartment.id}>
                  <FormControlLabel
                    control={<Checkbox checked={subDepartment.isSelected} onChange={() => handleSubDepartmentToggle(subDepartment)} />}
                    label={subDepartment.name}
                  />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <div style={{margin: 30, width: 600, }}>
      {renderTree(departments)}
    </div>
  );
};

export default DepartmentList;