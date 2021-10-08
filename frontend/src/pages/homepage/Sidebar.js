import { Input, Label } from "reactstrap";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">Our Products</div>
      <div className="filter-box">
        <p className="filter-heading">Filter</p>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
      </div>

      <div className="filter-box">
        <p className="filter-heading">Filter</p>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
        <div>
          <Label check>
            <Input type="checkbox" />
            Feature Name
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
