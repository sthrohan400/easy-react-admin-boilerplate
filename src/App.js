import React, { useEffect } from "react";
import RoutesConfiguration from "config/routes";
import "config/i18n";

import { useDispatch } from "react-redux";
import { appInit } from "slices/app";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appInit());
    }, []);

    return (
        <React.Suspense fallback={<>Loading...</>}>
            <div className="App">
                <RoutesConfiguration />
            </div>
        </React.Suspense>
    );
}

export default App;
