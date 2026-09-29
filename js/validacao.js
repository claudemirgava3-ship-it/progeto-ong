export function validarFormulario(formulario) {

    const campos = formulario.querySelectorAll("input, select");

    campos.forEach((campo) => {

        campo.classList.remove("campo-erro", "campo-sucesso");

        if (campo.checkValidity()) {
            campo.classList.add("campo-sucesso");
        } else {
            campo.classList.add("campo-erro");
        }
    });

    return formulario.checkValidity();
}