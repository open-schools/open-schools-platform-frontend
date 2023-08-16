import {checkIfNotEmptyValue} from "../domains/common/utils/form";

test('checkIfEmptyValue(undefined)', () => {
    expect(checkIfNotEmptyValue(undefined)).toBe(false);
});

test('checkIfEmptyValue(null)', () => {
    expect(checkIfNotEmptyValue(null)).toBe(false);
});

test('checkIfEmptyValue([])', () => {
    expect(checkIfNotEmptyValue([])).toBe(false);
});

test('checkIfEmptyValue("")', () => {
    expect(checkIfNotEmptyValue("")).toBe(false);
});

test('checkIfEmptyValue("Name")', () => {
    expect(checkIfNotEmptyValue("Alexander Nevsky")).toBe(true);
});

test('checkIfEmptyValue([object])', () => {
    expect(checkIfNotEmptyValue([{
        firstName: "Alexander",
        latName: "Nevsky"
    }])).toBe(true);
});
