import React, { useState, useCallback } from "react";
import Loader from "./Loader";

//helpers
import { retrieveCommands, executeCommands } from "../util/helpers";

const GridInterpreter = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [report, setReport] = useState<string>("");

    const interpret = useCallback(() => {
        setLoading(true);
        retrieveCommands()
            .then((commands) => {
                setReport(executeCommands(commands));
            })
            .then(() => setLoading(false));
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <button type="button" onClick={() => interpret()}>
                    Interpret
                </button>
            )}
            <div>{report}</div>
        </div>
    );
};

export default GridInterpreter;
