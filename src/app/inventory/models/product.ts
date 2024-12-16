export interface Product {
    id? : number;
    descripcion? : string;
    idFamilia? : number;
    idMarca? : number;
    idUnidadMedida?:number;
    esActivo? : boolean;
    precioUnitario? : number;
    stock? : number;
    urlImg? : string;
    stockMinimo? : number;
    unidadMedida?:string;
    familia? :string;
    marca? : string;
    codigoInterno?:string;
    codigoBarras?:string;
};
