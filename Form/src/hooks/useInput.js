import { useState } from "react";

export function useInput(defaultValues, validationFu) {
    const [enteredValues, setEnteredValues] = useState(defaultValues);

    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFu(enteredValues);

    function handleInputChange(event) {
        setEnteredValues(event.target.value);

        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValues,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    }
}