import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Select, Divider, Input, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Filter from "components/DataTable/Filter/default";
import _ from "lodash";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

/** Default Ag Grid Configurations for Databale */
const defaultAgGridSettings = {
    defaultColDef: {
        editable: false,
        sortable: true,
        resizable: false,
        filter: true,
        flex: 1,
        minWidth: 100
    },
    pagination: true,
    paginationPageSize: 25,
    rowSelection: "single",
    domLayout: "autoHeight",
    overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
};
const defaultDTConfig = {
    pageSizeOptions: [
        { label: 25, value: 25 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 500, value: 500 }
    ]
};

const DataTable = (props) => {
    const { data, headers, ...configurations } = props;
    /**
     * Overriding default Ag grid configurations
     * with the configuration passed in on as props.
     */
    const config = { ...defaultAgGridSettings, ...configurations };
    const initialFilterConfig = {
        page: 1,
        pageSize: Number(config.paginationPageSize),
        sortBy: [], // ["createdAt", "DESC"] Data should be pushed on this format
        filterBy: [{}] // [key: "createdAt",operator: ">",value: "2022-01-22" or [onevalue, anothervalue]] Data should be on this format
    };
    const [agGridApi, setAgGridApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [dtFilters, setDTFilters] = useState(initialFilterConfig); // Default Data filter set

    /** Data table available functions
     * TODO: Add method to extract data on excel format
     * Only CSV data extraction method has been implemented.
     */
    const handleDownloadReport = (event) => {
        event.preventDefault();
        switch (event.target.downloadtype) {
            case "excel":
                return false;
            default:
                return agGridApi.exportDataAsCsv();
        }
    };
    const handlePageSizeChange = (value) => {
        if (agGridApi) {
            return agGridApi.paginationSetPageSize(Number(value));
        }
    };
    const handleTableSearch = (event) => {
        if (agGridApi) {
            return agGridApi.setQuickFilter(event.target.value.toString());
        }
    };
    /**
     * Function handles the filter function of the datatable
     * and sets the DTFilter data which is passed when called to API
     * to get filtered data.
     * @param [] filterConfigObj  - Array of filter data object
     * { key: fieldname, operator: used-operator, value: filter value}
     */
    const handleFilter = (index, filterConfigObj) => {
        setDTFilters(...initialFilterConfig[index], ...filterConfigObj);
    };
    /**
     * Function initiates a function call from parent component and pass
     * the datatable filter config data set.
     * @param {DTFilters} filterObj
     */
    const fetchData = (filterObj) => {
        if (agGridApi) {
            agGridApi.showLoadingOverlay();
            props
                .dataSource(filterObj)
                .then((result) => {
                    agGridApi.hideOverlay();
                    agGridApi.setRowData(result);
                })
                .catch((error) => {
                    /**
                     * TODO: Trigger Notificaiton POPUP
                     */
                    agGridApi.hideOverlay();
                });
        }
    };

    const onGridReady = (params) => {
        setAgGridApi(params.api);
    };

    useEffect(() => {
        setColumnDefs(headers);
    }, [headers]);

    useEffect(() => {
        fetchData(dtFilters);
    }, [agGridApi, dtFilters]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ margin: "10px auto" }} className="datatable-filter-component">
                <Filter onFilterEvent={handleFilter} />
            </div>
            <div style={{ margin: "10px auto" }}>
                <span>
                    <Select
                        onChange={() => {
                            return _.debounce(handlePageSizeChange, 1000);
                        }}
                        style={{ minWidth: "70px" }}
                        defaultValue={Number(config.paginationPageSize)}
                        options={defaultDTConfig.pageSizeOptions}
                    />
                </span>
                <span>
                    <Input
                        placeholder="Search"
                        onChange={handleTableSearch}
                        style={{ maxWidth: "220px", float: "right" }}
                    />
                    <Button
                        type="default"
                        downloadtype="csv"
                        onClick={handleDownloadReport}
                        style={{ maxWidth: "200px", float: "right" }}>
                        <DownloadOutlined /> CSV
                    </Button>
                </span>
            </div>
            <div className="ag-theme-alpine" style={{ width: "100%" }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    {...config}>
                    {props.children}
                </AgGridReact>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    dataSource: PropTypes.func,
    enableDynamicFilter: PropTypes.bool,
    dynamiFilterElement: PropTypes.element
};

export default DataTable;
