// Angular
import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// Proyecto
import { Marca } from '../../models/marca';
import { Familia } from '../../models/familia';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FamiliaService } from '../../services/familia.service';
import { MarcaService } from '../../services/marca.service';
import { ProductForm } from '../../models/productForm';
import { Column } from '../../../shared/Models/Column';
import { ExportColumn } from '../../../shared/Models/ExportColumn';
import { CustomMessageService } from '../../../shared/services/custom-message.service';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { forkJoin } from 'rxjs';
import { UnidadMedida } from '../../models/UnidadMedida';
import { UnidadMedidaService } from '../../services/unidadMedida.service';


@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        DataViewModule,
        TagModule,
        RatingModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        ToastModule,
        FileUploadModule,
        TableModule,
        FormsModule,
        RippleModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        InputTextModule,
        CardModule,
        ImageModule,
        ReactiveFormsModule,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    providers: [ConfirmationService, MessageService, CustomMessageService ]
})
export class ProductComponent implements OnInit {

    private _formBuilder = inject(FormBuilder);

    private _productService = inject(ProductService);

    private _messageService = inject(CustomMessageService);

    private _confirmationService = inject(ConfirmationService);

    private _familiaService = inject(FamiliaService);

    private _marcaService = inject(MarcaService);

    private _unidadMedidaService = inject(UnidadMedidaService);

    form!: FormGroup;

    newProduct: boolean = false;

    productDialog: boolean = false;

    imgEdit: boolean = false;

    familias: Familia[] = [];

    marcas: Marca[] = [];

    unidades: UnidadMedida[] = []

    products!: Product[];

    files: any;

    product!: Product;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    selectedProducts!: Product[] | null;


    @ViewChild('fileUploadRef') fileUpload!: FileUpload;

    ngOnInit() {
        this._productService.getProducts().subscribe((data) => (this.products = data));
        this._familiaService.getFamilias().subscribe((data) => (this.familias = data));
        this._marcaService.getMarcas().subscribe((data) => (this.marcas = data));
        this._unidadMedidaService.getUnidades().subscribe((data) => (this.unidades = data));



        this.form = this._formBuilder.group<ProductForm>({
            codigoInterno: this._formBuilder.nonNullable.control('', Validators.required),
            descripcion: this._formBuilder.nonNullable.control('', Validators.required),
            unidadMedida: this._formBuilder.nonNullable.control(null, Validators.required),
            familia: this._formBuilder.nonNullable.control(null, Validators.required),
            marca: this._formBuilder.nonNullable.control(null, Validators.required),
            precioUnitario: this._formBuilder.nonNullable.control(null, Validators.required),
            stockMinimo: this._formBuilder.nonNullable.control(null, Validators.required),
            codigoBarras: this._formBuilder.control(null)
        });

        this.cols = [
            { field: 'codigoInterno', header: 'Codigo', customExportHeader: 'Product Code' },
            { field: 'descripcion', header: 'Descripcion' },
            { field: 'familia', header: 'Familia' },
            { field: 'marca', header: 'Marca' },
            { field: 'precioUnitario', header: 'Precio_Unitario' },
            { field: 'stockMinimo', header: 'Stock_Minimo' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    hasRequiredError(field: string) {
        const control = this.form.get(field);
        return control?.hasError('required') && control.touched;
    }

    openNew() {
        this.product = {};
        this.imgEdit = true;
        this.newProduct = true;
        this.form.reset();
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this._confirmationService.confirm({
            message: '¿Está seguro de que desea eliminar los productos seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const deleteRequests = this.selectedProducts!.map((product) =>
                    this._productService.deleteProduct(product.id!)
                );
    
                // Ejecutamos todas las solicitudes de eliminación al mismo tiempo
                forkJoin(deleteRequests).subscribe({
                    next: (results) => {
                        // Si todas las eliminaciones son exitosas
                        this._messageService.showSuccess('Productos Eliminados');
                        this._productService.getProducts().subscribe(response => {
                            this.products = [...response];
                        })
                    },
                    error: (err) => {
                        // Si ocurre algún error
                        this._messageService.showError('Hubo un error al eliminar los productos');
                    }
                });
            }
        });
    }

    editProduct(product: Product) {
        this.newProduct = false;
        this.imgEdit = false;
        this.product = { ...product };

        const familia = this.familias.find(f => f.nombre === product.familia) ?? {};
        const marca = this.marcas.find(m => m.nombre === product.marca) ?? {};
        const unidad = this.unidades.find(m => m.abreviatura === product.unidadMedida) ?? {};

        console.log(unidad);

        this.form.setValue({
            codigoInterno: product.codigoInterno,
            descripcion: product.descripcion,
            familia: familia,
            marca: marca,
            unidadMedida:unidad,
            precioUnitario: product.precioUnitario,
            stockMinimo: product.stockMinimo,
            codigoBarras:product.codigoBarras
        });

        this.productDialog = true;
    }

    // Falta implementar
    deleteProduct(product: Product) {
        this._confirmationService.confirm({
            message: '¿Estás seguro(a) de que quieres eliminar? ' + product.descripcion + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._productService.deleteProduct(product.id!).subscribe((response) => {
                        this.products = this.products.filter((val) => val.id !== product.id);
                        this._messageService.showSuccess('Producto Eliminado');
                })
                this.product = {};
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
    }

    deleteImg() {
        this.imgEdit = true;
        this.product.urlImg = 'box.png';
    }

    saveProduct() {
        this.convertProductFormToProduct();
        if (this.files && this.files.length > 0) {
            const formData = new FormData();
            formData.append('file', this.files[0]);
            this._productService.customUpload(formData).subscribe((response) => {
                    this.product.urlImg = response;
                    this.saveOrUpdateProduct();
            });
        } else {
            this.saveOrUpdateProduct();
        }
    }

    convertProductFormToProduct() {
        this.product.codigoInterno = this.form.value.codigoInterno;
        this.product.descripcion = this.form.value.descripcion;
        this.product.idFamilia = this.form.value.familia.id;
        this.product.idMarca = this.form.value.marca.id;
        this.product.precioUnitario = this.form.value.precioUnitario;
        this.product.stockMinimo = this.form.value.stockMinimo;
        this.product.codigoBarras = this.form.value.codigoBarras || null;
        this.product.idUnidadMedida = this.form.value.unidadMedida.id;
    }


    saveOrUpdateProduct() {
        this.product.descripcion?.trim();
        this.product.codigoInterno?.trim();

        if (this.product.id) {
            console.log(this.product);
            this._productService.updateProduct(this.product).subscribe((response) => {
                    this.products[this.findIndexById(response.id!)] = response;
                    this._messageService.showSuccess('Producto Actualizado');
            });
        } else {
            this._productService.saveProduct(this.product).subscribe((response) => {
                    this.products.push(response);
                    this.products = [...this.products];
                    this._messageService.showSuccess('Producto Creado');
            });
        }
        
        this.productDialog = false;
        this.product = {};
        this.files = [];
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    getSeverity(stock: number) {
        return stock > 0 ? 'success' : 'danger';
    }

    onSelectedFiles($event: any) {
        this.files = $event.currentFiles;
    }

    clearSelected() {
        this.files = null;
        this.fileUpload.clear();
    }

    onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
        removeFileCallback(event, index);
    }
}
