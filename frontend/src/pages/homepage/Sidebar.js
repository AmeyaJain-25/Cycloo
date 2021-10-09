import { useEffect, useState } from "react";
import { Range } from "react-range";
import { Collapse, Input, Label } from "reactstrap";
import ProductsIcon from "../../assets/filter-variant.svg";
import "./sidebar.scss";

const Sidebar = ({ products, setFilteredPro }) => {
  const [priceRange, setPriceRange] = useState([15000]);
  const [isOpen, setIsOpen] = useState(true);

  const [types, setTypes] = useState({
    mtb: false,
    hybrid: false,
    bmx: false,
  });
  const [sizes, setSizes] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [brakes, setBrakes] = useState({
    disc: false,
    drum: false,
    rim: false,
  });

  const [gearsReq, setGearsReq] = useState(false);

  useEffect(() => {
    let data = products;
    if (!(!types.mtb && !types.hybrid && !types.bmx)) {
      data = data.filter((pro) => {
        if (types.mtb && pro.type.toUpperCase() === "mtb".toUpperCase())
          return true;
        if (types.hybrid && pro.type.toUpperCase() === "hybrid".toUpperCase())
          return true;
        if (types.bmx && pro.type.toUpperCase() === "bmx".toUpperCase())
          return true;
        return false;
      });
    }

    if (priceRange) {
      data = data.filter((pro) => {
        let price = parseInt(pro.price);
        return price < priceRange;
      });
    }

    if (!(!sizes.small && !sizes.medium && !sizes.large)) {
      data = data.filter((pro) => {
        if (sizes.small && pro.size.toUpperCase() === "s".toUpperCase())
          return true;
        if (sizes.medium && pro.size.toUpperCase() === "m".toUpperCase())
          return true;
        if (sizes.large && pro.size.toUpperCase() === "l".toUpperCase())
          return true;
        return false;
      });
    }
    if (!(!brakes.disc && !brakes.drum && !brakes.rim)) {
      data = data.filter((pro) => {
        if (brakes.disc && pro.brakeType.toUpperCase() === "disc".toUpperCase())
          return true;
        if (brakes.drum && pro.brakeType.toUpperCase() === "drum".toUpperCase())
          return true;
        if (brakes.rim && pro.brakeType.toUpperCase() === "rim".toUpperCase())
          return true;
        return false;
      });
    }
    if (gearsReq) {
      data = data.filter((pro) => {
        return pro.gear;
      });
    }
    setFilteredPro(data);
  }, [types, sizes, brakes, gearsReq, priceRange]);

  return (
    <div className="sidebar">
      <div className="sidebar-heading" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={ProductsIcon}
          alt="Add Item"
          style={{ width: "34px", marginTop: "-3px" }}
        />{" "}
        Filter
      </div>
      <Collapse isOpen={isOpen}>
        <div className="filter-box">
          <p className="filter-heading">Type</p>
          <div className="options">
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setTypes({ ...types, mtb: e.target.checked })
                  }
                />
                MTB
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setTypes({ ...types, hybrid: e.target.checked })
                  }
                />
                Hybrid
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setTypes({ ...types, bmx: e.target.checked })
                  }
                />
                BMX
              </Label>
            </div>
          </div>
        </div>
        <div className="filter-box">
          <p className="filter-heading">Price: &#8377; {priceRange}</p>
          <div className="options">
            <Range
              step={1000}
              min={4000}
              max={100000}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#7064e5",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    background: "#fff",
                    border: "1px solid #7064e5",
                    borderRadius: "4px",
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#fff",
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="filter-box">
          <p className="filter-heading">Size</p>
          <div className="options">
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setSizes({ ...sizes, small: e.target.checked })
                  }
                />
                S (small)
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setSizes({ ...sizes, medium: e.target.checked })
                  }
                />
                M (medium)
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setSizes({ ...sizes, large: e.target.checked })
                  }
                />
                L (large)
              </Label>
            </div>
          </div>
        </div>

        <div className="filter-box">
          <p className="filter-heading">Brake Type</p>
          <div className="options">
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setBrakes({ ...brakes, disc: e.target.checked })
                  }
                />
                Disc
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setBrakes({ ...brakes, drum: e.target.checked })
                  }
                />
                Drum
              </Label>
            </div>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setBrakes({ ...brakes, rim: e.target.checked })
                  }
                />
                Rim
              </Label>
            </div>
          </div>
        </div>

        <div className="filter-box">
          <p className="filter-heading">Gear</p>
          <div className="options">
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={(e) => setGearsReq(e.target.checked)}
                />
                Required
              </Label>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
