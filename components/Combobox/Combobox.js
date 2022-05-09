//component showing combobox

import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

import styles from "./combobox.module.scss";
import DropIcon from "./../../constants/icons/DropIcon";

const Combobox = React.memo(
  ({ setSelect, setBlur, style, name, value, list }) => {
    let defaultVal;

    switch (name) {
      case "brand":
        defaultVal = "Marka seç";
        break;
      case "color":
        defaultVal = "Renk seç";
        break;
      case "status":
        defaultVal = "Kullanım durumu seç";
        break;
      case "category":
        defaultVal = "Kategori seç";
        break;
      default:
        break;
    }
    if (value) {
      defaultVal = value.name;
    }
    const [selectedVal, setSelectedVal] = useState(defaultVal);

    const handleChange = (val) => {
      setSelectedVal(val);
      setSelect({ target: { name, value: val } });
    };

    return (
      <Listbox value={selectedVal} onChange={handleChange} onBlur={setBlur}>
        <div className={styles.content}>
          <Listbox.Button className={style}>
            <span>{selectedVal}</span>
            <DropIcon />
          </Listbox.Button>
          <Listbox.Options className={styles.options}>
            {list.map((item, index) => (
              <Listbox.Option
                key={index}
                className={
                  selectedVal == item.name
                    ? `${styles.option} ${styles.optionActive}`
                    : styles.option
                }
                value={item.name}
              >
                {({ selectedVal }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selectedVal ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  }
);

export default Combobox;
