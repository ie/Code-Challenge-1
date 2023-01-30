import { render, screen } from "@testing-library/react";
import { executeCommands } from "../util/helpers";

describe("Execute command function", () => {
    describe("Position of Pacman is calculated correctly when", () => {
        it("has valid commands", () => {
            const commandList = [
                ["PLACE", "0,0,SOUTH"],
                ["LEFT"],
                ["MOVE"],
                ["MOVE"],
                ["LEFT"],
                ["MOVE"],
                ["RIGHT"],
                ["MOVE"],
                ["REPORT"],
            ];
            expect(executeCommands(commandList)).toBe("3,1,EAST");
        });

        it("ignores commands until placement", () => {
            const commandList = [
                ["LEFT"],
                ["MOVE"],
                ["REPoRT"],
                ["pLACE", "0,0,noRTH"],
                ["RIGHT"],
                ["MOVE"],
                ["REPORT"],
            ];
            expect(executeCommands(commandList)).toBe("1,0,EAST");
        });

        it("reports position only once", () => {
            const commandList = [
                ["LEFT"],
                ["MOVE"],
                ["PLACE", "0,0,NORTH"],
                ["REPORT"],
                ["PLACE", "5,3,EAST"],
                ["RIGHT"],
                ["MOVE"],
                ["REPORT"],
            ];
            expect(executeCommands(commandList)).toBe("0,0,NORTH");
        });

        it("can be placed more than once", () => {
            const commandList = [
                ["PLACE", "0,0,NORTH"],
                ["MOVE"],
                ["RIGHT"],
                ["MOVE"],
                ["LEFT"],
                ["PLACE", "3,3,WEST"],
                ["LEFT"],
                ["REPORT"],
            ];
            expect(executeCommands(commandList)).toBe("3,3,SOUTH");
        });

        it("has been given a wrong rotation command", () => {
            const commandList = [["PLACE", "1,4,NORTH"], ["RIHGT"], ["REPORT"]];
            expect(executeCommands(commandList)).toBe("1,4,NORTH");
        });
    });

    describe("Position of Pacman is calculated incorrectly when", () => {
        it("has been placed out of bounds", () => {
            const commandList = [["PLACE", "8,4,NORTH"], ["MOVE"], ["REPORT"]];
            expect(executeCommands(commandList)).toBe("INVALID COMMAND");
        });

        it("has not been placed", () => {
            const commandList = [
                ["LEFT"],
                ["MOVE"],
                ["MOVE"],
                ["LEFT"],
                ["MOVE"],
                ["RIGHT"],
                ["MOVE"],
                ["REPORT"],
            ];
            expect(executeCommands(commandList)).toBe("INVALID COMMAND");
        });

        it("has not reported its position", () => {
            const commandList = [
                ["PLACE", "0,0,NORTH"],
                ["LEFT"],
                ["LEFT"],
                ["LEFT"],
                ["MOVE"],
            ];
            expect(executeCommands(commandList)).toBe("INVALID COMMAND");
        });

        it("has mistyped commands", () => {
            const commandList = [["PLAS", "0,0,NORTH"], ["MOVE"], ["REPORT"]];
            expect(executeCommands(commandList)).toBe("INVALID COMMAND");
        });
    });
});
