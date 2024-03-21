import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormloginComponent } from './Forms/formlogin/formlogin.component';
import { FormregistrationadminComponent } from './Forms/formregistrationadmin/formregistrationadmin.component';
import { ListAdminComponent } from './Lists/list-admin/list-admin.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ServiceService } from './shared/service.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormconductorComponent } from './Forms/formconductor/formconductor.component';
import { ListconductorComponent } from './Lists/listconductor/listconductor.component';
import { FormvehicleComponent } from './Forms/formvehicle/formvehicle.component';
import { ListvehicleComponent } from './Lists/listvehicle/listvehicle.component';
import { ListCheckComponent } from './Lists/list-check/list-check.component';
import { FormListCheckComponent } from './Forms/form-list-check/form-list-check.component';
import { FormVehicleDocumentsComponent } from './Forms/form-vehicle-documents/form-vehicle-documents.component';
import { ListVehicleDocumentsComponent } from './Lists/list-vehicle-documents/list-vehicle-documents.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormdriversdocumentsComponent } from './Forms/formdriversdocuments/formdriversdocuments.component';
import { ListdriversdocumentsComponent } from './Lists/listdriversdocuments/listdriversdocuments.component';
import { GeneratePasswordComponent } from './Forms/ChangePassword/generate-password/generate-password.component';
import { UpdatePasswordComponent } from './Forms/ChangePassword/update-password/update-password.component';
import { GetCodigoComponent } from './Forms/ChangePassword/get-codigo/get-codigo.component';
import { FilterPipe } from './pipes/filter.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilteradminPipe } from './pipes/filteradmin.pipe';
import { FiltervehiculoPipe } from './pipes/vehiculo/filtervehiculo.pipe';
import { FilterconductorPipe } from './pipes/conductor/filterconductor.pipe';
import {FilterdriversdocumentPipe} from './pipes/driversdocument/filterdriversdocument.pipe';
import { FiltervehicledocumentsPipe } from './pipes/vehicledocuments/filtervehicledocuments.pipe';
import { FilterlistcheckPipe } from './pipes/listcheck/filterlistcheck.pipe';
import { IndexComponent } from './index/index.component';
import { FilterlistdriversdocumentPipe } from './pipes/listdriversdocuments/filterlistdriversdocument.pipe'
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  declarations: [
    AppComponent,
    FormloginComponent,
    FormregistrationadminComponent,
    ListAdminComponent,
    HomeComponent,
    FormconductorComponent,
    ListconductorComponent,
    FormvehicleComponent,
    ListvehicleComponent,
    ListCheckComponent,
    FormListCheckComponent,
    FormVehicleDocumentsComponent,
    ListVehicleDocumentsComponent,
    FormdriversdocumentsComponent,
    ListdriversdocumentsComponent,
    GeneratePasswordComponent,
    UpdatePasswordComponent,
    GetCodigoComponent,
    FilterPipe,
    FilteradminPipe,
    FiltervehiculoPipe,
    FilterconductorPipe,
    FilterdriversdocumentPipe,
    FiltervehicledocumentsPipe,
    FilterlistcheckPipe,
    IndexComponent,
    FilterlistdriversdocumentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule
  ],
  providers: [ServiceService , {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor ,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
