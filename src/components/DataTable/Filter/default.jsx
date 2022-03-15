import React, { useEffect, useState } from "react";
import { Form, DatePicker, Button, Input, Select, Divider, Switch } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined, FilterFilled, MinusCircleOutlined } from "@ant-design/icons";
import _ from "lodash";

/**
 * Author: Rohan Kumar Shrestha
 * Filter Component
 * 
 * ONLY ALLOWED INPUT FOR FILTER ARE:
 * INPUT , DatePicker , DatePicker.RangePicker
 * 
 * Component creates visualize filter based on filterSettings passed in the
 *  FilterSettings: [
    *  createdAt: {
                label: "Created Date",
                key: "createdAt",
                type: "datepicker",
                element: <DatePicker />, React Component
                operators: ["between"]
            },
        email: {
                label: "Created Date",
                key: "createdAt",
                type: "datepicker",
                element: <Input />, // React JS Component
                operators: ["between"]
            },
 * ]
 * 
 * props and returns filterInfo array[object,object]
 * Where filterInfo contains multiple object with below informaiton.
 * {
 *  key: Filter Key Field
 *  operator: Operator used to filter the data eg: = ,>, <, LIKE, contains etc
 *  value: Filter value
 * Filter Data:
 * { 
 *      key: null, // Field Key
 *      operator: null,  // Selected Operator
 *      value: null  // Field value
 * }
 * }
 */
const Filter = (props) => {
    const initialFilterSettings = {
        createdAt: {
            label: "Created Date",
            key: "createdAt",
            type: "datepicker",
            element: <DatePicker.RangePicker />,
            operators: ["between"]
        }
    };
    const [filterSettings, setFilterSettings] = useState(initialFilterSettings);
    const [filterInfo, setFilterInfo] = useState([]); // Holds Array of object
    // const [filterCount, setFilterCount] = useState(0);

    const handleFilterFormSubmit = () => {
        return props.onFilterEvent("filterBy", filterInfo);
    };

    /**
     * TODO check this function if it works as expected.
     * Handle duplicate check additon if key already exist return error
     * @param {} _index
     * @param {*} _obj
     */
    const handleAddFilter = (_index = null, _obj = null) => {
        if (_.size(filterInfo) < _.size(filterSettings) && _index === null) {
            const newData = { key: null, operator: null, value: null };
            setFilterInfo([...filterInfo, newData]);
        } else {
            const data = [...filterInfo];
            let oldData = { ...data[_index] };
            let newData = _obj;
            if (oldData.key && oldData.key == newData.key) {
                // If Key is changed then reset operator and selected value
                newData = { ..._obj, ...{ operator: null, value: null } };
            }
            data[_index] = { ...data[_index], ...newData };
            setFilterInfo(data);
        }
    };
    /**Delete data[index];
     *   Delete cannot be used as data will be replaced with Empty and
     *   Length will still be the same.
     *  if index = all => remove all the filter
     *  else remove based on index
     * */
    const handleRemoveFilter = (index) => {
        if (index === "all") {
            setFilterInfo([]);
        } else {
            const data = [...filterInfo]; // Shallow copy
            data.splice(index, 1);
            setFilterInfo(data);
        }
    };
    /** Functions to retrieve data for form input components
     * selectOptions: retrieves all the available Filter key field informaiton.
     */
    const selectFilterFormItemKeyOptions = () => {
        let result = [];
        for (const [key, item] of Object.entries(filterSettings)) {
            let temp = {
                value: item.key,
                label: item.label
                // disabled: item.operatorValue || item.value ? true : false
            };
            result.push(temp);
        }
        return result;
    };
    /**
     * Function to retrieve available operators information from filter settings
     * based on selected field as each field can be configured to use
     * certain type of operators only.
     * In filterSettings you can define the allowed operators for individual field.
     * @params index : Filter Data Index to retrieve selected filte key field
     */
    const selectFilterFormItemOperatorOptions = (index) => {
        if (_.isString(filterInfo[index]["key"])) {
            const operators = filterSettings[filterInfo[index]["key"]]?.operators ?? [];
            const options = operators.map((value) => {
                return {
                    label: value,
                    value: value
                };
            });
            return options;
        } else {
            return [
                {
                    label: "Please select",
                    value: ""
                }
            ];
        }
    };
    const getFilterKeyElement = (index) => {
        const debouncedAddFilter = _.debounce((value) => {
            return handleAddFilter(index, { value: value });
        }, 500);
        if (filterInfo[index]["key"] && filterSettings[filterInfo[index]["key"]].element) {
            const element = filterSettings[filterInfo[index]["key"]].element;
            return React.cloneElement(element, {
                onChange: (e) => {
                    let value = null;
                    if (element.type.name == "Input") {
                        value = e.target.value;
                        value = value.toString().trim();
                    } else if (element.type.name == "RangePicker") {
                        // Returns array of start and end moment date object
                        value = [
                            e[0].format("YYYY-MM-DD HH:mm:ss"),
                            e[1].format("YYYY-MM_DD HH:mm:ss")
                        ];
                    } else if (element.type.name == "DatePicker") {
                        value = e.format("YYYY-MM-DD HH:mm:ss");
                    }
                    return debouncedAddFilter(value);
                }
            });
        } else {
            return (
                <Input
                    onChange={(e) => {
                        let value = e.target.value;
                        return debouncedAddFilter(value);
                    }}
                />
            );
        }
    };

    return (
        <div>
            <div>
                <Button onClick={() => handleAddFilter()} type="default" ghost>
                    <FilterFilled /> Advance Filters
                </Button>
            </div>
            <Divider />
            {filterInfo.length > 0 && (
                <div>
                    <Form onFinish={handleFilterFormSubmit} name="filter-form" layout="vertical">
                        {filterInfo.map((value, index) => {
                            return (
                                <Form.Item key={index}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                        <div style={{ width: "20px", alignItems: "left" }}>
                                            <a
                                                onClick={() => {
                                                    return handleRemoveFilter(index);
                                                }}>
                                                <MinusCircleOutlined className="remove-icon" />
                                            </a>
                                        </div>
                                        <div className="dynamic-filter-item">
                                            <Select
                                                name="_filter_key"
                                                defaultValue={value.key || false}
                                                options={selectFilterFormItemKeyOptions()}
                                                onChange={(value) => {
                                                    return handleAddFilter(index, { key: value });
                                                }}
                                            />
                                        </div>
                                        <div className="dynamic-filter-item">
                                            <Select
                                                name="_filter_operators"
                                                options={selectFilterFormItemOperatorOptions(index)}
                                                onChange={(value) => {
                                                    return handleAddFilter(index, {
                                                        operator: value
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="dynamic-filter-item">
                                            {" "}
                                            {getFilterKeyElement(index)}{" "}
                                        </div>
                                        <div className="dynamic-filter-item"></div>
                                    </div>
                                </Form.Item>
                            );
                        })}
                        <Form.Item>
                            <Button htmlType="submit" type="primary" ghost>
                                <SearchOutlined /> Search{" "}
                            </Button>
                            <Button type="danger" ghost onClick={() => handleRemoveFilter("all")}>
                                Clear
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};

Filter.propTypes = {
    onFilterEvent: PropTypes.func.isRequired
};

export default Filter;
