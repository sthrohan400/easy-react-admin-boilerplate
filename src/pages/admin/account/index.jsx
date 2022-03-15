import React from "react";
import DataTable from "components/DataTable";
import { users } from "services/mock/user";

const AccountPage = () => {
    const headers = [
        { field: "name", checkboxSelection: true },
        { field: "phone" },
        { field: "email" },
        { field: "username" }
    ];
    const data = [];

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <DataTable headers={headers} data={data} dataSource={users} />
        </div>
    );
};

export default AccountPage;
