import { Form, FormControl } from "@angular/forms";
import { Familia } from "./familia";
import { Marca } from "./marca";
import { UnidadMedida } from "./UnidadMedida";

export interface ProductForm {
    codigoInterno: FormControl<string>;
    descripcion : FormControl<string>;
    familia : FormControl<Familia | null>;
    marca : FormControl<Marca | null>;
    precioUnitario : FormControl<number | null>;
    stockMinimo : FormControl<number | null>;
    codigoBarras: FormControl<String | null>;
    unidadMedida: FormControl<UnidadMedida | null>;
}